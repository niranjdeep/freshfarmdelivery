from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db

from app.schemas.delivery_schema import (
    DeliveryRegister,
    DeliveryLogin,
    OrderAssignCreate,
    DeliveryStatusUpdate
)

from app.services.delivery_service import (
    register_delivery_man,
    delivery_login,
    get_delivery_profile,
    assign_order,
    update_delivery_status
)
print("DELIVERY ROUTE LOADED")


router = APIRouter(
    prefix="/api/delivery",
    tags=["Delivery Man"]
)



# Delivery Registration

@router.post("/register")
def register(
    delivery: DeliveryRegister,
    db: Session = Depends(get_db)
):

    new_delivery = register_delivery_man(
        db,
        delivery
    )

    return {
        "message": "Delivery Man Registered Successfully",
        "delivery_id": new_delivery.delivery_id
    }





# Delivery Login

@router.post("/login")
def login(
    delivery: DeliveryLogin,
    db: Session = Depends(get_db)
):

    user = delivery_login(
        db,
        delivery.mobile_number,
        delivery.password
    )


    if not user:

        raise HTTPException(
            status_code=401,
            detail="Invalid Mobile Number or Password"
        )


    return {
        "message": "Login Successful",
        "delivery_id": user.delivery_id
    }





# Get Delivery Profile

@router.get("/profile/{delivery_id}")
def profile(
    delivery_id: str,
    db: Session = Depends(get_db)
):

    delivery = get_delivery_profile(
        db,
        delivery_id
    )


    if not delivery:

        raise HTTPException(
            status_code=404,
            detail="Delivery Man Not Found"
        )


    return delivery





# Assign Order

@router.post("/assign")
def assign(
    assignment: OrderAssignCreate,
    db: Session = Depends(get_db)
):

    new_assignment = assign_order(
        db,
        assignment
    )


    return {
        "message": "Order Assigned Successfully",
        "assignment_id": new_assignment.id
    }





# Update Delivery Status

@router.put("/status/{delivery_id}")
def update_status(
    delivery_id: str,
    status: DeliveryStatusUpdate,
    db: Session = Depends(get_db)
):

    updated = update_delivery_status(
        db,
        delivery_id,
        status.delivery_status
    )


    if not updated:

        raise HTTPException(
            status_code=404,
            detail="Delivery Man Not Found"
        )


    return {
        "message": "Delivery Status Updated Successfully"
    }