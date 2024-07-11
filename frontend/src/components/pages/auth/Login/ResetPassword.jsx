import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate,Link } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const id = window.location.href;

  const handleResetPassword = async () => {
    try {
     
      const token=id.split("/")[4];
    
      //const token = id; // Assuming token is stored in localStorage
      if (!token) {
        setError("No token found. Please log in again.");
        return;
      }

      if (password === confirmPassword) {
        const response = await axios.post(
          `${backendUrl}/mobileApi/reset-password`,
          { token: token, confirmPassword: confirmPassword }
          
        );

        if (response.data.code===1) {
          // Password reset successful, redirect to login page or show success message
          //history.push("/login");
          alert(response.data.message);
          navigate("/login");
        } else {
          setError(response.data.message);
        }
      }
      else{
        alert("Password not match!! type again!");
      }
      
    } catch (error) {
      setError("An error occurred while resetting the password.");
      let err = error.message
      //console.log(err);
      alert(err);
    }
  };

  return (
    <>
     <div className="container-fluid text-white d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "#081C34", margin: "0" }}>
                <div className="card shadow-lg p-5" style={{ backgroundColor: "#193D6A", color: "white" }}>
                    <Link to="/" className="brand-logo"></Link>
                    <h2 className="text-center mb-4">Welcome to BALAJI SECURITIES 👋</h2>
                    
      <Container maxWidth="sm" style={{color:"white",borderColor:"2px solid white"}}>
      <h4 className="text-center mb-4">Reset Password</h4>
        {error && <Typography color="error">{error}</Typography>}
        <label htmlFor="password" className="form-label" style={{ color: "white", fontSize: "20px" }}>New Password</label>
        <TextField
          label="New Password"
          type="password"
          
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="password" className="form-label" style={{ color: "white", fontSize: "20px" }}>Confirm Password</label>
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
         
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button
          variant="contained"
          color="primary"
          style={{marginInline:"40%",color:"white",background:"red",padding:"2px 2px"}}
          onClick={handleResetPassword}
         
          disabled={!password || password !== confirmPassword}
        >
          Submit
        </Button>
      </Container>
      </div>
            </div>
    </>
  )
}

export default ResetPassword