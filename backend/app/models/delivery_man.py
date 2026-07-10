from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.db.database import Base


class DeliveryMan(Base):

    __tablename__ = "delivery_men"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    delivery_id = Column(
        String(20),
        unique=True,
        nullable=False
    )

    full_name = Column(
        String(100),
        nullable=False
    )

    mobile_number = Column(
        String(15),
        unique=True,
        nullable=False
    )

    password = Column(
        String(255),
        nullable=False
    )

    village = Column(
        String(100),
        nullable=False
    )

    status = Column(
        String(30),
        default="Available"
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )