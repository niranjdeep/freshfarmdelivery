from sqlalchemy import Column, Integer, String, Text, DECIMAL, DateTime
from sqlalchemy.sql import func

from app.db.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(String(20), unique=True, nullable=False)
    product_name = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)
    description = Column(Text)
    price = Column(DECIMAL(10, 2), nullable=False)
    unit = Column(String(20), nullable=False)
    stock = Column(Integer, default=0)
    image_url = Column(String(255))
    status = Column(String(30), default="Available")
    created_at = Column(DateTime(timezone=True), server_default=func.now())