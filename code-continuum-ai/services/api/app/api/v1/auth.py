from datetime import timedelta
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.config import settings
from app.core.security import get_password_hash, verify_password, create_access_token
from app.core.exceptions import AppException, AuthenticationException, ValidationException
from app.models.user import User
from app.schemas.auth import UserRegister, UserLogin, UserResponse, TokenResponse
from app.api.deps import get_current_user

router = APIRouter()

@router.post("/register", summary="Register a new user account")
def register(user_in: UserRegister, db: Session = Depends(get_db)):
    # Check if email exists
    existing_user = db.query(User).filter(User.email == user_in.email.lower()).first()
    if existing_user:
        raise ValidationException("An account with this email address already exists.")

    hashed_pw = get_password_hash(user_in.password)
    new_user = User(
        email=user_in.email.lower(),
        password_hash=hashed_pw,
        display_name=user_in.display_name,
        status="ACTIVE"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token(subject=new_user.id)

    return {
        "success": True,
        "data": {
            "user": UserResponse.model_validate(new_user),
            "token": TokenResponse(
                access_token=token,
                token_type="bearer",
                expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
            )
        }
    }

@router.post("/login", summary="Authenticate user and receive JWT access token")
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == credentials.email.lower()).first()
    if not user or not verify_password(credentials.password, user.password_hash):
        raise AuthenticationException("Invalid email or password.")
    
    if user.status != "ACTIVE":
        raise AuthenticationException("User account is inactive.")

    token = create_access_token(subject=user.id)

    return {
        "success": True,
        "data": {
            "user": UserResponse.model_validate(user),
            "token": TokenResponse(
                access_token=token,
                token_type="bearer",
                expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
            )
        }
    }

@router.get("/me", summary="Get current authenticated user profile")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "success": True,
        "data": UserResponse.model_validate(current_user)
    }
