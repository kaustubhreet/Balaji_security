//http://localhost:5000/admin/auth/addBankDetails;

import React, {
  useEffect,
  useState,
  // useEffect 
} from 'react';
import DrawerHeader from '../../Custormer/component/layouts/dashboard/SideBar';
//import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
//import { styled } from '@mui/material/styles';
import axios from 'axios';
import { CardMedia } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"; // Import Link from React Router
import { Typography } from '@mui/material';



const AdminAddfund = () => {
  //const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  //const [bankPassbook, setBankPassbook] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    ifscCode: '',
    accountHolderName: '',
    accountNumber: '',
    QRImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };
  //getadminbankdetails

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      for (var key in formData) {
        // console.log(formData[key]);
        formDataToSend.append(key, formData[key]);
      }

      // Make axios POST request with formDataToSend
      const response = await axios.post(`${backendUrl}/admin/auth/addBankDetails`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set proper headers for formData
        }
      });
      if (response.status === 200) {
        navigate("/adminhome");
      }
      //console.log(response.data); // Assuming your backend sends back some data
    } catch (error) {
      let err = error.message
      //console.log(err);
      alert(err);
    }
  };

  const [bankdetails, setBankData] = useState([]);
  const [bankPassbook, setBankPassbook] = useState(null);
  const [lengt, setlegth] = useState(0);

  useEffect(() => {
    // Fetch user profile data from backend
    async function fetchadminBankData() {
      let token = localStorage.getItem('token');
      //const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pc2h1eWFzaHUyM0BnbWFpbC5jb20iLCJfaWQiOiI2NWRlYWY1MTBkZjg1ZWJkNzhjN2ZmMmIiLCJpYXQiOjE3MDkyMDkwNjMsImV4cCI6MTcxMTgwMTA2M30.KOoqhyf-7Be30_AiUl1ch6c53_17yuslGGDpv6XQTFc';

      try {
        //const headers = { 'Authorization': token };
        const response = await axios(`${backendUrl}/admin/auth/getadminbankdetails`, {
          headers: {
            Authorization: `${token}` // Include token in request headers
          },
        });



        if (!response) {
          throw new Error('Failed to fetch profile data');
        }

        const data = response.data;
        console.log(data);

        const len = data.result.BankDetails.length;
        setlegth(len);
        if(len>0){
        setBankData(data.result.BankDetails[len-1]);
        //console.log(data.result.BankDetails[1].documents.QRImage);
       
          const url = `${backendUrl}/images/`;
          setBankPassbook(url + `${data.result.BankDetails[len-1].documents.QRImage}`);
        }
      } catch (error) {
        let err = error.message
        //console.log(err);
        alert(err);

      }
    }

    fetchadminBankData();

  }, []);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <DrawerHeader /> {/* Assuming this component renders your sidebar and header */}
        <div className="container-fluid text-white d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "#081C34", marginBottom: "0", overflowY: "auto" }}>
          <div className="row">
            {/* Account details section */}
            <div className="col-12 col-md-6 " style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: "50px" }}>
              <div className="card shadow-lg p-5" style={{ backgroundColor: "#193D6A", color: "white", marginTop: "10%" }}>
                <Link to="/" className="brand-logo"></Link>
                <h2 className="text-center mb-4">ACCOUNT DETAILS 👋</h2>
                {
                  lengt > 0 ? (
                    <>

                      <p className="text-center mb-4">ACCOUNT HOLDER NAME: {bankdetails.accountHolderName}</p>

                      <CardMedia
                        component="img"
                        style={{ width: "80%", height: "30vh", marginBottom: "10px", marginInline: "10%" }}
                        image={bankPassbook}
                        alt="album cover"
                      />
                      <p className="text-center mb-4">ACCOUNT - {bankdetails.accountNumber}</p>
                      <p className="text-center mb-4">IFSC - {bankdetails.ifscCode}</p>
                    </>) : null}
              </div>
            </div>

            {/* Form section */}
            <div className="col-12 col-md-6">
              <div className="card shadow-lg p-5" style={{ backgroundColor: "#193D6A", color: "white", marginTop: "10%" }}>
                <Link to="/" className="brand-logo"></Link>
                <h2 className="text-center mb-4">Welcome to BALAJI SECURITIES 👋</h2>
                <p className="text-center mb-4">Please create user fund and start the adventure</p>

                <form onSubmit={handleSubmit} encType="multipart/form-data">

                  <div className="mb-3">
                    <label htmlFor="username" className="form-label" style={{ color: "white", fontSize: "20px" }}>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
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
                    <label htmlFor="ifscCode" className="form-label"
                      style={{ color: "white", fontSize: "20px" }}>ifscCode</label>
                    <input
                      type="text"
                      className="form-control"
                      id="ifscCode"
                      name="ifscCode"
                      placeholder="Enter your ifscCode"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="accountNumber" className="form-label" style={{ color: "white", fontSize: "20px" }}>Account Number</label>
                    <input
                      type="number"
                      className="form-control"
                      id="accountNumber"
                      name="accountNumber"
                      placeholder="Enter your Account Number"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="accountHolderName" className="form-label" style={{ color: "white", fontSize: "20px" }}>Account HolderName</label>
                    <input
                      type="text"
                      className="form-control"
                      id="accountHolderName"
                      name="accountHolderName"
                      placeholder="Enter your account HolderName"
                      onChange={handleChange}
                      required
                    />
                  </div>



                  <p className="card-text mb-2 text-center">
                    Upload Documents
                  </p>

                  <div className="mb-3">
                    <label
                      for="QRImage"
                      className="form-label"
                      style={{ color: "white", fontSize: "20px" }}
                    >
                      {" "}
                      QR Image
                    </label>

                    <input
                      id="QRImage"
                      type="file"
                      className="form-control"
                      name="QRImage"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary" style={{ alignContent: "center", fontSize: "20px" }}>
                      Add Fund Details
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
        {/*show data*/}



      </Box>
    </>
  )
}

export default AdminAddfund;