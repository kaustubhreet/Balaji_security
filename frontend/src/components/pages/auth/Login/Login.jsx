import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from React Router

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    //console.log(process.env);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    //console.log(backendUrl);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backendUrl}/mobileApi/login`, formData);

            //console.log(response,23); // Assuming your backend sends back some data

            if (response.status === 200) {
                // Redirect to "/dashboard" page if login is successful
                // console.log(formData.email);
                // Save email, password, and token in localStorage

                localStorage.setItem('email', formData.email);
                localStorage.setItem('role', "user");
                localStorage.setItem('token', response.data.result.token);

                // Set token expiration date to 30 days from now
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 15);
                sessionStorage.setItem('token', response.data.result.token);
                localStorage.setItem('expirationDate', expirationDate.toISOString());
                localStorage.setItem('loggedin', true);

                // Redirect to "/dashboard" page if login is successful

                alert(response.data.message);
                navigate("/dashboardhome");
            } else {
                console.log(response.data);
                if(response.data.status!==403)
                alert(response.data.message);
            }

        } catch (error) {
            let err = error.message
            //console.log(err);
            if(error.response.status!==403)
            alert(err);
        }
    };

    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expirationDate');
        const email = localStorage.getItem('email');
        const loggedin = localStorage.getItem('loggedin');
        localStorage.setItem('role', "user");

        if (loggedin === true) {
            navigate("/dashboardhome");
            return;

        }


        if (token && expirationDate && email) {
            const now = new Date();
            const expiration = new Date(expirationDate);
            if (now < expiration) {
                // Token is still valid, perform automatic login
                axios.post(`${backendUrl}/mobileApi/login`, { email, token })
                    .then(response => {
                        if (response.status === 200) {
                            navigate("/dashboardhome");
                        }
                    })
                    .catch(error => {
                        let err = error.message
                        //console.log(err);
                        if(error.response.status!==403)
                        alert(err);
                    });
            } else {
                // Token has expired, clear localStorage
                localStorage.removeItem('email');
                localStorage.removeItem('token');
                localStorage.removeItem('expirationDate');
                navigate("/login");
            }
        } else {
            navigate("/login");
        }
    }, []);


    return (
        <>
            <div className="container-fluid text-white d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "#081C34", margin: "0" }}>
                <div className="card shadow-lg p-5" style={{ backgroundColor: "#193D6A", color: "white" }}>
                    <Link to="/login" className="brand-logo"></Link>
                    <h2 className="text-center mb-4">Welcome to BALAJI SECURITIES 👋</h2>
                    <p className="text-center mb-4">Please sign-in to your account and start the adventure</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label" style={{ color: "white", fontSize: "20px" }}>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label" style={{ color: "white", fontSize: "20px" }}>Password</label>
                            <div className="input-group">
                            <input
                                 type={passwordVisible ? "text" : "password"}
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                            />
                            <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility} style={{ color: 'red', borderLeft: 'none' }}>
                                {passwordVisible ? "Hide" : "Show"}
                            </button>
                            </div>
                        </div>
                        <div className="form-check mb-3">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="rememberMe"
                            />
                            <label className="form-check-label" htmlFor="rememberMe">
                                Remember me
                            </label>
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary" style={{ alignContent: "center", fontSize: "25px" }}>
                                Login
                            </button>
                        </div>
                    </form>
                    <hr />
                    <div className="text-center mt-4">
                        <p>Forget your password?<Link to="/forgetpassword">
                            Reset Password
                        </Link>
                        </p>
                    </div>
                    <div className="text-center mt-4">
                        <p>New on our platform? <Link to="/register">Create an account</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
