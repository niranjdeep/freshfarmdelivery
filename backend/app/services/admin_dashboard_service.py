from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.models.product import Product
from app.models.order import Order
from app.models.delivery_man import DeliveryMan
from app.models.product import Product



# Admin Dashboard Summary

def get_dashboard_summary(
    db: Session
):

    total_customers = (
        db.query(Customer)
        .count()
    )


    total_products = (
        db.query(Product)
        .count()
    )


    total_orders = (
        db.query(Order)
        .count()
    )


    pending_orders = (
        db.query(Order)
        .filter(
            Order.order_status == "Pending"
        )
        .count()
    )


    delivered_orders = (
        db.query(Order)
        .filter(
            Order.order_status == "Delivered"
        )
        .count()
    )


    total_delivery_men = (
        db.query(DeliveryMan)
        .count()
    )


    return {

        "total_customers": total_customers,

        "total_products": total_products,

        "total_orders": total_orders,

        "pending_orders": pending_orders,

        "delivered_orders": delivered_orders,

        "total_delivery_men": total_delivery_men

    }





# Get All Customers

def get_all_customers(
    db: Session
):

    return (
        db.query(Customer)
        .all()
    )





# Get All Orders


def get_all_orders(db: Session):

    orders = (
        db.query(Order)
        .all()
    )

    return orders
# Get All Delivery Men

def get_all_delivery_men(
    db: Session
):

    return (
        db.query(DeliveryMan)
        .all()
    )
# Get All Products

def get_all_products(db: Session):

    return (
        db.query(Product)
        .all()
    )