import { useEffect, useState } from "react";

import { getCustomerOrders } from "../services/orderService";


function MyOrders() {


    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);



    useEffect(() => {

        loadOrders();

    }, []);




    const loadOrders = async () => {


        try {


            const customerId = localStorage.getItem(
                "customer_id"
            );


            const data = await getCustomerOrders(
                customerId
            );


            console.log(
                "Orders:",
                data
            );


            setOrders(data);



        } catch(error) {


            console.log(error);


        } finally {


            setLoading(false);


        }


    };





    if (loading) {

        return (

            <h2>
                Loading Orders...
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
                My Orders
            </h1>





            {
                orders.length === 0 ? (

                    <h3>
                        No Orders Found
                    </h3>


                ) : (


                    orders.map((order)=>(


                        <div

                            key={order.order_id}

                            style={{

                                border:"1px solid #ddd",

                                padding:"15px",

                                marginBottom:"15px",

                                borderRadius:"8px"

                            }}

                        >


                            <h3>
                                Order ID : {order.order_id}
                            </h3>


                            <p>
                                Total Amount : ₹{order.total_amount}
                            </p>


                            <p>
                                Status : {order.status}
                            </p>


                            <p>
                                Date : {order.created_at}
                            </p>


                        </div>


                    ))

                )

            }



        </div>

    );

}



export default MyOrders;