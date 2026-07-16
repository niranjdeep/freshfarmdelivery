from pydantic import BaseModel
from typing import Optional


class CategoryResponse(BaseModel):
    id: int
    category_id: str
    category_name: str
    description: Optional[str] = None
    category_image: Optional[str] = None
    is_active: bool

    class Config:
        from_attributes = True