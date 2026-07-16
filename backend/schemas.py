from pydantic import BaseModel, EmailStr, constr
from typing import Optional


class CustomerCreate(BaseModel):
    full_name: constr(strip_whitespace=True, min_length=2)
    mobile_number: constr(strip_whitespace=True, min_length=10, max_length=15)
    email: EmailStr
    village: constr(strip_whitespace=True, min_length=2)
    password: constr(min_length=8)
    confirm_password: str


class CustomerLogin(BaseModel):
    mobile_number: constr(strip_whitespace=True, min_length=10, max_length=15)
    password: str


class OTPRequestPayload(BaseModel):
    mobile_number: constr(strip_whitespace=True, min_length=10, max_length=15)


class OTPVerifyPayload(BaseModel):
    mobile_number: constr(strip_whitespace=True, min_length=10, max_length=15)
    otp_code: constr(strip_whitespace=True, min_length=4, max_length=6)


class CustomerProfile(BaseModel):
    customer_id: str
    full_name: str
    mobile_number: str
    email: EmailStr
    village: str
    role: str

    model_config = {"from_attributes": True}


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class CategoryOut(BaseModel):
    id: int
    category_name: str
    category_image: str
    status: str
    product_count: int

    model_config = {"from_attributes": True}


class ProductOut(BaseModel):
    id: int
    category_id: int
    product_name: str
    description: str
    product_image: str
    price: float
    stock: int
    unit: str
    is_featured: bool
    status: str

    model_config = {"from_attributes": True}
