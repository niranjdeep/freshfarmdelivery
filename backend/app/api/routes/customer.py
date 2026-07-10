from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.customer_schema import (
    CustomerRegister,
    CustomerLogin,
    CustomerResponse
)
from app.services.customer_service import (
    register_customer,
    login_customer
)
from app.core.auth import get_current_customer
from app.models.customer import Customer

router = APIRouter(
    prefix="/api/customer",
    tags=["Customer"]
)


@router.post("/register")
def register(
    customer: CustomerRegister,
    db: Session = Depends(get_db)
):
    if customer.password != customer.confirm_password:
        raise HTTPException(
            status_code=400,
            detail="Passwords do not match."
        )

    try:
        new_customer = register_customer(db, customer)

        return {
            "message": "Customer Registered Successfully",
            "customer_id": new_customer.customer_id
        }

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.post("/login")
def login(
    customer: CustomerLogin,
    db: Session = Depends(get_db)
):
    try:
        return login_customer(
            db,
            customer.mobile_number,
            customer.password
        )

    except ValueError as e:
        raise HTTPException(
            status_code=401,
            detail=str(e)
        )


@router.get("/profile", response_model=CustomerResponse)
def get_profile(
    current_customer: Customer = Depends(get_current_customer)
):
    return current_customer