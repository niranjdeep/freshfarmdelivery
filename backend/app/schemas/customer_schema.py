from pydantic import BaseModel, EmailStr


class CustomerRegister(BaseModel):
    full_name: str
    mobile_number: str
    email: EmailStr
    village: str
    password: str
    confirm_password: str


class CustomerLogin(BaseModel):
    mobile_number: str
    password: str


class CustomerResponse(BaseModel):
    customer_id: str
    full_name: str
    mobile_number: str
    email: str
    village: str

    class Config:
        from_attributes = True