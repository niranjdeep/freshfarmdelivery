from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.schemas.customer_schema import CustomerRegister
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)


def generate_customer_id(db: Session):
    count = db.query(Customer).count() + 1
    return f"CUS{count:03d}"


def register_customer(db: Session, customer: CustomerRegister):

    print("1. Register service started")

    existing = (
        db.query(Customer)
        .filter(Customer.mobile_number == customer.mobile_number)
        .first()
    )

    print("2. Mobile check completed")

    if existing:
        raise ValueError("Mobile number already registered.")

    customer_id = generate_customer_id(db)

    print("3. Customer ID generated:", customer_id)

    hashed_password = hash_password(customer.password)

    print("4. Password hashed")

    new_customer = Customer(
        customer_id=customer_id,
        full_name=customer.full_name,
        mobile_number=customer.mobile_number,
        email=customer.email,
        village=customer.village,
        password=hashed_password
    )

    db.add(new_customer)

    print("5. Before database commit")

    db.commit()

    print("6. Database commit completed")

    db.refresh(new_customer)

    print("7. Customer refresh completed")

    return new_customer



def login_customer(db: Session, mobile_number: str, password: str):

    customer = (
        db.query(Customer)
        .filter(Customer.mobile_number == mobile_number)
        .first()
    )

    if not customer:
        raise ValueError("Invalid mobile number or password.")

    if not verify_password(password, customer.password):
        raise ValueError("Invalid mobile number or password.")

    token = create_access_token(
        {
            "customer_id": customer.customer_id,
            "mobile_number": customer.mobile_number
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "customer": {
            "customer_id": customer.customer_id,
            "full_name": customer.full_name,
            "mobile_number": customer.mobile_number,
            "email": customer.email,
            "village": customer.village
        }
    }