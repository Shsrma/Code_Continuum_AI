import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "data" in data
    assert data["data"]["status"] in ["healthy", "degraded"]
    assert data["data"]["service"] == "Code Continuum AI API"
    assert data["data"]["version"] == "0.1.0"
    assert "database" in data["data"]

def test_top_level_health():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "online"
    assert "docs" in data
