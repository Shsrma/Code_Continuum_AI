from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.schemas.project import ProjectCreate, ProjectResponse
from app.services.project_service import project_service

router = APIRouter()

@router.post("", response_model=ProjectResponse, status_code=201)
def create_project(
    *,
    db: Session = Depends(get_db),
    project_in: ProjectCreate,
    current_user: User = Depends(get_current_user)
):
    """
    Create new project.
    """
    return project_service.create_project(db=db, user_id=current_user.id, project_in=project_in)

@router.get("", response_model=List[ProjectResponse])
def get_projects(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Retrieve user projects.
    """
    return project_service.get_user_projects(db=db, user_id=current_user.id)

@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(
    *,
    db: Session = Depends(get_db),
    project_id: str,
    current_user: User = Depends(get_current_user)
):
    """
    Get project by ID.
    """
    return project_service.get_project(db=db, project_id=project_id, user_id=current_user.id)

@router.delete("/{project_id}", status_code=204)
def delete_project(
    *,
    db: Session = Depends(get_db),
    project_id: str,
    current_user: User = Depends(get_current_user)
):
    """
    Delete project.
    """
    project_service.delete_project(db=db, project_id=project_id, user_id=current_user.id)
