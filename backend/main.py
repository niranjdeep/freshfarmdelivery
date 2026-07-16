from datetime import datetime, timedelta

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func, or_
from sqlalchemy.orm import Session
from . import models, utils
from .database import SessionLocal, engine, get_db
from .schemas import (
    CustomerCreate,
    CustomerLogin,
    CustomerProfile,
    Token,
    OTPRequestPayload,
    OTPVerifyPayload,
    CategoryOut,
    ProductOut,
)
from .auth import get_current_admin, get_current_customer, get_current_delivery, get_current_user
from .utils import generate_otp, hash_password, verify_password, create_access_token

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Uzhavan-Mart Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:4173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def create_default_admin():
    with SessionLocal() as db:
        admin = db.query(models.Customer).filter(models.Customer.role == "admin").first()
        if not admin:
            default_admin = models.Customer(
                customer_id="ADM001",
                full_name="Uzhavan Admin",
                mobile_number="9999999999",
                email="admin@uzhavanmart.local",
                village="Head Office",
                password=hash_password("Admin@123"),
                role="admin",
            )
            db.add(default_admin)
            db.commit()


def seed_catalog_data():
    with SessionLocal() as db:
        if db.query(models.Category).count():
            return

        categories = [
            ("Milk & Dairy", "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=900&q=80"),
            ("Goat Farm", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80"),
            ("Chicken Farm", "https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=900&q=80"),
            ("Eggs", "https://images.unsplash.com/photo-1518569656558-1f25e2d36d0d?auto=format&fit=crop&w=900&q=80"),
            ("Fresh Water Fish", "https://images.unsplash.com/photo-1574781330855-d0d0b9f7f5b2?auto=format&fit=crop&w=900&q=80"),
            ("Sea Fish", "https://images.unsplash.com/photo-1559737328-2b5d3f7d1baf?auto=format&fit=crop&w=900&q=80"),
            ("Fresh Water Prawn", "https://images.unsplash.com/photo-1547592166-23c6f5d0b4d5?auto=format&fit=crop&w=900&q=80"),
            ("Sea Prawn", "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80"),
            ("Crab", "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80"),
            ("Meat", "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=80"),
        ]

        for category_name, category_image in categories:
            db.add(models.Category(category_name=category_name, category_image=category_image, status="active"))

        db.commit()

        created_categories = db.query(models.Category).all()
        category_lookup = {category.category_name: category for category in created_categories}

        products = [
            ("Fresh Cow Milk", "Creamy and rich milk from local villages.", "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=80", 90.0, 120, "Litre", True, category_lookup["Milk & Dairy"]),
            ("Farm Yogurt", "Naturally fermented yogurt with a mild tang.", "https://images.unsplash.com/photo-1571212515414-2f4dc8a0c9a0?auto=format&fit=crop&w=900&q=80", 70.0, 80, "Piece", True, category_lookup["Milk & Dairy"]),
            ("Goat Milk", "Fresh goat milk packed with nutrients.", "https://images.unsplash.com/photo-1559598467-f8b76c8155d9?auto=format&fit=crop&w=900&q=80", 110.0, 60, "Litre", False, category_lookup["Goat Farm"]),
            ("Goat Cheese", "Soft cheese sourced from free-range goats.", "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=900&q=80", 140.0, 40, "Piece", True, category_lookup["Goat Farm"]),
            ("Country Chicken", "Tender chicken from village farms.", "https://images.unsplash.com/photo-1606728032168-4f3f4f2b3990?auto=format&fit=crop&w=900&q=80", 220.0, 75, "Kg", True, category_lookup["Chicken Farm"]),
            ("Free Range Eggs", "Farm-fresh eggs delivered daily.", "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=900&q=80", 15.0, 200, "Piece", True, category_lookup["Eggs"]),
            ("Tilapia", "Freshwater fish with a mild and delicate flavor.", "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=900&q=80", 180.0, 45, "Kg", False, category_lookup["Fresh Water Fish"]),
            ("Sea Bass", "Premium sea fish with firm and tender meat.", "https://images.unsplash.com/photo-1547592166-23c6f5d0b4d5?auto=format&fit=crop&w=900&q=80", 260.0, 30, "Kg", True, category_lookup["Sea Fish"]),
            ("Freshwater Prawn", "Sweet and juicy prawns from local ponds.", "https://images.unsplash.com/photo-1564859227552-6d0e5b9c0ed4?auto=format&fit=crop&w=900&q=80", 240.0, 35, "Kg", False, category_lookup["Fresh Water Prawn"]),
            ("Sea Prawn", "Large sea prawns ideal for special meals.", "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80", 320.0, 25, "Kg", True, category_lookup["Sea Prawn"]),
            ("Mud Crab", "Fresh crab prepared for steaming and curries.", "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=900&q=80", 360.0, 18, "Kg", False, category_lookup["Crab"]),
            ("Village Beef", "Lean meat from certified local farms.", "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80", 280.0, 50, "Kg", True, category_lookup["Meat"]),
        ]

        for product_name, description, product_image, price, stock, unit, is_featured, category in products:
            db.add(
                models.Product(
                    category_id=category.id,
                    product_name=product_name,
                    description=description,
                    product_image=product_image,
                    price=price,
                    stock=stock,
                    unit=unit,
                    is_featured=is_featured,
                    status="active",
                )
            )

        db.commit()


create_default_admin()
seed_catalog_data()


@app.get("/catalog/categories", response_model=list[CategoryOut])
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(models.Category).filter(models.Category.status == "active").all()
    result = []
    for category in categories:
        product_count = db.query(models.Product).filter(models.Product.category_id == category.id, models.Product.status == "active").count()
        result.append(
            CategoryOut(
                id=category.id,
                category_name=category.category_name,
                category_image=category.category_image,
                status=category.status,
                product_count=product_count,
            )
        )
    return result


@app.get("/catalog/categories/{category_id}/products", response_model=list[ProductOut])
def get_products_by_category(category_id: int, db: Session = Depends(get_db)):
    category = db.query(models.Category).filter(models.Category.id == category_id, models.Category.status == "active").first()
    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")

    products = (
        db.query(models.Product)
        .filter(models.Product.category_id == category_id, models.Product.status == "active")
        .order_by(models.Product.is_featured.desc(), models.Product.stock.desc())
        .all()
    )
    return products


@app.get("/catalog/featured-products", response_model=list[ProductOut])
def get_featured_products(db: Session = Depends(get_db)):
    products = (
        db.query(models.Product)
        .filter(models.Product.is_featured == True, models.Product.status == "active")
        .order_by(models.Product.stock.desc())
        .all()
    )
    return products


@app.get("/catalog/popular-products", response_model=list[ProductOut])
def get_popular_products(db: Session = Depends(get_db)):
    products = (
        db.query(models.Product)
        .filter(models.Product.status == "active")
        .order_by(models.Product.stock.desc(), models.Product.price.asc())
        .limit(6)
        .all()
    )
    return products


@app.get("/catalog/search")
def search_catalog(query: str, db: Session = Depends(get_db)):
    search_term = query.strip().lower()
    if not search_term:
        return {"categories": [], "products": []}

    categories = (
        db.query(models.Category)
        .filter(models.Category.status == "active")
        .filter(func.lower(models.Category.category_name).contains(search_term))
        .all()
    )
    products = (
        db.query(models.Product)
        .join(models.Category)
        .filter(models.Product.status == "active")
        .filter(
            or_(
                func.lower(models.Product.product_name).contains(search_term),
                func.lower(models.Category.category_name).contains(search_term),
            )
        )
        .all()
    )

    return {
        "categories": [
            {
                "id": category.id,
                "category_name": category.category_name,
                "category_image": category.category_image,
                "product_count": db.query(models.Product).filter(models.Product.category_id == category.id, models.Product.status == "active").count(),
            }
            for category in categories
        ],
        "products": [
            {
                "id": product.id,
                "category_id": product.category_id,
                "product_name": product.product_name,
                "description": product.description,
                "product_image": product.product_image,
                "price": product.price,
                "stock": product.stock,
                "unit": product.unit,
                "is_featured": product.is_featured,
                "status": product.status,
            }
            for product in products
        ],
    }


@app.post("/auth/register", response_model=CustomerProfile, status_code=status.HTTP_201_CREATED)
def register_customer(payload: CustomerCreate, db: Session = Depends(get_db)):
    if payload.password != payload.confirm_password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password and confirm password do not match")

    existing_mobile = db.query(models.Customer).filter(models.Customer.mobile_number == payload.mobile_number).first()
    if existing_mobile:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Mobile number already registered")

    existing_email = db.query(models.Customer).filter(models.Customer.email == payload.email).first()
    if existing_email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    customer_count = db.query(models.Customer).count()
    next_id = customer_count + 1
    customer_id = f"CUS{next_id:03d}"

    customer = models.Customer(
        customer_id=customer_id,
        full_name=payload.full_name,
        mobile_number=payload.mobile_number,
        email=payload.email,
        village=payload.village,
        password=hash_password(payload.password),
    )
    db.add(customer)
    db.commit()
    db.refresh(customer)

    return customer


@app.post("/auth/login", response_model=Token)
def login_customer(payload: CustomerLogin, db: Session = Depends(get_db)):
    customer = db.query(models.Customer).filter(models.Customer.mobile_number == payload.mobile_number).first()
    if not customer or not verify_password(payload.password, customer.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid mobile number or password")

    access_token = create_access_token(subject=customer.mobile_number, role=customer.role)
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/auth/request-otp")
def request_otp(payload: OTPRequestPayload, db: Session = Depends(get_db)):
    customer = db.query(models.Customer).filter(models.Customer.mobile_number == payload.mobile_number).first()
    if not customer:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Mobile number not registered")

    code = generate_otp()
    expires_at = datetime.utcnow() + timedelta(minutes=10)

    otp_request = models.OTPRequest(
        mobile_number=payload.mobile_number,
        code=code,
        expires_at=expires_at,
    )
    db.add(otp_request)
    db.commit()
    db.refresh(otp_request)

    return {"message": "OTP generated successfully", "otp_code": code}


@app.post("/auth/verify-otp", response_model=Token)
def verify_otp(payload: OTPVerifyPayload, db: Session = Depends(get_db)):
    otp_request = (
        db.query(models.OTPRequest)
        .filter(models.OTPRequest.mobile_number == payload.mobile_number)
        .filter(models.OTPRequest.code == payload.otp_code)
        .filter(models.OTPRequest.used == False)
        .filter(models.OTPRequest.expires_at >= datetime.utcnow())
        .order_by(models.OTPRequest.created_at.desc())
        .first()
    )

    if not otp_request:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired OTP")

    otp_request.used = True
    db.add(otp_request)
    db.commit()

    customer = db.query(models.Customer).filter(models.Customer.mobile_number == payload.mobile_number).first()
    if not customer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Customer not found")

    access_token = create_access_token(subject=customer.mobile_number, role=customer.role)
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/customer/profile", response_model=CustomerProfile)
def get_customer_profile(current_customer: models.Customer = Depends(get_current_user)):
    return current_customer


@app.get("/customer/dashboard")
def customer_dashboard(current_customer: models.Customer = Depends(get_current_customer)):
    return {"message": f"Welcome {current_customer.full_name}", "customer_id": current_customer.customer_id}


@app.get("/admin/dashboard")
def admin_dashboard(current_admin: models.Customer = Depends(get_current_admin), db: Session = Depends(get_db)):
    customer_count = db.query(models.Customer).filter(models.Customer.role == "customer").count()
    delivery_count = db.query(models.Customer).filter(models.Customer.role == "delivery").count()
    return {
        "message": f"Welcome admin {current_admin.full_name}",
        "customers": customer_count,
        "delivery_men": delivery_count,
    }


@app.get("/admin/customers")
def admin_list_customers(current_admin: models.Customer = Depends(get_current_admin), db: Session = Depends(get_db)):
    customers = db.query(models.Customer).filter(models.Customer.role == "customer").all()
    return [
        {
            "customer_id": customer.customer_id,
            "full_name": customer.full_name,
            "mobile_number": customer.mobile_number,
            "email": customer.email,
            "village": customer.village,
        }
        for customer in customers
    ]


@app.get("/admin/delivery-men")
def admin_list_delivery(current_admin: models.Customer = Depends(get_current_admin), db: Session = Depends(get_db)):
    delivery_men = db.query(models.Customer).filter(models.Customer.role == "delivery").all()
    return [
        {
            "customer_id": delivery.customer_id,
            "full_name": delivery.full_name,
            "mobile_number": delivery.mobile_number,
            "email": delivery.email,
            "village": delivery.village,
        }
        for delivery in delivery_men
    ]


@app.post("/admin/delivery-men")
def admin_create_delivery_man(payload: CustomerCreate, current_admin: models.Customer = Depends(get_current_admin), db: Session = Depends(get_db)):
    if payload.password != payload.confirm_password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password and confirm password do not match")

    existing_mobile = db.query(models.Customer).filter(models.Customer.mobile_number == payload.mobile_number).first()
    if existing_mobile:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Mobile number already registered")

    existing_email = db.query(models.Customer).filter(models.Customer.email == payload.email).first()
    if existing_email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    delivery_count = db.query(models.Customer).filter(models.Customer.role == "delivery").count()
    next_id = delivery_count + 1
    customer_id = f"DEL{next_id:03d}"

    delivery_man = models.Customer(
        customer_id=customer_id,
        full_name=payload.full_name,
        mobile_number=payload.mobile_number,
        email=payload.email,
        village=payload.village,
        password=hash_password(payload.password),
        role="delivery",
    )
    db.add(delivery_man)
    db.commit()
    db.refresh(delivery_man)

    return {
        "customer_id": delivery_man.customer_id,
        "full_name": delivery_man.full_name,
        "mobile_number": delivery_man.mobile_number,
        "email": delivery_man.email,
        "village": delivery_man.village,
    }


@app.get("/delivery/dashboard")
def delivery_dashboard(current_delivery: models.Customer = Depends(get_current_delivery)):
    return {"message": f"Welcome delivery partner {current_delivery.full_name}", "delivery_id": current_delivery.customer_id}
