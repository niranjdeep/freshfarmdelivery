import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getCart,
    updateCart,
    removeCart
} from "../services/cartService";

function Cart() {

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        loadCart();

    }, []);

    const loadCart = async () => {

        try {

            const customerId = localStorage.getItem("customer_id");

            const data = await getCart(customerId);

            setCartItems(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const changeQuantity = async (item, newQuantity) => {

        if (newQuantity < 1) return;

        try {

            await updateCart(item.id, newQuantity);

            loadCart();

        } catch (error) {

            console.log(error);

        }

    };

    const handleRemove = async (cartId) => {

        try {

            await removeCart(cartId);

            loadCart();

        } catch (error) {

            console.log(error);

        }

    };

    const grandTotal = cartItems.reduce(

        (total, item) => total + Number(item.total_price),

        0

    );

    if (loading) {

        return <h2 style={{ textAlign: "center" }}>Loading Cart...</h2>;

    }

    return (

        <div
            style={{
                maxWidth: "1100px",
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
                My Shopping Cart
            </h1>

            {

                cartItems.length === 0 ? (

                    <h2 style={{ textAlign: "center" }}>
                        Cart is Empty
                    </h2>

                ) : (

                    <>

                        {

                            cartItems.map((item) => (

                                <div
                                    key={item.id}
                                    style={{
                                        display: "flex",
                                        gap: "20px",
                                        flexWrap: "wrap",
                                        alignItems: "center",
                                        border: "1px solid #ddd",
                                        borderRadius: "12px",
                                        padding: "20px",
                                        marginBottom: "20px",
                                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
                                    }}
                                >

                                    <img
                                        src={`http://127.0.0.1:8000/static/${item.image_url}`}
                                        alt={item.product_name}
                                        style={{
                                            width: "150px",
                                            height: "150px",
                                            objectFit: "cover",
                                            borderRadius: "10px"
                                        }}
                                        onError={(e) => {
                                            e.target.src =
                                                "http://127.0.0.1:8000/static/images/cow_milk.jpg";
                                        }}
                                    />

                                    <div style={{ flex: 1 }}>

                                        <h2>{item.product_name}</h2>

                                        <p>
                                            <b>Category:</b> {item.category}
                                        </p>

                                        <p>
                                            <b>Price:</b> ₹{item.price}
                                        </p>

                                        <p>
                                            <b>Total:</b> ₹{item.total_price}
                                        </p>

                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "15px",
                                                marginTop: "15px"
                                            }}
                                        >                                            <button
                                                onClick={() =>
                                                    changeQuantity(
                                                        item,
                                                        item.quantity - 1
                                                    )
                                                }
                                                style={{
                                                    width: "35px",
                                                    height: "35px",
                                                    border: "none",
                                                    borderRadius: "50%",
                                                    background: "green",
                                                    color: "white",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                -
                                            </button>

                                            <span
                                                style={{
                                                    fontWeight: "bold",
                                                    fontSize: "18px"
                                                }}
                                            >
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    changeQuantity(
                                                        item,
                                                        item.quantity + 1
                                                    )
                                                }
                                                style={{
                                                    width: "35px",
                                                    height: "35px",
                                                    border: "none",
                                                    borderRadius: "50%",
                                                    background: "green",
                                                    color: "white",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                +
                                            </button>

                                        </div>

                                        <button
                                            onClick={() =>
                                                handleRemove(item.id)
                                            }
                                            style={{
                                                marginTop: "20px",
                                                background: "#dc2626",
                                                color: "white",
                                                border: "none",
                                                padding: "10px 20px",
                                                borderRadius: "8px",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Remove Item
                                        </button>

                                    </div>

                                </div>

                            ))

                        }

                        <div
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "12px",
                                padding: "20px",
                                background: "#f8fafc",
                                marginTop: "30px"
                            }}
                        >

                            <h2>Cart Summary</h2>

                            <p>
                                <b>Total Items:</b> {cartItems.length}
                            </p>

                            <p>
                                <b>Total Amount:</b> ₹{grandTotal}
                            </p>

                            <p>
                                <b>Delivery Charge:</b> ₹50
                            </p>

                            <h2
                                style={{
                                    color: "green"
                                }}
                            >
                                Grand Total : ₹{grandTotal + 50}
                            </h2>

                            <button
                                onClick={() => navigate("/")}
                                style={{
                                    width: "100%",
                                    padding: "15px",
                                    marginTop: "20px",
                                    borderRadius: "8px",
                                    border: "1px solid #ddd",
                                    cursor: "pointer"
                                }}
                            >
                                Continue Shopping
                            </button>

                            <button
                                onClick={() => navigate("/checkout")}
                                style={{
                                    width: "100%",
                                    padding: "15px",
                                    marginTop: "15px",
                                    borderRadius: "8px",
                                    border: "none",
                                    background: "green",
                                    color: "white",
                                    fontSize: "18px",
                                    cursor: "pointer"
                                }}
                            >
                                Proceed To Checkout
                            </button>

                        </div>

                    </>

                )

            }

        </div>

    );

}

export default Cart;