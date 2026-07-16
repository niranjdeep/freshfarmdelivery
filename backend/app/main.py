from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import Base, engine
from app.models.customer import Customer
from app.api.routes.customer import router as customer_router

from app.models.product import Product
from app.api.routes.product import router as product_router
from app.models.cart import CartItem
from app.api.routes.cart import router as cart_router
from app.models.order import Order
from app.models.order_item import OrderItem

from app.api.routes.order import router as order_router
from app.models.delivery_man import DeliveryMan
from app.models.order_assignment import OrderAssignment

from app.api.routes.delivery import router as delivery_router
from app.models.admin import Admin
from app.models.admin import Admin
from app.api.routes.admin import router as admin_router
from app.api.routes.admin_dashboard import router as admin_dashboard_router

from app.api.routes.category import router as category_router
from fastapi.staticfiles import StaticFiles
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Fresh Farm Delivery API",
    version="1.0.0"
)
app.mount("/static", StaticFiles(directory="static"), name="static")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(customer_router)
app.include_router(product_router)
app.include_router(cart_router)
app.include_router(order_router)
app.include_router(delivery_router)
app.include_router(admin_router)
app.include_router(admin_dashboard_router)
app.include_router(category_router)
print(app.routes)

@app.get("/")
def root():
    return {
        "message": "Fresh Farm Delivery Backend is Running"
    }