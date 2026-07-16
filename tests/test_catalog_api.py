import os

os.environ.setdefault("DATABASE_URL", "sqlite:///./test_catalog.db")

from fastapi.testclient import TestClient

from backend.main import app


client = TestClient(app)


def test_catalog_endpoints_return_seed_data():
    categories_response = client.get("/catalog/categories")
    assert categories_response.status_code == 200
    categories = categories_response.json()
    assert len(categories) >= 5
    assert any(category["category_name"] == "Milk & Dairy" for category in categories)

    first_category = categories[0]
    products_response = client.get(f"/catalog/categories/{first_category['id']}/products")
    assert products_response.status_code == 200
    products = products_response.json()
    assert len(products) >= 1

    featured_response = client.get("/catalog/featured-products")
    assert featured_response.status_code == 200
    featured_products = featured_response.json()
    assert len(featured_products) >= 1

    popular_response = client.get("/catalog/popular-products")
    assert popular_response.status_code == 200
    popular_products = popular_response.json()
    assert len(popular_products) >= 1
