from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db

from app.schemas.admin_schema import (
    AdminRegister,
    AdminLogin
)

from app.services.admin_service import (
    register_admin,
    admin_login,
    get_admin_profile
)


router = APIRouter(
    prefix="/api/admin",
    tags=["Admin"]
)



# Admin Registration

@router.post("/register")
def register(
    admin: AdminRegister,
    db: Session = Depends(get_db)
):

    new_admin = register_admin(
        db,
        admin
    )


    return {
        "message": "Admin Registered Successfully",
        "admin_id": new_admin.admin_id
    }





# Admin Login

@router.post("/login")
def login(
    admin: AdminLogin,
    db: Session = Depends(get_db)
):

    user = admin_login(
        db,
        admin.mobile_number,
        admin.password
    )


    if not user:

        raise HTTPException(
            status_code=401,
            detail="Invalid Mobile Number or Password"
        )


    return {
        "message": "Login Successful",
        "admin_id": user.admin_id
    }





# Admin Profile

@router.get("/profile/{admin_id}")
def profile(
    admin_id: str,
    db: Session = Depends(get_db)
):

    admin = get_admin_profile(
        db,
        admin_id
    )


    if not admin:

        raise HTTPException(
            status_code=404,
            detail="Admin Not Found"
        )


    return admin