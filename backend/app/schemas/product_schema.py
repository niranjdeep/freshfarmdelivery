from pydantic import BaseModel
from decimal import Decimal


class ProductCreate(BaseModel):
    product_name: str
    category: str
    description: str
    price: Decimal
    unit: str
    stock: int
    image_url: str
    status: str


class ProductResponse(BaseModel):
    product_id: str
    product_name: str
    category: str
    description: str
    price: Decimal
    unit: str
    stock: int
    image_url: str
    status: str

    class Config:
        from_attributes = True