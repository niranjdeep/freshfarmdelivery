from pydantic import BaseModel


# Admin Registration

class AdminRegister(BaseModel):

    full_name: str
    mobile_number: str
    email: str
    password: str



# Admin Login

class AdminLogin(BaseModel):

    mobile_number: str
    password: str



# Admin Response

class AdminResponse(BaseModel):

    admin_id: str
    full_name: str
    mobile_number: str
    email: str

    class Config:
        from_attributes = True