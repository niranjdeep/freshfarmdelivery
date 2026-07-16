import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    getProductById,
    getRelatedProducts
} from "../services/productService";

import { addToCart } from "../services/cartService";

function ProductDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {

        try {

            const productData = await getProductById(id);

            setProduct(productData);

            const related = await getRelatedProducts(id);

            setRelatedProducts(related);

        } catch (error) {

            console.log(error);

        }

    };

    const handleAddToCart = async () => {

        try {

            const cartData = {
                customer_id: localStorage.getItem("customer_id"),
                product_id: product.product_id,
                quantity: quantity,
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

    if (!product) {

        return <h2>Loading...</h2>;

    }

    return (

        <div style={{ padding: "40px" }}>

            <button
                onClick={() => navigate(-1)}
                style={{
                    marginBottom: "20px",
                    padding: "10px 20px",
                    cursor: "pointer"
                }}
            >
                ← Back
            </button>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "30px",
                    alignItems: "flex-start",
                    justifyContent: "center"
                }}
            >

                <img
                    src={`http://127.0.0.1:8000/static/${product.image_url}`}
                    alt={product.product_name}
                    style={{
                        width: "100%",
                        maxWidth: "400px",
                        height: "300px",
                        objectFit: "cover",
                        borderRadius: "10px"
                    }}
                    onError={(e) => {
                        e.target.src =
                            "http://127.0.0.1:8000/static/images/cow_milk.jpg";
                    }}
                />

                <div
                    style={{
                        flex: 1,
                        minWidth: "300px"
                    }}
                >

                    <h1>{product.product_name}</h1>

                    <p>{product.description}</p>

                    <h2 style={{ color: "green" }}>
                        ₹{product.price}
                    </h2>

                    <p>
                        <b>Category:</b> {product.category}
                    </p>

                    <p>
                        <b>Unit:</b> {product.unit}
                    </p>

                    <p>
                        <b>Available Stock:</b> {product.stock}
                    </p>

                    <p>
                        <b>Freshness:</b> 🌿 Farm Fresh - Harvested Today
                    </p>

                    <p>
                        <b>Delivery:</b> 🚚 Same Day Delivery Available
                    </p>

                    <p>
                        <b>Estimated Delivery:</b> 2 - 4 Hours
                    </p>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "15px",
                            margin: "20px 0"
                        }}
                    >

                        <button
                            onClick={() => {
                                if (quantity > 1) {
                                    setQuantity(quantity - 1);
                                }
                            }}
                        >
                            -
                        </button>

                        <h3>{quantity}</h3>

                        <button
                            onClick={() => {
                                if (quantity < product.stock) {
                                    setQuantity(quantity + 1);
                                }
                            }}
                        >
                            +
                        </button>

                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: "15px",
                            marginTop: "20px"
                        }}
                    >

                        <button
                            onClick={handleAddToCart}
                            style={{
                                background: "green",
                                color: "white",
                                padding: "12px 25px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                        >
                            Add To Cart
                        </button>

                        <button
                            onClick={() => navigate("/checkout")}
                            style={{
                                background: "#ff9800",
                                color: "white",
                                padding: "12px 25px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                        >
                            Buy Now
                        </button>

                    </div>

                </div>

            </div>

            <hr style={{ margin: "40px 0" }} />

            <h2>Related Products</h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
                    gap: "20px"
                }}
            >                {relatedProducts.length === 0 ? (

                    <p>No Related Products Available</p>

                ) : (

                    relatedProducts.map((item) => (

                        <div
                            key={item.product_id}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                padding: "15px",
                                cursor: "pointer",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
                            }}
                            onClick={() =>
                                navigate(`/product/${item.product_id}`)
                            }
                        >

                            <img
                                src={`http://127.0.0.1:8000/static/${item.image_url}`}
                                alt={item.product_name}
                                style={{
                                    width: "100%",
                                    height: "150px",
                                    objectFit: "cover",
                                    borderRadius: "8px"
                                }}
                                onError={(e) => {
                                    e.target.src =
                                        "http://127.0.0.1:8000/static/images/cow_milk.jpg";
                                }}
                            />

                            <h3>{item.product_name}</h3>

                            <p
                                style={{
                                    color: "green",
                                    fontWeight: "bold"
                                }}
                            >
                                ₹{item.price}
                            </p>

                        </div>

                    ))

                )}

            </div>

            <hr style={{ margin: "40px 0" }} />

            <h2>Similar Products</h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
                    gap: "20px"
                }}
            >

                {relatedProducts.length === 0 ? (

                    <p>No Similar Products Available</p>

                ) : (

                    relatedProducts.map((item) => (

                        <div
                            key={`similar-${item.product_id}`}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                padding: "15px",
                                cursor: "pointer",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
                            }}
                            onClick={() =>
                                navigate(`/product/${item.product_id}`)
                            }
                        >

                            <img
                                src={`http://127.0.0.1:8000/static/${item.image_url}`}
                                alt={item.product_name}
                                style={{
                                    width: "100%",
                                    height: "150px",
                                    objectFit: "cover",
                                    borderRadius: "8px"
                                }}
                                onError={(e) => {
                                    e.target.src =
                                        "http://127.0.0.1:8000/static/images/cow_milk.jpg";
                                }}
                            />

                            <h3>{item.product_name}</h3>

                            <p
                                style={{
                                    color: "green",
                                    fontWeight: "bold"
                                }}
                            >
                                ₹{item.price}
                            </p>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

}

export default ProductDetails;