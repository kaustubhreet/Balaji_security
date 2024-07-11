import React, { useState } from 'react';
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';


const ForgetPassword= () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({email:''});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};


const backendUrl = process.env.REACT_APP_BACKEND_URL;

const handleSubmit = async (e) => {
    e.preventDefault();
    try {

        const response = await axios.post(`${backendUrl}/mobileApi/forget-password`, formData);

        console.log(response.data); // Assuming your backend sends back some data
        alert(response.data.message);
        if (response.data.code ===1) {
            // Redirect to "/dashboard" page if login is successful
           alert("check your email!!");
        }
    } catch (error) {
        let err=error.message
        //console.log(err);
        alert(err);
    }
};


  return (
   <>
   
 {/* Assuming this component renders your sidebar and header */}
 
  <div className="container-fluid text-white d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "#081C34", margin: "0" }}>
    <div className="card shadow-lg p-5" style={{ backgroundColor: "#193D6A", color: "white" }}>
        <Link to="/login" className="brand-logo"></Link>
        <h2 className="text-center mb-4">Forget Password👋</h2>
           <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label" style={{ color: "white", fontSize: "20px" }}>Email</label>
                <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                />
            </div>
            
            
            <div className="gap-2" style={{marginInline:"10px"}}>
                <button type="submit" className="btn btn-danger" style={{ alignContent: "center",marginInline:"10px", fontSize: "20px" }}>
                    Submit
                </button>
                <button type="cancel" onClick={() => navigate("/login")} className="btn btn-primary" style={{ alignContent: "center", fontSize: "20px" }} >
                    Go Back
                </button>
            </div>
        </form>
        
    </div>
</div>
    
    </>
  )
}

export default ForgetPassword