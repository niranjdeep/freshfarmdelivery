import { useEffect, useState } from "react";

import {
    getAdminOrders,
    updateOrderStatus
} from "../services/adminService";

import "./AdminOrders.css";


function AdminOrders() {


    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);



    useEffect(() => {

        loadOrders();

    }, []);




    const loadOrders = async () => {

        try {

            const data = await getAdminOrders();

            console.log(
                "Admin Orders:",
                data
            );


            setOrders(
                data.orders || []
            );


        }
        catch(error) {

            console.log(error);

        }
        finally {

            setLoading(false);

        }

    };




    const handleStatusChange = async (
        order_id,
        status
    ) => {

        try {


            await updateOrderStatus(
                order_id,
                status
            );


            alert(
                "Status Updated Successfully"
            );


            loadOrders();


        }
        catch(error) {


            console.log(error);


            alert(
                "Status Update Failed"
            );

        }

    };




    if(loading){

        return (

            <h2 className="loading">
                Loading Orders...
            </h2>

        );

    }





    return (

        <div className="admin-container">


            <h1>
                Admin Order Management 🌱
            </h1>




            <div className="status-summary">


                <div className="summary-card">

                    <h3>
                        Total Orders
                    </h3>

                    <h2>
                        {orders.length}
                    </h2>

                </div>



                <div className="summary-card">

                    <h3>
                        Pending
                    </h3>

                    <h2>

                    {
                        orders.filter(
                            order =>
                            order.status === "Pending"
                        ).length
                    }

                    </h2>

                </div>



                <div className="summary-card">

                    <h3>
                        Completed
                    </h3>

                    <h2>

                    {
                        orders.filter(
                            order =>
                            order.status === "Completed"
                        ).length
                    }

                    </h2>

                </div>


            </div>





            {
                orders.length === 0 ?

                (

                    <h3>
                        No Orders Found
                    </h3>

                )

                :

                (

                    orders.map((order)=>(


                        <div
                            className="order-card"
                            key={order.order_id}
                        >


                            <h3>
                                Order ID : {order.order_id}
                            </h3>


                            <p>
                                Customer ID :
                                {order.customer_id}
                            </p>


                            <p>
                                Total Amount :
                                ₹{order.total_amount}
                            </p>


                            <p>
                                Current Status :
                                <b>
                                    {" "}{order.status}
                                </b>
                            </p>




                            <select

                                value={order.status}

                                onChange={(e)=>
                                    handleStatusChange(
                                        order.order_id,
                                        e.target.value
                                    )
                                }

                            >

                                <option value="Pending">
                                    Pending
                                </option>


                                <option value="Approved">
                                    Approved
                                </option>


                                <option value="Processing">
                                    Processing
                                </option>


                                <option value="Completed">
                                    Completed
                                </option>


                                <option value="Rejected">
                                    Rejected
                                </option>


                            </select>



                        </div>


                    ))

                )

            }



        </div>

    );

}



export default AdminOrders;