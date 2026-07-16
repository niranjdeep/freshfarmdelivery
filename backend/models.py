from sqlalchemy import Boolean, Column, Integer, String, DateTime, Float, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base


class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(String(16), unique=True, index=True, nullable=False)
    full_name = Column(String(128), nullable=False)
    mobile_number = Column(String(32), unique=True, index=True, nullable=False)
    email = Column(String(128), unique=True, index=True, nullable=False)
    village = Column(String(128), nullable=False)
    password = Column(String(256), nullable=False)
    role = Column(String(32), default="customer", nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class OTPRequest(Base):
    __tablename__ = "otp_requests"

    id = Column(Integer, primary_key=True, index=True)
    mobile_number = Column(String(32), index=True, nullable=False)
    code = Column(String(8), nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    used = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    category_name = Column(String(128), unique=True, nullable=False)
    category_image = Column(String(512), nullable=False)
    status = Column(String(32), default="active", nullable=False)
    products = relationship("Product", back_populates="category", cascade="all, delete-orphan")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False, index=True)
    product_name = Column(String(256), nullable=False)
    description = Column(String(1024), nullable=False)
    product_image = Column(String(512), nullable=False)
    price = Column(Float, nullable=False)
    stock = Column(Integer, default=0, nullable=False)
    unit = Column(String(64), nullable=False)
    is_featured = Column(Boolean, default=False, nullable=False)
    status = Column(String(32), default="active", nullable=False)
    category = relationship("Category", back_populates="products")
