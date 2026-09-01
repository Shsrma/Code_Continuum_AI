import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_register_user_success():
    payload = {
        "email": "newuser@example.com",
        "password": "SecurePassword123!",
        "display_name": "New User"
    }
    response = client.post("/api/v1/auth/register", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "user" in data["data"]
    assert data["data"]["user"]["email"] == "newuser@example.com"
    assert data["data"]["user"]["display_name"] == "New User"
    assert "token" in data["data"]
    assert "access_token" in data["data"]["token"]

def test_register_duplicate_email_fails():
    payload = {
        "email": "duplicate@example.com",
        "password": "Password123!",
        "display_name": "Original User"
    }
    # Register once
    res1 = client.post("/api/v1/auth/register", json=payload)
    assert res1.status_code == 200

    # Register twice with same email
    res2 = client.post("/api/v1/auth/register", json=payload)
    assert res2.status_code == 422
    data = res2.json()
    assert data["success"] is False
    assert data["error"]["code"] == "VALIDATION_ERROR"

def test_login_success():
    # Register first
    client.post("/api/v1/auth/register", json={
        "email": "loginuser@example.com",
        "password": "ValidPassword123!",
        "display_name": "Login User"
    })

    # Now login
    payload = {
        "email": "loginuser@example.com",
        "password": "ValidPassword123!"
    }
    response = client.post("/api/v1/auth/login", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "token" in data["data"]
    assert "access_token" in data["data"]["token"]

def test_login_invalid_password_fails():
    # Register first
    client.post("/api/v1/auth/register", json={
        "email": "wrongpw@example.com",
        "password": "CorrectPassword123!",
        "display_name": "User"
    })

    payload = {
        "email": "wrongpw@example.com",
        "password": "WrongPassword123!"
    }
    response = client.post("/api/v1/auth/login", json=payload)
    assert response.status_code == 401
    data = response.json()
    assert data["success"] is False
    assert data["error"]["code"] == "AUTHENTICATION_ERROR"

def test_get_me_authenticated():
    # Register first
    client.post("/api/v1/auth/register", json={
        "email": "me@example.com",
        "password": "SecurePassword123!",
        "display_name": "Me User"
    })

    # Login to get token
    login_resp = client.post("/api/v1/auth/login", json={
        "email": "me@example.com",
        "password": "SecurePassword123!"
    })
    token = login_resp.json()["data"]["token"]["access_token"]

    # Call /me with Bearer token
    me_resp = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert me_resp.status_code == 200
    me_data = me_resp.json()
    assert me_data["success"] is True
    assert me_data["data"]["email"] == "me@example.com"

def test_get_me_unauthenticated_fails():
    me_resp = client.get("/api/v1/auth/me")
    assert me_resp.status_code == 401
    data = me_resp.json()
    assert data["success"] is False
    assert data["error"]["code"] == "AUTHENTICATION_ERROR"
