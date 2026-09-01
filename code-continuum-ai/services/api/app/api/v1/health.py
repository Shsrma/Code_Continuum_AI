from fastapi import APIRouter
from app.core.config import settings
from app.db.session import check_database_connection
import time

router = APIRouter()

start_time = time.time()

@router.get("/health", summary="Health check status endpoint")
def get_health():
    db_connected = check_database_connection()
    uptime_seconds = round(time.time() - start_time, 2)
    
    return {
        "success": True,
        "data": {
            "status": "healthy" if db_connected else "degraded",
            "service": settings.PROJECT_NAME,
            "version": settings.VERSION,
            "environment": settings.ENVIRONMENT,
            "database": "connected" if db_connected else "disconnected",
            "uptime_seconds": uptime_seconds
        }
    }
