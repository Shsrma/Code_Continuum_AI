from typing import Generator
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.security import decode_access_token
from app.core.exceptions import AuthenticationException
from app.models.user import User

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/v1/auth/login",
    auto_error=False
)

def get_current_user(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
) -> User:
    if not token:
        raise AuthenticationException("Authentication token is missing.")
    
    payload = decode_access_token(token)
    if not payload:
        raise AuthenticationException("Invalid or expired authentication token.")
    
    user_id: str = payload.get("sub")
    if not user_id:
        raise AuthenticationException("Invalid token payload.")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise AuthenticationException("User not found.")
    
    if user.status != "ACTIVE":
        raise AuthenticationException("User account is inactive.")
    
    return user
