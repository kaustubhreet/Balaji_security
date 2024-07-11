import React, { useState } from 'react';
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';


const Ad_changePassword = () => {
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword:''
});
/* input will be
{
    "currentPassword": "mishuyashu",
    "newPassword": "Harsh@123",
    "confirmPassword":"Harsh@123"
}
*/

/* output will be
{
  "code": 1,
  "message": "Password updated successfully",
  "result": {
    "result": {
      "_id": "65e1806a808bdac086a7222d",
      "username": "Harsh Vardhan",
      "role": "admin",
      "email": "kaustubhreet_co20b4_49@dtu.ac.in",
      "mobileNo": "9262685542",
      "password": "$2b$10$kjK7rJDhzhHT3utiy/mMQ.ee./CzJqn6jEz9Yq9c/OWR4oEOseWTy",
      "createdAt": "2024-03-01T07:14:50.599Z",
      "updatedAt": "2024-03-01T07:41:29.063Z",
      "__v": 0
    }
  }*/

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

        const token = window.localStorage.getItem("token");
        // console.log(token);
    
        const response = await axios.put(`${backendUrl}/admin/auth/change-password`, formData,{
            headers: {
                Authorization: `${token}` // Include token in request headers
            }
        });

        //console.log(response.data); // Assuming your backend sends back some data

        if (response.status === 200) {
            // Redirect to "/dashboard" page if login is successful
            navigate("/login");
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
        <h2 className="text-center mb-4">Change Password👋</h2>
           <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="currentPassword" className="form-label" style={{ color: "white", fontSize: "20px" }}>Current Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="Enter your current password"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="newPassword" className="form-label" style={{ color: "white", fontSize: "20px" }}>New Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label" style={{ color: "white", fontSize: "20px" }}>Confirm Password</label>
                <input
                    type="confirmPassword"
                    className="form-control"
                    id="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Enter confirm password"
                />
            </div>
            
            <div className="gap-2" style={{marginInline:"10px"}}>
                <button type="submit" className="btn btn-danger" style={{ alignContent: "center",marginInline:"10px", fontSize: "20px" }}>
                    Change Password
                </button>
                <button type="cancel" onClick={() => navigate("/adminhome")} className="btn btn-primary" style={{ alignContent: "center", fontSize: "20px" }} >
                    Go Back
                </button>
            </div>
        </form>
        
    </div>
</div>
   
   </>
  )
}

export default Ad_changePassword