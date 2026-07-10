from pydantic import BaseModel
from decimal import Decimal


class CartCreate(BaseModel):

    customer_id: str
    product_id: str
    quantity: int
    price: Decimal


class CartResponse(BaseModel):

    id: int
    customer_id: str
    product_id: str
    quantity: int
    price: Decimal
    total_price: Decimal

    class Config:
        from_attributes = True