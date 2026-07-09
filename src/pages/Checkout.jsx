import { useEffect, useState } from "react";

import { getCart } from "../services/cartService";
import { createOrder } from "../services/orderService";


function Checkout() {


    const [cartItems, setCartItems] = useState([]);

    const [loading, setLoading] = useState(true);



    useEffect(() => {

        loadCart();

    }, []);




    const loadCart = async () => {

        try {

            const customerId = localStorage.getItem(
                "customer_id"
            );


            const data = await getCart(customerId);


            setCartItems(data);


        } catch(error) {

            console.log(error);


        } finally {

            setLoading(false);

        }

    };





    const grandTotal = cartItems.reduce(

        (total, item) =>

            total + Number(item.total_price),

        0

    );





    const handlePlaceOrder = async () => {

        try {


            const customerId = localStorage.getItem(
                "customer_id"
            );


            const orderData = {

                customer_id: customerId,

                total_amount: grandTotal,

                items: cartItems.map((item) => ({

                    product_id: item.product_id,

                    quantity: item.quantity,

                    price: item.price

                }))

            };



            console.log(
                "Order Data:",
                orderData
            );



            const data = await createOrder(orderData);



            console.log(
                "Order Response:",
                data
            );



            alert(
                "Order Placed Successfully"
            );



            window.location.href = "/orders";



        } catch(error) {


            console.log(error);


            alert(
                "Order Failed"
            );


        }

    };






    if (loading) {

        return (

            <h2>
                Loading Checkout...
            </h2>

        );

    }






    return (

        <div
            style={{
                padding:"20px"
            }}
        >


            <h1>
                Checkout
            </h1>





            {
                cartItems.length === 0 ? (

                    <h3>
                        Cart is Empty
                    </h3>


                ) : (


                    cartItems.map((item) => (


                        <div

                            key={item.id}

                            style={{

                                border:"1px solid #ddd",

                                padding:"15px",

                                marginBottom:"15px",

                                borderRadius:"8px"

                            }}

                        >


                            <h3>
                                {item.product_name}
                            </h3>


                            <p>
                                Quantity: {item.quantity}
                            </p>


                            <p>
                                Price: ₹{item.price}
                            </p>


                            <p>
                                Total: ₹{item.total_price}
                            </p>



                        </div>


                    ))


                )

            }





            <hr />



            <h2>
                Grand Total : ₹{grandTotal}
            </h2>





            <button

                onClick={handlePlaceOrder}

                style={{

                    padding:"10px 20px",

                    cursor:"pointer"

                }}

            >

                Place Order

            </button>




        </div>

    );

}



export default Checkout;