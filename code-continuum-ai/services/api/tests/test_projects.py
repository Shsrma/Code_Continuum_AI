import pytest
from app.models.project import Project

def test_create_project(authorized_client, db_session, test_user):
    response = authorized_client.post(
        "/api/v1/projects",
        json={
            "name": "Test Project",
            "description": "A test project",
            "primary_language": "Python"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Test Project"
    assert data["slug"] == "test-project"
    assert data["primary_language"] == "Python"
    assert "id" in data

    # Verify db
    project = db_session.query(Project).filter(Project.id == data["id"]).first()
    assert project is not None

def test_get_projects(authorized_client, db_session, test_user):
    # Create two projects
    authorized_client.post("/api/v1/projects", json={"name": "P1", "primary_language": "Go"})
    authorized_client.post("/api/v1/projects", json={"name": "P2", "primary_language": "Rust"})

    response = authorized_client.get("/api/v1/projects")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 2
    names = [p["name"] for p in data]
    assert "P1" in names
    assert "P2" in names

def test_get_project_by_id(authorized_client, db_session, test_user):
    create_response = authorized_client.post("/api/v1/projects", json={"name": "P3", "primary_language": "Java"})
    project_id = create_response.json()["id"]

    response = authorized_client.get(f"/api/v1/projects/{project_id}")
    assert response.status_code == 200
    assert response.json()["name"] == "P3"

def test_delete_project(authorized_client, db_session, test_user):
    create_response = authorized_client.post("/api/v1/projects", json={"name": "P4", "primary_language": "C++"})
    project_id = create_response.json()["id"]

    delete_response = authorized_client.delete(f"/api/v1/projects/{project_id}")
    assert delete_response.status_code == 204

    # Verify deleted
    get_response = authorized_client.get(f"/api/v1/projects/{project_id}")
    assert get_response.status_code == 404
