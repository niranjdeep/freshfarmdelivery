from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError
from . import models, utils
from .database import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = utils.decode_access_token(token)
        mobile_number: str = payload.get("sub")
        if mobile_number is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")

    user = db.query(models.Customer).filter(models.Customer.mobile_number == mobile_number).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user


def ensure_role(role: str):
    def _ensure_role(user: models.Customer = Depends(get_current_user)):
        if user.role != role:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient privileges")
        return user

    return _ensure_role


def get_current_customer(user: models.Customer = Depends(get_current_user)):
    if user.role != "customer":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Customer access required")
    return user


def get_current_admin(user: models.Customer = Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    return user


def get_current_delivery(user: models.Customer = Depends(get_current_user)):
    if user.role != "delivery":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Delivery access required")
    return user
