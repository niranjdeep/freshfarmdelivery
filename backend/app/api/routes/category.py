from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.category_schema import CategoryResponse
from app.services.category_service import get_all_categories

router = APIRouter(
    prefix="/api/categories",
    tags=["Categories"]
)


@router.get("/", response_model=list[CategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    return get_all_categories(db)