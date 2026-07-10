from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.db.database import Base


class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(String(20), unique=True, nullable=False)
    full_name = Column(String(100), nullable=False)
    mobile_number = Column(String(15), unique=True, nullable=False)
    email = Column(String(100), unique=True)
    village = Column(String(100), nullable=False)
    password = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())