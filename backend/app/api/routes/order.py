from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db

from app.schemas.order_schema import OrderCreate

from app.services.order_service import (
    create_order,
    get_customer_orders,
    get_order_by_id,
    update_order_status
)


router = APIRouter(
    prefix="/api/order",
    tags=["Order"]
)


# Create Order
@router.post("/create")
def place_order(
    order: OrderCreate,
    db: Session = Depends(get_db)
):

    new_order = create_order(
        db,
        order
    )

    return {
        "message": "Order Created Successfully",
        "order_id": new_order.order_id
    }



# Get Customer Orders
@router.get("/customer/{customer_id}")
def customer_orders(
    customer_id: str,
    db: Session = Depends(get_db)
):

    return get_customer_orders(
        db,
        customer_id
    )



# Get Order By ID
@router.get("/{order_id}")
def get_order(
    order_id: str,
    db: Session = Depends(get_db)
):

    order = get_order_by_id(
        db,
        order_id
    )


    if not order:

        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )


    return order



# Update Order Status
@router.put("/status/{order_id}")
def change_order_status(
    order_id: str,
    status: str,
    db: Session = Depends(get_db)
):

    updated_order = update_order_status(
        db,
        order_id,
        status
    )


    if not updated_order:

        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )


    return {
        "message": "Order Status Updated Successfully"
    }