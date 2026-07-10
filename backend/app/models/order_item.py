from sqlalchemy import Column, Integer, String, DECIMAL, DateTime
from sqlalchemy.sql import func

from app.db.database import Base


class OrderItem(Base):

    __tablename__ = "order_items"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    order_id = Column(
        String(20),
        nullable=False
    )

    product_id = Column(
        String(20),
        nullable=False
    )

    quantity = Column(
        Integer,
        nullable=False
    )

    price = Column(
        DECIMAL(10,2),
        nullable=False
    )

    total_price = Column(
        DECIMAL(10,2),
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )