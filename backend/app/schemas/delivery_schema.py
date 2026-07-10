from pydantic import BaseModel


# Delivery Man Registration

class DeliveryRegister(BaseModel):

    full_name: str
    mobile_number: str
    village: str
    password: str



# Delivery Man Login

class DeliveryLogin(BaseModel):

    mobile_number: str
    password: str



# Delivery Man Response

class DeliveryResponse(BaseModel):

    delivery_id: str
    full_name: str
    mobile_number: str
    village: str
    status: str

    class Config:
        from_attributes = True



# Order Assignment Request

class OrderAssignCreate(BaseModel):

    order_id: str
    delivery_id: str



# Update Delivery Status

class DeliveryStatusUpdate(BaseModel):

    delivery_status: str