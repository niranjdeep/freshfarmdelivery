from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.db.database import Base


class OrderAssignment(Base):

    __tablename__ = "order_assignments"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    order_id = Column(
        String(20),
        nullable=False
    )

    delivery_id = Column(
        String(20),
        nullable=False
    )

    assigned_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    delivery_status = Column(
        String(30),
        default="Assigned"
    )