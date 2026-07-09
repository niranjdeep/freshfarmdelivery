import { useState } from "react";
import { registerCustomer } from "../services/authService";
import { useNavigate } from "react-router-dom";


function Register() {
    const navigate = useNavigate();


    const [formData, setFormData] = useState({

        full_name: "",
        mobile_number: "",
        email: "",
        village: "",
        password: "",
        confirm_password: ""

    });



    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };



    const handleRegister = async (e) => {

        e.preventDefault();


        try {

            const data = await registerCustomer(formData);

            console.log(data);

            alert("Registration Successful");
            navigate("/login");
            window.location.href = "/login";


        } catch (error) {

            console.log(error.response?.data || error);

            alert("Registration Failed");

        }

    };



    return (

        <div>

            <h1>Create Account</h1>


            <form onSubmit={handleRegister}>


                <input
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    onChange={handleChange}
                />


                <input
                    type="text"
                    name="mobile_number"
                    placeholder="Mobile Number"
                    onChange={handleChange}
                />


                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />


                <input
                    type="text"
                    name="village"
                    placeholder="Village"
                    onChange={handleChange}
                />


                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />


                <input
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                />


                <button type="submit">
                    Create Account
                </button>


            </form>


        </div>

    );

}


export default Register;