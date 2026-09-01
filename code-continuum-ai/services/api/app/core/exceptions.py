from typing import Any, Optional, Dict
from fastapi import HTTPException, status

class AppException(HTTPException):
    """Base Application Exception"""
    def __init__(
        self,
        status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR,
        code: str = "INTERNAL_ERROR",
        message: str = "An unexpected error occurred.",
        details: Optional[Any] = None,
    ):
        super().__init__(
            status_code=status_code,
            detail={
                "success": False,
                "error": {
                    "code": code,
                    "message": message,
                    "details": details or [],
                }
            }
        )

class NotFoundException(AppException):
    def __init__(self, resource_name: str = "Resource", identifier: Optional[str] = None):
        msg = f"{resource_name} not found." if not identifier else f"{resource_name} '{identifier}' not found."
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            code="NOT_FOUND",
            message=msg,
        )

class ValidationException(AppException):
    def __init__(self, message: str = "Validation error", details: Optional[Any] = None):
        super().__init__(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            code="VALIDATION_ERROR",
            message=message,
            details=details,
        )

class AuthenticationException(AppException):
    def __init__(self, message: str = "Authentication failed."):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            code="AUTHENTICATION_ERROR",
            message=message,
        )

class DatabaseException(AppException):
    def __init__(self, message: str = "Database operation failed."):
        super().__init__(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            code="DATABASE_ERROR",
            message=message,
        )
