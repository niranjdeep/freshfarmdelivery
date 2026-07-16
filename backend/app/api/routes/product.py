from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.product_schema import ProductCreate
from app.services.product_service import (
    add_product,
    get_all_products,
    get_product_by_id,
    update_product,
    delete_product,
    get_products_by_category,
    get_featured_products,
    get_popular_products,
    get_related_products,
)

router = APIRouter(
    prefix="/api/product",
    tags=["Product"]
)


# Add Product
@router.post("/add")
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    new_product = add_product(db, product)

    return {
        "message": "Product Added Successfully",
        "product_id": new_product.product_id
    }


# Get All Products
@router.get("/all")
def get_products(
    db: Session = Depends(get_db)
):
    return get_all_products(db)
# Get Products By Category
@router.get("/category/{category_name}")
def products_by_category(
    category_name: str,
    db: Session = Depends(get_db)
):
    return get_products_by_category(db, category_name)


# Get Featured Products
@router.get("/featured")
def featured_products(
    db: Session = Depends(get_db)
):
    return get_featured_products(db)


# Get Popular Products
@router.get("/popular")
def popular_products(
    db: Session = Depends(get_db)
):
    return get_popular_products(db)


# Get Product By ID
@router.get("/{product_id}")
def get_product(
    product_id: str,
    db: Session = Depends(get_db)
):
    product = get_product_by_id(db, product_id)

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product


# Update Product
@router.put("/{product_id}")
def edit_product(
    product_id: str,
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    updated_product = update_product(
        db,
        product_id,
        product
    )

    if not updated_product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return {
        "message": "Product Updated Successfully"
    }
# Get Related Products
@router.get("/{product_id}/related")
def related_products(
    product_id: str,
    db: Session = Depends(get_db)
):
    return get_related_products(db, product_id)

# Delete Product
@router.delete("/{product_id}")
def remove_product(
    product_id: str,
    db: Session = Depends(get_db)
):
    deleted_product = delete_product(
        db,
        product_id
    )

    if not deleted_product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return {
        "message": "Product Deleted Successfully"
    }
