import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getOrderDetails } from "../services/orderService";


function OrderDetails() {


    const { order_id } = useParams();


    const [order, setOrder] = useState(null);

    const [loading, setLoading] = useState(true);




    useEffect(() => {

        loadOrder();

    }, []);





    const loadOrder = async () => {


        try {


            const data = await getOrderDetails(
                order_id
            );


            console.log(
                "Order Details:",
                data
            );


            setOrder(data);



        } catch(error) {


            console.log(error);



        } finally {


            setLoading(false);


        }


    };





    if (loading) {

        return <h2>Loading Order...</h2>;

    }





    return (

        <div
            style={{
                padding:"20px"
            }}
        >


            <h1>
                Order Details
            </h1>



            <h3>
                Order ID : {order.order_id}
            </h3>


            <p>
                Status : {order.status}
            </p>


            <p>
                Total : ₹{order.total_amount}
            </p>



            <h2>
                Products
            </h2>


            {
                order.items?.map((item)=>(

                    <div
                        key={item.product_id}
                    >

                        <p>
                            Product : {item.product_name}
                        </p>

                        <p>
                            Quantity : {item.quantity}
                        </p>

                        <p>
                            Price : ₹{item.price}
                        </p>


                    </div>


                ))
            }


        </div>

    );

}


export default OrderDetails;