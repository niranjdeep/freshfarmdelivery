from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
print("ADMIN DASHBOARD ROUTE LOADED")
print("ADMIN DASHBOARD FILE IMPORTED")

from app.services.admin_dashboard_service import (
    get_dashboard_summary,
    get_all_customers,
    get_all_orders,
    get_all_delivery_men,
    get_all_products
)
# View All Customers

# View All Customers



router = APIRouter(
    prefix="/api/admin",
    tags=["Admin Dashboard"]
)



# Admin Dashboard Summary

@router.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db)
):

    return get_dashboard_summary(db)
@router.get("/customers")
def customers(
    db: Session = Depends(get_db)
):

    return get_all_customers(db)
# View All Orders

@router.get("/orders")
def orders(
    db: Session = Depends(get_db)
):

    try:
        data = get_all_orders(db)

        return {
            "count": len(data),
            "orders": data
        }

    except Exception as e:

        return {
            "error": str(e)
        }
# View All Delivery Men

@router.get("/delivery-men")
def delivery_men(
    db: Session = Depends(get_db)
):

    return get_all_delivery_men(db)
@router.get("/products")
def products(
    db: Session = Depends(get_db)
):

    return get_all_products(db)
@router.get("/test")
def test():
    return {
        "message": "Admin dashboard loaded"
    }
    