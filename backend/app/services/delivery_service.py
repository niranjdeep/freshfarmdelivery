from sqlalchemy.orm import Session

from app.models.delivery_man import DeliveryMan
from app.models.order_assignment import OrderAssignment

from app.schemas.delivery_schema import (
    DeliveryRegister,
    OrderAssignCreate
)



# Generate Delivery ID

def generate_delivery_id(db: Session):

    count = db.query(DeliveryMan).count() + 1

    return f"DEL{count:03d}"



# Register Delivery Man

def register_delivery_man(
    db: Session,
    delivery: DeliveryRegister
):

    delivery_id = generate_delivery_id(db)


    new_delivery = DeliveryMan(

        delivery_id=delivery_id,

        full_name=delivery.full_name,

        mobile_number=delivery.mobile_number,

        password=delivery.password,

        village=delivery.village,

        status="Available"
    )


    db.add(new_delivery)

    db.commit()

    db.refresh(new_delivery)


    return new_delivery





# Delivery Login

def delivery_login(
    db: Session,
    mobile_number: str,
    password: str
):

    return (
        db.query(DeliveryMan)
        .filter(
            DeliveryMan.mobile_number == mobile_number,
            DeliveryMan.password == password
        )
        .first()
    )





# Get Delivery Profile

def get_delivery_profile(
    db: Session,
    delivery_id: str
):

    return (
        db.query(DeliveryMan)
        .filter(
            DeliveryMan.delivery_id == delivery_id
        )
        .first()
    )





# Assign Order To Delivery Man

def assign_order(
    db: Session,
    assignment: OrderAssignCreate
):

    new_assignment = OrderAssignment
    order_id=assignment.order_id,
    delivery_id=assignment.delivery_id,
    delivery_status="Assigned"
    # Update Delivery Status

def update_delivery_status(
    db: Session,
    delivery_id: str,
    status: str
):

    delivery = (
        db.query(DeliveryMan)
        .filter(
            DeliveryMan.delivery_id == delivery_id
        )
        .first()
    )


    if not delivery:
        return None


    delivery.status = status


    db.commit()

    db.refresh(delivery)


    return delivery
   