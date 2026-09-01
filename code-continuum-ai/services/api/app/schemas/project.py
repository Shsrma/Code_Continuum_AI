from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, ConfigDict

class ProjectCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=255, description="Project name")
    description: Optional[str] = Field(None, max_length=500, description="Project description")
    primary_language: str = Field("TypeScript", max_length=100, description="Primary programming language")
    organization_id: Optional[str] = Field(None, description="Optional Organization ID")

class ProjectUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=255)
    description: Optional[str] = Field(None, max_length=500)
    primary_language: Optional[str] = Field(None, max_length=100)
    status: Optional[str] = Field(None, max_length=50)

class RepositoryResponse(BaseModel):
    id: str
    project_id: str
    provider: str
    name: str
    default_branch: str
    visibility: str
    url: Optional[str] = None
    sync_status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class ProjectResponse(BaseModel):
    id: str
    organization_id: Optional[str] = None
    name: str
    slug: str
    description: Optional[str] = None
    primary_language: str
    status: str
    continuity_score: float
    health_score: float
    created_by: str
    created_at: datetime
    updated_at: datetime
    repositories: List[RepositoryResponse] = []

    model_config = ConfigDict(from_attributes=True)

class ProjectHealthResponse(BaseModel):
    project_id: str
    name: str
    health_score: float
    continuity_score: float
    status: str
    metrics: dict
