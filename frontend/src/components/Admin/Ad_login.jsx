import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from React Router
import { AuthContext } from '../../contextApi/AuthContext';

const Ad_login = () => {
    const navigate = useNavigate();
    const { setAdrole } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };


    /*
    {
    "username": "Harsh Vardhan",
    "email": "kaustubhreet_co20b4_49@dtu.ac.in",
    "password":"mishuyashu"
}*/

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backendUrl}/admin/auth/login`, formData);
            
            if(response.data.code===0){
             alert(response.data.message); // Assuming your backend sends back some data
            }
            
            if (response.data.code === 1) {
                // Save email, password, role, and token in localStorage
                localStorage.setItem('token', response.data.result.token);
                localStorage.setItem('role', 'admin');
                setAdrole('admin'); // Set role in AuthContext
                localStorage.setItem('email', formData.email);

                // Set token expiration date to 15 days from now
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() +15);
                //sessionStorage.setItem('token', response.data.result.token);
                //sessionStorage.setItem('role', 'admin');
                localStorage.setItem('expirationDate', expirationDate.toISOString());
                localStorage.setItem('loggedin', true);
                // Redirect to "/dashboard" page if login is successful

                alert(response.data.message);
                navigate("/adminhome");
            }

        } catch (error) {
            let err = error.message
            //console.log(err);
            alert(err);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expirationDate');
        const email = localStorage.getItem('email');
        const loggedin = localStorage.getItem('loggedin');

        if (loggedin === true) {
            navigate("/adminhome");
            return;

        }

        if (token && expirationDate && email) {
            const now = new Date();
            const expiration = new Date(expirationDate);
            if (now < expiration) {
                // Token is still valid, perform automatic login
                axios.post(`${backendUrl}/admin/auth/login`, { email, token })
                    .then(response => {
                        if (response.status === 200) {
                            navigate("/adminhome");
                        }
                    })
                    .catch(error => {
                        let err = error.message;

                        if(error.response.status!==403)
                        alert(err);
                    });
            } else {
                // Token has expired, clear localStorage
                localStorage.removeItem('email');
                localStorage.removeItem('token');

                localStorage.removeItem('expirationDate');
                navigate("/ad_login");
            }
        } else {
            navigate("/ad_login");
        }
    }, []);


    return (
        <>
            <div className="container-fluid text-white d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "#081C34", margin: "0" }}>
                <div className="card shadow-lg p-5" style={{ backgroundColor: "#193D6A", color: "white" }}>
                    <Link to="/login" className="brand-logo"></Link>
                    <h2 className="text-center mb-4">Welcome to BALAJI SECURITIES 👋</h2>
                    <p className="text-center mb-4">Please login to your Admin account and start the adventure</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label" style={{ color: "white", fontSize: "20px" }}>User Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                            />
                        </div>
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
                                required
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
                                required
                            />
                            <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility} style={{ color: 'red', borderLeft: 'none' }}>
                                {passwordVisible ? "Hide" : "Show"}
                            </button>
                            </div>
                        </div>

                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary" style={{ alignContent: "center", fontSize: "25px" }}>
                                Login
                            </button>
                        </div>
                    </form>
                    <hr />
                    <div className="text-center mt-4">
                        <p>Forget your password?<Link to="/ad_forgetpassword">
                            Reset Password
                        </Link>
                        </p>
                    </div>

                    <div className="text-center mt-4">
                        <p>New on our platform? <Link to="/ad_sign">Create an account</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Ad_login;
