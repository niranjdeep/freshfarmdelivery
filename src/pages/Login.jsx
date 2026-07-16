import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginCustomer } from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        mobile_number: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const data = await loginCustomer(formData);

            localStorage.setItem("token", data.access_token);
            localStorage.setItem("customer_id", data.customer.customer_id);
            localStorage.setItem("customer_name", data.customer.full_name);

            alert("Login Successful");

            navigate("/customer/dashboard");

        } catch (error) {

            console.log(error.response?.data || error);

            alert("Login Failed");
        }
    };

    return (
        <div>

            <h1>Customer Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="text"
                    name="mobile_number"
                    placeholder="Mobile Number"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;