import { Link } from "react-router-dom";

function OrderSuccess() {
    return (
        <div
            style={{
                textAlign: "center",
                marginTop: "100px",
            }}
        >
            <h1 style={{ color: "green" }}>
                🎉 Order Placed Successfully!
            </h1>

            <p>
                Thank you for shopping with Fresh Farm Delivery.
            </p>

            <Link to="/my-orders">
                <button
                    style={{
                        padding: "12px 20px",
                        background: "green",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginTop: "20px",
                    }}
                >
                    View My Orders
                </button>
            </Link>
        </div>
    );
}

export default OrderSuccess;