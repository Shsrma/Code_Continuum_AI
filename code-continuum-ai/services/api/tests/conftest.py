import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.db.base import Base
from app.db.session import engine, SessionLocal

@pytest.fixture(autouse=True)
def reset_database():
    """Reset database tables before each test for test isolation."""
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield

@pytest.fixture
def db_session():
    """Provide a database session for tests."""
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

@pytest.fixture
def test_user(db_session):
    """Create and return a registered test user (returns login response data)."""
    client = TestClient(app)
    resp = client.post("/api/v1/auth/register", json={
        "email": "projecttester@example.com",
        "password": "TestPassword123!",
        "display_name": "Project Tester"
    })
    assert resp.status_code == 200, f"Registration failed: {resp.text}"
    return resp.json()["data"]

@pytest.fixture
def authorized_client(test_user):
    """Return a TestClient pre-configured with a valid Bearer token."""
    token = test_user["token"]["access_token"]
    client = TestClient(app)
    client.headers.update({"Authorization": f"Bearer {token}"})
    return client
