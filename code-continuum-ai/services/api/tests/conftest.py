import pytest
from app.db.base import Base
from app.db.session import engine, SessionLocal

@pytest.fixture(autouse=True)
def reset_database():
    """Reset database tables before each test for test isolation."""
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield
