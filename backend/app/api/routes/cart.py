from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.cart_schema import CartCreate
from app.services.cart_service import (
    add_to_cart,
    get_customer_cart,
    update_cart_quantity,
    remove_cart_item
)


router = APIRouter(
    prefix="/api/cart",
    tags=["Cart"]
)


# Add Product To Cart
@router.post("/add")
def add_cart(
    cart: CartCreate,
    db: Session = Depends(get_db)
):

    new_cart = add_to_cart(
        db,
        cart
    )

    return {
        "message": "Product Added To Cart",
        "cart_id": new_cart.id
    }



# Get Customer Cart
@router.get("/{customer_id}")
def get_cart(
    customer_id: str,
    db: Session = Depends(get_db)
):

    return get_customer_cart(
        db,
        customer_id
    )



# Update Quantity
@router.put("/update/{cart_id}")
def update_cart(
    cart_id: int,
    quantity: int,
    db: Session = Depends(get_db)
):

    updated_cart = update_cart_quantity(
        db,
        cart_id,
        quantity
    )


    if not updated_cart:

        raise HTTPException(
            status_code=404,
            detail="Cart item not found"
        )


    return {
        "message": "Cart Updated Successfully"
    }



# Remove Item
@router.delete("/remove/{cart_id}")
def delete_cart(
    cart_id: int,
    db: Session = Depends(get_db)
):

    deleted = remove_cart_item(
        db,
        cart_id
    )


    if not deleted:

        raise HTTPException(
            status_code=404,
            detail="Cart item not found"
        )


    return {
        "message": "Cart Item Removed Successfully"
    }