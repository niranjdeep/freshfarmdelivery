import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Products from "./pages/products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrders";
import AdminOrders from "./pages/AdminOrders";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import { GiLightBulb } from "react-icons/gi";


function App() {

    const [customerName, setCustomerName] = useState(null);


    useEffect(() => {

        const name = localStorage.getItem("customer_name");

        setCustomerName(name);

    }, []);



    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("customer_id");
        localStorage.removeItem("customer_name");

        setCustomerName(null);

        window.location.href = "/login";

    };



    return (

        <BrowserRouter>


            <nav
                style={{
                    padding: "15px",
                    background:"blue",
                    color:"white",
                    display: "flex",
                    gap: "15px",
                    alignItems: "center"
                }}
            >


                {
                    customerName ? (

                        <>

            
<span>
    Welcome {customerName?.split(" ")[0]} 🌱
</span>

                            <Link
                                to="/customer/dashboard"
                                style={{ color: "white" }}
                            >
                                Dashboard
                            </Link>


                            <Link
                                to="/"
                                style={{ color: "white" }}
                            >
                                Products
                            </Link>


                            <Link
                                to="/cart"
                                style={{ color: "white" }}
                            >
                                Cart
                            </Link>


                            <Link
                                to="/my-orders"
                                style={{ color: "white" }}
                            >
                                My Orders
                            </Link>


                            <button onClick={handleLogout}>
                                Logout
                            </button>


                        </>


                    ) : (

                        <>

                            <Link
                                to="/login"
                                style={{ color: "white" }}
                            >
                                Login
                            </Link>


                            <Link
                                to="/register"
                                style={{ color: "white" }}
                            >
                                Create Account
                            </Link>


                        </>

                    )

                }


            </nav>



            <Routes>


                {/* Public Routes */}


                <Route
                    path="/login"
                    element={<Login />}
                />


                <Route
                    path="/register"
                    element={<Register />}
                />



                {/* Customer Protected Routes */}


                <Route
                    path="/customer/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Products />
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/my-orders"
                    element={
                        <ProtectedRoute>
                            <MyOrders />
                        </ProtectedRoute>
                    }
                />



                {/* Admin Route */}


                <Route
                    path="/admin/orders"
                    element={<AdminOrders />}
                />


            </Routes>


        </BrowserRouter>

    );

}


export default App;