from pydantic import BaseModel
from decimal import Decimal
from typing import List


class OrderItemCreate(BaseModel):

    product_id: str
    quantity: int
    price: Decimal



class OrderCreate(BaseModel):

    customer_id: str
    delivery_address: str
    items: List[OrderItemCreate]



class OrderItemResponse(BaseModel):

    product_id: str
    quantity: int
    price: Decimal
    total_price: Decimal

    class Config:
        from_attributes = True



class OrderResponse(BaseModel):

    order_id: str
    customer_id: str
    total_amount: Decimal
    delivery_address: str
    order_status: str
    payment_status: str
    items: List[OrderItemResponse]

    class Config:
        from_attributes = True