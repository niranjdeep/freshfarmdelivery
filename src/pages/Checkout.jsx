import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { getCart } from "../services/cartService";
import { createOrder } from "../services/orderService";

function Checkout() {

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        full_name: "",
        mobile: "",
        delivery_address: "",
        city: "",
        pincode: ""
    });

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

    const grandTotal = cartItems.reduce(
        (total, item) => total + Number(item.total_price),
        0
    );

    const handlePlaceOrder = async () => {

        if (
            !address.full_name ||
            !address.mobile ||
            !address.delivery_address ||
            !address.city ||
            !address.pincode
        ) {
            alert("Please fill all delivery address fields");
            return;
        }

        try {

            const customerId = localStorage.getItem("customer_id");

            const orderData = {
                customer_id: customerId,

                delivery_address:
                    `${address.full_name},
${address.mobile},
${address.delivery_address},
${address.city} - ${address.pincode}`,

                items: cartItems.map((item) => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price: item.price
                }))
            };

            console.log(orderData);

            const data = await createOrder(orderData);

            console.log(data);

            alert("Order Placed Successfully");

           navigate("/order-success");
        } catch (error) {

            console.log(error);

            alert("Order Failed");

        }
    };

    if (loading) {
        return <h2>Loading Checkout...</h2>;
    }

    return (
        <div style={{ padding: "20px" }}>

            <h1>Checkout</h1>

            <div
                style={{
                    border: "1px solid #ddd",
                    padding: "20px",
                    borderRadius: "8px",
                    marginBottom: "25px"
                }}
            >

                <h2>Delivery Address</h2>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={address.full_name}
                    onChange={(e) =>
                        setAddress({
                            ...address,
                            full_name: e.target.value
                        })
                    }
                    style={{ width: "100%", padding: "10px" }}
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Mobile Number"
                    value={address.mobile}
                    onChange={(e) =>
                        setAddress({
                            ...address,
                            mobile: e.target.value
                        })
                    }
                    style={{ width: "100%", padding: "10px" }}
                />

                <br /><br />

                <textarea
                    placeholder="Delivery Address"
                    rows="4"
                    value={address.delivery_address}
                    onChange={(e) =>
                        setAddress({
                            ...address,
                            delivery_address: e.target.value
                        })
                    }
                    style={{ width: "100%", padding: "10px" }}
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) =>
                        setAddress({
                            ...address,
                            city: e.target.value
                        })
                    }
                    style={{ width: "100%", padding: "10px" }}
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Pincode"
                    value={address.pincode}
                    onChange={(e) =>
                        setAddress({
                            ...address,
                            pincode: e.target.value
                        })
                    }
                    style={{ width: "100%", padding: "10px" }}
                />

            </div>

            {
                cartItems.length === 0 ? (
                    <h3>Cart is Empty</h3>
                ) : (
                    <>
                        {
                            cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "15px",
                                        marginBottom: "15px",
                                        borderRadius: "8px"
                                    }}
                                >

                                    <h3>{item.product_name}</h3>

                                    <p>Quantity : {item.quantity}</p>

                                    <p>Price : ₹{item.price}</p>

                                    <p>Total : ₹{item.total_price}</p>

                                </div>
                            ))
                        }

                        <hr />

                        <h2>
                            Grand Total : ₹{grandTotal}
                        </h2>

                        <button
                            onClick={handlePlaceOrder}
                            style={{
                                background: "green",
                                color: "white",
                                padding: "12px 20px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "16px"
                            }}
                        >
                            Place Order
                        </button>

                    </>
                )
            }

        </div>
    );
}

export default Checkout;