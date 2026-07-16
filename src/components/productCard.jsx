import { addToCart } from "../services/cartService";

function ProductCard({ product }) {

    const handleAddCart = async () => {

        try {

            const customerId = localStorage.getItem("customer_id");

            const cartData = {
                customer_id: customerId,
                product_id: product.product_id,
                quantity: 1,
                price: product.price
            };

            const data = await addToCart(cartData);

            alert(data.message);

        } catch (error) {

            console.log(error);
            alert("Add Cart Failed");

        }

    };

    return (

        <div
            style={{
                width: "300px",
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "15px",
                margin: "15px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                background: "#fff",
                transition: "0.3s"
            }}
        >

            <img
                src={
                    product.image_url
                        ? product.image_url
                        : "https://via.placeholder.com/280x180?text=Fresh+Farm"
                }
                alt={product.product_name}
                style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "8px"
                }}
            />

            <h2
                style={{
                    marginTop: "15px",
                    color: "#2c3e50"
                }}
            >
                {product.product_name}
            </h2>

            <p>
                <strong>Category:</strong> {product.category}
            </p>

            <p>
                {product.description}
            </p>

            <h3
                style={{
                    color: "green"
                }}
            >
                ₹{product.price}
            </h3>

            <p>
                <strong>Unit:</strong> {product.unit}
            </p>

            <p>
                <strong>Stock:</strong> {product.stock}
            </p>

            <button
                onClick={handleAddCart}
                style={{
                    width: "100%",
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginTop: "10px"
                }}
            >
                Add To Cart
            </button>

        </div>

    );

}

export default ProductCard;