import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { addToCart } from "../services/cartService";

function CategoryProducts() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchProducts();

    }, [id]);

    const fetchProducts = async () => {
    try {

        console.log("Category ID:", id);

        const response = await axios.get(
            `http://127.0.0.1:8000/api/product/category/${id}`
        );

        console.log("Products Response:", response.data);

        setProducts(response.data);

    } catch (error) {

        console.log("Error:", error);

    } finally {

        setLoading(false);

    }
};

    const handleAddToCart = async (product) => {

        try {

            const customerId = localStorage.getItem("customer_id");

            const cartData = {

                customer_id: customerId,

                product_id: product.product_id,

                quantity: 1,

                price: product.price

            };

            const response = await addToCart(cartData);

            alert(response.message);

            navigate("/cart");

        } catch (error) {

            console.log(error);

            alert("Add To Cart Failed");

        }

    };

    if (loading) {

        return (
            <h2
                style={{
                    textAlign: "center",
                    marginTop: "40px"
                }}
            >
                Loading Products...
            </h2>
        );

    }

    return (

        <div
            style={{
                maxWidth: "1200px",
                margin: "30px auto",
                padding: "20px"
            }}
        >

            <h1
                style={{
                    textAlign: "center",
                    color: "green",
                    marginBottom: "30px"
                }}
            >
                Category Products
            </h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(300px,1fr))",
                    gap: "25px"
                }}
            >

                {products.map((product) => (
                    

                    <div
                        key={product.product_id}
                        style={{
                            border: "1px solid #e5e7eb",
                            borderRadius: "12px",
                            padding: "20px",
                            background: "#fff",
                            boxShadow:
                                "0 4px 12px rgba(0,0,0,0.08)"
                        }}
                    >

                        <img
                            src={`http://127.0.0.1:8000/static/${product.image_url}`}
                            alt={product.product_name}
                            style={{
                                width: "100%",
                                height: "220px",
                                objectFit: "cover",
                                borderRadius: "10px"
                            }}
                            onError={(e) => {
                                e.target.src =
                                    "http://127.0.0.1:8000/static/images/cow_milk.jpg";
                            }}
                        />

                        <h2
                            style={{
                                marginTop: "15px"
                            }}
                        >
                            {product.product_name}
                        </h2>

                        <p>{product.description}</p>

                        <h3
                            style={{
                                color: "#16a34a",
                                fontSize: "28px",
                                marginTop: "10px"
                            }}
                        >
                            ₹{product.price}
                        </h3>

                        <p>
                            <strong>Category:</strong>{" "}
                            {product.category}
                        </p>

                        <p>
                            <strong>Unit:</strong>{" "}
                            {product.unit}
                        </p>

                        <p>
                            <strong>Stock:</strong>

                            <span
                                style={{
                                    color:
                                        product.stock > 0
                                            ? "green"
                                            : "red",
                                    fontWeight: "bold"
                                }}
                            >
                                {" "}
                                {product.stock > 0
                                    ? "Available"
                                    : "Out of Stock"}
                            </span>
                        </p>

                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                marginTop: "20px"
                            }}
                        >                            <button
                                onClick={() => handleAddToCart(product)}
                                style={{
                                    flex: 1,
                                    background: "#16a34a",
                                    color: "white",
                                    border: "none",
                                    padding: "12px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontWeight: "bold"
                                }}
                            >
                                Add To Cart
                            </button>

                            <button
                                onClick={() =>
                                    navigate(`/product/${product.product_id}`)
                                }
                                style={{
                                    flex: 1,
                                    background: "#2563eb",
                                    color: "white",
                                    border: "none",
                                    padding: "12px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontWeight: "bold"
                                }}
                            >
                                View Details
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default CategoryProducts;