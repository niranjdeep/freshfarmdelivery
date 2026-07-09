import { useEffect, useState } from "react";

import {
    getCart,
    updateCart,
    removeCart
} from "../services/cartService";


function Cart() {

    const [cartItems, setCartItems] = useState([]);

    const [loading, setLoading] = useState(true);



    useEffect(() => {

        loadCart();

    }, []);




    const loadCart = async () => {

        try {

            const customerId = localStorage.getItem("customer_id");


            console.log("Customer ID:", customerId);


            const data = await getCart(customerId);


            console.log("Cart Data:", data);


            setCartItems(data);


        } catch (error) {

            console.log(error);


        } finally {

            setLoading(false);

        }

    };





    const changeQuantity = async (item, newQuantity) => {


        if (newQuantity < 1) {

            return;

        }


        try {

            await updateCart(

                item.id,

                newQuantity

            );


            loadCart();


        } catch(error) {

            console.log(error);

        }

    };





    const handleRemove = async (cart_id) => {


        try {

            await removeCart(cart_id);


            loadCart();


        } catch(error) {

            console.log(error);

        }

    };





    const grandTotal = cartItems.reduce(

        (total, item) =>

            total + Number(item.total_price),

        0

    );





    if (loading) {

        return <h2>Loading Cart...</h2>;

    }





    return (

        <div style={{padding:"20px"}}>


            <h1>
                My Cart
            </h1>



            {
                cartItems.length === 0 ? (

                    <h3>
                        Cart is Empty
                    </h3>


                ) : (


                    <>


                    {
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
                                    Category: {item.category}
                                </p>



                                <p>
                                    Price: ₹{item.price}
                                </p>




                                <div>


                                    <button

                                        onClick={() =>
                                            changeQuantity(
                                                item,
                                                item.quantity - 1
                                            )
                                        }

                                    >

                                        -

                                    </button>




                                    <span

                                        style={{
                                            margin:"0 15px"
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

                                    >

                                        +

                                    </button>


                                </div>





                                <p>
                                    Total: ₹{item.total_price}
                                </p>




                                <button

                                    onClick={() =>
                                        handleRemove(item.id)
                                    }

                                    style={{

                                        background:"red",

                                        color:"white",

                                        border:"none",

                                        padding:"8px 15px",

                                        borderRadius:"5px",

                                        cursor:"pointer"

                                    }}

                                >

                                    Remove

                                </button>



                            </div>


                        ))
                    }





                    <hr />



                    <h2>

                        Grand Total : ₹{grandTotal}

                    </h2>



                    </>


                )

            }



        </div>

    );

}



export default Cart;