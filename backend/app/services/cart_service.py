from sqlalchemy.orm import Session

from app.models.cart import CartItem
from app.schemas.cart_schema import CartCreate
from app.models.product import Product


# Add Product To Cart
def add_to_cart(
    db: Session,
    cart: CartCreate
):

    total_price = cart.quantity * cart.price

    new_cart = CartItem(

        customer_id=cart.customer_id,

        product_id=cart.product_id,

        quantity=cart.quantity,

        price=cart.price,

        total_price=total_price
    )

    db.add(new_cart)

    db.commit()

    db.refresh(new_cart)

    return new_cart



# Get Customer Cart
# Get Customer Cart
def get_customer_cart(
    db: Session,
    customer_id: str
):

    cart_items = (
        db.query(
            CartItem,
            Product.product_name,
            Product.category,
            Product.image_url
        )
        .outerjoin(
    Product,
    CartItem.product_id == Product.product_id
)
        .filter(
            CartItem.customer_id == customer_id
        )
        .all()
    )


    result = []


    for cart, product_name, category, image_url in cart_items:

        result.append({

            "id": cart.id,

            "customer_id": cart.customer_id,

            "product_id": cart.product_id,

            "product_name": product_name or "Unknown Product",
"category": category or "Unknown",

            "image_url": image_url,

            "quantity": cart.quantity,

            "price": cart.price,

            "total_price": cart.total_price,

            "created_at": cart.created_at

        })


    return result


# Update Cart Quantity
def update_cart_quantity(
    db: Session,
    cart_id: int,
    quantity: int
):

    cart_item = (
        db.query(CartItem)
        .filter(
            CartItem.id == cart_id
        )
        .first()
    )

    if not cart_item:
        return None


    cart_item.quantity = quantity

    cart_item.total_price = (
        cart_item.price * quantity
    )


    db.commit()

    db.refresh(cart_item)

    return cart_item



# Remove Cart Item
def remove_cart_item(
    db: Session,
    cart_id: int
):

    cart_item = (
        db.query(CartItem)
        .filter(
            CartItem.id == cart_id
        )
        .first()
    )


    if not cart_item:
        return None


    db.delete(cart_item)

    db.commit()

    return cart_item