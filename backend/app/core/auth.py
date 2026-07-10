from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.customer import Customer
from app.core.security import SECRET_KEY, ALGORITHM

security = HTTPBearer()


def get_current_customer(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials
    print("TOKEN:", token)

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        print("PAYLOAD:", payload)

        customer_id = payload.get("customer_id")

        if customer_id is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid Token"
            )

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )

    customer = (
        db.query(Customer)
        .filter(Customer.customer_id == customer_id)
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return customer