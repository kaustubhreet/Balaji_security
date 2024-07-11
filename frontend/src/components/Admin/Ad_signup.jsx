import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom"; // Import Link from React Router

const Ad_signup = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        mobileNo: '',
        role: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();

            for (var key in formData) {
                //console.log(formData[key]);
                formDataToSend.append(key, formData[key]);
            }
            /*
            {
              "username": "Harsh Vardhan",
                "email": "kaustubhreet_co20b4_49@dtu.ac.in",
                "role":"admin",
                "mobileNo":"9262685542",
                "password":"mishuyashu"
            }*/

            // Make axios POST request with formDataToSend
            const response = await axios.post(`${backendUrl}/admin/auth/register`, formDataToSend, {
                headers: {
                    'Content-Type': 'application/json' // Set proper headers for formData
                }
            });

            if (response.data.code === 0) {
                let msg = response.data.message;
                alert(msg);
            }

            if (response.status === 200) {
                alert(response.data.message);
                navigate("/ad_login");
            }
            // console.log(response.data); // Assuming your backend sends back some data
        } catch (error) {
            let err = error.message
            //console.log(err);
            alert(err);
        }
    };

    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };


    return (
        <>
            <div className="container-fluid text-white d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "#081C34", overflowY: "auto" }}>
                <div className="card shadow-lg p-5" style={{ backgroundColor: "#193D6A", color: "white", marginTop: "30px" }}>
                    <Link to="/ad_login" className="brand-logo"></Link>
                    <h2 className="text-center mb-4">Welcome to  BALAJI SECURITIES 👋</h2>
                    <p className="text-center mb-4">Please create your Admin account and start the adventure</p>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label" style={{ color: "white", fontSize: "20px" }}>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                placeholder="Enter your name"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label" style={{ color: "white", fontSize: "20px" }}>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label"
                                style={{ color: "white", fontSize: "20px" }}>Password</label>
                           <div className="input-group">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                onChange={handleChange}
                                required
                            />
                            <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility} style={{ color: 'red', borderLeft: 'none' }}>
                                {passwordVisible ? "Hide" : "Show"}
                            </button>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="mobileNo" className="form-label" style={{ color: "white", fontSize: "20px" }}>Mobile Number</label>
                            <input
                                type="number"
                                className="form-control"
                                id="mobileNo"
                                name="mobileNo"
                                placeholder="Enter your Mobile number"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="role" className="form-label" style={{ color: "white", fontSize: "20px" }}>Role</label>
                            <select
                                className="form-select"
                                id="role"
                                name="role"
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select your role</option>
                                <option value="admin">Admin</option> {/* Replace with your first phone number */}
                                <option value="subAdmin">Sub-Admin</option> {/* Replace with your second phone number */}
                            </select>
                        </div>



                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary" style={{ alignContent: "center", fontSize: "25px" }}>
                                Sign in
                            </button>
                        </div>
                    </form>
                    <div className="text-center mt-4">
                        <p>Already have account? <Link to="/ad_login">Sign in instead</Link></p>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Ad_signup;
