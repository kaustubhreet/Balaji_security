import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom"; // Import Link from React Router

const Register = () => {
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    adharNumber: '',
    panNumber: '',
    fatherName: '',
    motherName: '',
    nomineeName: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    passportImage: null,
    adharCardFront: null,
    adharCardBack: null,
    panCard: null,
    bankPassbook: null,
  });

  //console.log(formData);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
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

      // Make axios POST request with formDataToSend
      const response = await axios.post(`${backendUrl}/mobileApi/register`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set proper headers for formData
        }
      });

      //console.log(response.data.message);

      if (response.data.code === 1) {
       
        alert(response.data.message);
        navigate("/login");
      }
      else
      {
        //console.log(response.data);
         alert(response.data.message);
      }
      //console.log(response.data); // Assuming your backend sends back some data
    } catch (error) {
      let err=error.message
            //console.log(err);
            if(error.response.status!==403)
            alert(err);
    }
  };


  return (
    <>
      <div className="container-fluid text-white d-flex justify-content-center align-items-center" style={{ height: "100%", backgroundColor: "#081C34", overflowY: "auto" }}>
        <div className="card shadow-lg p-5" style={{ backgroundColor: "#193D6A", color: "white", marginTop: "30px" }}>
          <Link to="/login" className="brand-logo"></Link>
          <h2 className="text-center mb-4">Welcome to BALAJI SECURITIES 👋</h2>
          <p className="text-center mb-4">Please create your account and start the adventure</p>
          <form onSubmit={handleSubmit} encType="multipart/form-data">

            <div className="mb-3">
              <label htmlFor="name" className="form-label" style={{ color: "white", fontSize: "20px" }}>Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
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
              <label htmlFor="confirmPassword" className="form-label"
                style={{ color: "white", fontSize: "20px" }}>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Enter your password again"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label" style={{ color: "white", fontSize: "20px" }}>Mobile Number</label>
              <input
                type="number"
                className="form-control"
                id="mobile"
                name="mobile"
                placeholder="Enter your Mobile number"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="adharNumber" className="form-label" style={{ color: "white", fontSize: "20px" }}>Adhaar Number</label>
              <input
                type="number"
                className="form-control"
                id="adharNumber"
                name="adharNumber"
                placeholder="Enter your adhaar number"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="panNumber" className="form-label" style={{ color: "white", fontSize: "20px" }}>PAN Number</label>
              <input
                type="text"
                className="form-control"
                id="panNumber"
                name="panNumber"
                placeholder="Enter your Pan Card number"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fatherName" className="form-label" style={{ color: "white", fontSize: "20px" }}>Father Name</label>
              <input
                type="text"
                className="form-control"
                id="fatherName"
                name="fatherName"
                placeholder="Enter your father name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="motherName" className="form-label" style={{ color: "white", fontSize: "20px" }}>Mother Name</label>
              <input
                type="text"
                className="form-control"
                id="motherName"
                name="motherName"
                placeholder="Enter your mother name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nomineeName" className="form-label" style={{ color: "white", fontSize: "20px" }}>Nominee Name</label>
              <input
                type="text"
                className="form-control"
                id="nomineeName"
                name="nomineeName"
                placeholder="Enter your Nominee name"
                onChange={handleChange}
                required
              />
            </div>


            <p className="card-text mb-2 text-center">Bank Details</p>

            <div className="mb-3">
              <label
                htmlfor="accountHolderName"
                className="form-label"
                style={{ color: "white", fontSize: "20px" }}
              >
                Account Holder Name
              </label>
              <input
                id="accountHolderName"
                type="text"
                className="form-control"
                name="accountHolderName"
                placeholder="Enter account holder name"
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-3">
              <label
                for="accountNumber"
                className="form-label"
                style={{ color: "white", fontSize: "20px" }}
              >
                {" "}
                Account Number
              </label>


              <input
                id="accountNumber"
                type="number"
                className="form-control"
                name="accountNumber"
                placeholder="Enter account number"
                onChange={handleChange}
                required
              />
            </div>


            <div className="mb-3">
              <label
                for="ifscCode"
                className="form-label"
                style={{ color: "white", fontSize: "20px" }}
              >
                {" "}
                IFSC Code
              </label>


              <input
                id="ifscCode"
                type="text"
                className="form-control"
                name="ifscCode"
                placeholder="Enter account IFSC code"
                onChange={handleChange}
                required
              />
            </div>



            <p className="card-text mb-2 text-center">
              Upload Documents
            </p>

            <div className="mb-3">
              <label
                for="passportImage"
                className="form-label"
                style={{ color: "white", fontSize: "20px" }}
              >
                {" "}
                Passport Image
              </label>


              <input
                id="passportImage"
                type="file"
                className="form-control"
                name="passportImage"
                onChange={handleChange}
                required
              />
            </div>


            <div className="mb-3">
              <label
                for="adharCardFront"
                className="form-label"
                style={{ color: "white", fontSize: "20px" }}
              >
                {" "}
                Adhar Card Front
              </label>


              <input
                id="adharCardFront"
                type="file"
                className="form-control"
                name="adharCardFront"
                onChange={handleChange}
                required
              />
            </div>


            <div className="mb-3">
              <label
                for="adharCardBack"
                className="form-label"
                style={{ color: "white", fontSize: "20px" }}
              >
                {" "}
                Adhar Card Back
              </label>


              <input
                id="adharCardBack"
                type="file"
                className="form-control"
                name="adharCardBack"
                onChange={handleChange}
                required
              />
            </div>


            <div className="mb-3">
              <label
                for="panCard"
                className="form-label"
                style={{ color: "white", fontSize: "20px" }}
              >
                {" "}
                Pan Card
              </label>


              <input
                id="panCard"
                type="file"
                className="form-control"
                name="panCard"
                onChange={handleChange}
                required
              />
            </div>


            <div className="mb-3">
              <label
                for="bankPassbook"
                className="form-label"
                style={{ color: "white", fontSize: "20px" }}
              >
                {" "}
                Bank Passbook
              </label>


              <input
                id="bankPassbook"
                type="file"
                className="form-control"
                name="bankPassbook"
                onChange={handleChange}
                required
              />
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
                Sign in
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p>Already have account? <Link to="/login">Login instead</Link></p>
          </div>
        </div>
      </div>

    </>
  );
};

export default Register;
