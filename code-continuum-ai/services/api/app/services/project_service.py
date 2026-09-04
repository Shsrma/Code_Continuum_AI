from sqlalchemy.orm import Session
from app.models.project import Project
from app.schemas.project import ProjectCreate
from app.core.exceptions import NotFoundException, DatabaseException
import logging
import uuid
from app.models.project import slugify

logger = logging.getLogger(__name__)

class ProjectService:
    def create_project(self, db: Session, user_id: str, project_in: ProjectCreate) -> Project:
        try:
            slug = slugify(project_in.name)
            
            existing = db.query(Project).filter(Project.slug == slug, Project.created_by == user_id).first()
            if existing:
                slug = f"{slug}-{str(uuid.uuid4())[:8]}"
            
            db_project = Project(
                name=project_in.name,
                slug=slug,
                description=project_in.description,
                primary_language=project_in.primary_language,
                organization_id=project_in.organization_id,
                created_by=user_id,
            )
            db.add(db_project)
            db.commit()
            db.refresh(db_project)
            return db_project
        except Exception as e:
            db.rollback()
            logger.error(f"Error creating project: {e}")
            raise DatabaseException("Failed to create project")

    def get_user_projects(self, db: Session, user_id: str):
        return db.query(Project).filter(Project.created_by == user_id).all()

    def get_project(self, db: Session, project_id: str, user_id: str) -> Project:
        project = db.query(Project).filter(Project.id == project_id, Project.created_by == user_id).first()
        if not project:
            raise NotFoundException("Project", project_id)
        return project

    def delete_project(self, db: Session, project_id: str, user_id: str):
        project = self.get_project(db, project_id, user_id)
        db.delete(project)
        db.commit()

project_service = ProjectService()
