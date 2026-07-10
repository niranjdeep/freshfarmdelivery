from sqlalchemy import Column, Integer, String, DECIMAL, DateTime
from sqlalchemy.sql import func

from app.db.database import Base


class Order(Base):

    __tablename__ = "orders"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    order_id = Column(
        String(20),
        unique=True,
        nullable=False
    )

    customer_id = Column(
        String(20),
        nullable=False
    )

    total_amount = Column(
        DECIMAL(10,2),
        nullable=False
    )

    delivery_address = Column(
        String(255),
        nullable=False
    )

    order_status = Column(
        String(30),
        default="Pending"
    )

    payment_status = Column(
        String(30),
        default="Pending"
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )