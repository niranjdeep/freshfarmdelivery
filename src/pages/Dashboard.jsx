import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {

    const customerName = localStorage.getItem("customer_name");

    return (

        <div className="dashboard-container">

            <div className="welcome-section">

                <h1>
                    Welcome {customerName} 🌱
                </h1>

                <p>
                    Fresh farm products delivered directly from our village farms
                </p>

            </div>


            <div className="dashboard-cards">


                <Link to="/" className="dashboard-card">

                    <div className="icon">
                        🥛
                    </div>

                    <h2>
                        Products
                    </h2>

                    <p>
                        Browse fresh milk, fish, chicken and farm products
                    </p>

                </Link>



                <Link to="/cart" className="dashboard-card">

                    <div className="icon">
                        🛒
                    </div>

                    <h2>
                        My Cart
                    </h2>

                    <p>
                        View your selected products
                    </p>

                </Link>




                <Link to="/my-orders" className="dashboard-card">

                    <div className="icon">
                        📦
                    </div>

                    <h2>
                        My Orders
                    </h2>

                    <p>
                        Track your order status and delivery
                    </p>

                </Link>


            </div>


        </div>

    );

}


export default Dashboard;