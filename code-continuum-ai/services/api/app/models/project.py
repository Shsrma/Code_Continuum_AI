import uuid
import re
from datetime import datetime, timezone
from sqlalchemy import String, Float, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base

def generate_uuid() -> str:
    return str(uuid.uuid4())

def slugify(text: str) -> str:
    slug = text.lower().strip()
    slug = re.sub(r'[^\w\s-]', '', slug)
    slug = re.sub(r'[\s_-]+', '-', slug)
    slug = re.sub(r'^-+|-+$', '', slug)
    return slug or "project"

class Project(Base):
    __tablename__ = "projects"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    organization_id: Mapped[str] = mapped_column(String(36), nullable=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    description: Mapped[str] = mapped_column(String(500), nullable=True)
    primary_language: Mapped[str] = mapped_column(String(100), default="TypeScript", nullable=False)
    technology_stack: Mapped[str] = mapped_column(String(500), nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="ACTIVE", nullable=False)
    
    continuity_score: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    health_score: Mapped[float] = mapped_column(Float, default=100.0, nullable=False)
    
    created_by: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        default=lambda: datetime.now(timezone.utc), 
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False
    )
    deleted_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)

    creator = relationship("User")
    repositories = relationship("Repository", back_populates="project", cascade="all, delete-orphan")


class Repository(Base):
    __tablename__ = "repositories"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    project_id: Mapped[str] = mapped_column(String(36), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    provider: Mapped[str] = mapped_column(String(50), default="github", nullable=False)
    external_id: Mapped[str] = mapped_column(String(255), nullable=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    default_branch: Mapped[str] = mapped_column(String(100), default="main", nullable=False)
    visibility: Mapped[str] = mapped_column(String(50), default="public", nullable=False)
    url: Mapped[str] = mapped_column(String(500), nullable=True)
    last_synced_commit: Mapped[str] = mapped_column(String(255), nullable=True)
    sync_status: Mapped[str] = mapped_column(String(50), default="IDLE", nullable=False)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        default=lambda: datetime.now(timezone.utc), 
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False
    )

    project = relationship("Project", back_populates="repositories")
