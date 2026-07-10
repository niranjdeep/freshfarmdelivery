from sqlalchemy.orm import Session

from app.models.order import Order
from app.models.order_item import OrderItem
from app.schemas.order_schema import OrderCreate



# Generate Order ID

def generate_order_id(db: Session):

    count = db.query(Order).count() + 1

    return f"ORD{count:03d}"



# Create Order

def create_order(
    db: Session,
    order_data: OrderCreate
):

    order_id = generate_order_id(db)


    total_amount = 0


    for item in order_data.items:

        total_amount += (
            item.quantity * item.price
        )


    print("TOTAL AMOUNT:", total_amount)



    new_order = Order(

        order_id=order_id,

        customer_id=order_data.customer_id,

        total_amount=total_amount,

        delivery_address=order_data.delivery_address,

        order_status="Pending",

        payment_status="Pending"

    )


    db.add(new_order)

    db.commit()

    db.refresh(new_order)



    # Save Order Items

    for item in order_data.items:


        total_price = (
            item.quantity * item.price
        )


        order_item = OrderItem(

            order_id=order_id,

            product_id=item.product_id,

            quantity=item.quantity,

            price=item.price,

            total_price=total_price

        )


        db.add(order_item)



    db.commit()


    return new_order




# Get Customer Orders

def get_customer_orders(
    db: Session,
    customer_id: str
):

    return (

        db.query(Order)

        .filter(
            Order.customer_id == customer_id
        )

        .all()

    )




# Get Order By ID

def get_order_by_id(
    db: Session,
    order_id: str
):

    return (

        db.query(Order)

        .filter(
            Order.order_id == order_id
        )

        .first()

    )




# Update Order Status

def update_order_status(
    db: Session,
    order_id: str,
    status: str
):

    order = (

        db.query(Order)

        .filter(
            Order.order_id == order_id
        )

        .first()

    )


    if not order:

        return None



    order.order_status = status


    db.commit()

    db.refresh(order)


    return order