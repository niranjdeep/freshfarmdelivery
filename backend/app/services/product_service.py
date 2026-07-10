from sqlalchemy.orm import Session

from app.models.product import Product
from app.schemas.product_schema import ProductCreate


def generate_product_id(db: Session):
    count = db.query(Product).count() + 1
    return f"PRD{count:03d}"


def add_product(db: Session, product: ProductCreate):

    product_id = generate_product_id(db)

    new_product = Product(
        product_id=product_id,
        product_name=product.product_name,
        category=product.category,
        description=product.description,
        price=product.price,
        unit=product.unit,
        stock=product.stock,
        image_url=product.image_url,
        status=product.status
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


def get_all_products(db: Session):
    return db.query(Product).all()


def get_product_by_id(db: Session, product_id: str):

    return (
        db.query(Product)
        .filter(Product.product_id == product_id)
        .first()
    )


def update_product(
    db: Session,
    product_id: str,
    product: ProductCreate
):

    existing_product = (
        db.query(Product)
        .filter(Product.product_id == product_id)
        .first()
    )

    if not existing_product:
        return None

    existing_product.product_name = product.product_name
    existing_product.category = product.category
    existing_product.description = product.description
    existing_product.price = product.price
    existing_product.unit = product.unit
    existing_product.stock = product.stock
    existing_product.image_url = product.image_url
    existing_product.status = product.status

    db.commit()
    db.refresh(existing_product)

    return existing_product


def delete_product(db: Session, product_id: str):

    product = (
        db.query(Product)
        .filter(Product.product_id == product_id)
        .first()
    )

    if not product:
        return None

    db.delete(product)
    db.commit()

    return product