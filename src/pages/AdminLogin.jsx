import { useState } from "react";
import axios from "axios";

function AdminLogin() {

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

            const response = await axios.post(
                "http://127.0.0.1:8000/api/admin/login",
                formData
            );

            localStorage.setItem(
                "admin_id",
                response.data.admin_id
            );

            alert("Admin Login Successful");

            window.location.href = "/admin/dashboard";

        } catch (error) {

            console.log(error);

            alert("Invalid Mobile Number or Password");

        }

    };

    return (

        <div style={{ padding: "40px" }}>

            <h1>Admin Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="text"
                    name="mobile_number"
                    placeholder="Mobile Number"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>

    );

}

export default AdminLogin;