import React, { useEffect, useState } from 'react';
import DrawerHeader from '../../Custormer/component/layouts/dashboard/SideBar';
import { Typography, CardContent, Card, Grid, Box, Button } from '@mui/material';
//import { AuthContext } from '../../contextApi/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AdminHome = () => {
  //const { setDpPhoto } = useContext(AuthContext); // Get dpPhoto and setDpPhoto from context
  const [users, getUsers] = useState([]);
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const [mergeduser, setMergeduser] = useState([]);
  const [pendinguser, setPendinguser] = useState([]);

  const handleuserData = async (e) => {

    try {
      const token = window.localStorage.getItem("token");

      const response = await axios.get(`${backendUrl}/admin/auth/getusers`, {
        headers: {
          Authorization: `${token}` // Include token in request headers
        }
      });

      //console.log(response.data); // Assuming your backend sends back some data

      if (response.status === 200) {
        // Redirect to "/dashboard" page if login is successful
        //navigate("/login");
        //console.log(response.data, 31);

        getUsers(response.data);

        for (let us in response.data) {
          let alluser = response.data[us].email;
          //console.log(alluser);
          getPending(alluser);
        }
      }
    } catch (error) {
      let err=error.message
            //console.log(err);
            alert(err);
    }
  };

  useEffect(() => {
    handleuserData();


  }, []);


  const getPending = async (email) => {
    if (email)
      try {
        // Fetch data based on the email
        const response = await axios(`${backendUrl}/mobileApi/requestwithdrawal/${email}`);

        for (let us in response.data) {
          let pendingStatue = response.data[us].status;
          if (pendingStatue === "pending") {
            setPendinguser(response.data[us].email);
            setMergeduser(response.data);
          }
        }
      } catch (error) {
        let err=error.message
        //console.log(err);
        alert(err);
      }
  }

  //console.log(mergeduser, 78);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <DrawerHeader /> {/* Assuming this component renders your sidebar and header */}
        <Box sx={{ flexGrow: 1, p: 3, mt: '64px' }}>
        <Typography variant="h4" style={{marginInline:"40%",marginBottom:"20px"}}>
            All Active Users
          </Typography>
          <Grid container spacing={2}>
            {/* First Card */}
            <Grid item xs={12} sm={6}>
              <Card>
                {users.map((user, key) => (
                  <CardContent key={key}>
                    <Typography variant="body2">
                      Name: {user.name}
                    </Typography>
                    <Typography variant="body2">
                      Email: {user.email}
                    </Typography>
                    <Typography variant="body2">
                      Contact: {user.mobile}
                    </Typography>
                    {/* Add other user details as needed */}
                    <Button variant="outlined"
                      onClick={() => {
                        navigate('/getuserdetails', { state: { user: user } });
                      }}
                    >
                      View User Details
                    </Button>

                    <Button variant="outlined" sx={{ margin: "5px" }}
                      onClick={() => {
                        navigate('/adholdingequity', { state: { email: user.email } }); // Pass admin email as state
                      }}
                    >
                      View Holding Equity
                    </Button>
                    <Button variant="outlined" sx={{ margin: "5px" }}
                      onClick={() => {
                        navigate('/adpositionequity', { state: { email: user.email } }); // Pass admin email as state
                      }}
                    >
                      View Position Equity
                    </Button>
                    <Button variant="outlined" sx={{ margin: "5px" }}
                      onClick={() => {
                        navigate('/adholdingcommodity', { state: { email: user.email } }); // Pass admin email as state
                      }}
                    >
                      View Holding Commodity
                    </Button>
                    <Button variant="outlined" sx={{ margin: "5px" }}
                      onClick={() => {
                        navigate('/adpositioncommodity', { state: { email: user.email } }); // Pass admin email as state
                      }}
                    >
                      View Position Commodity
                    </Button>
                    <Button variant="outlined" sx={{ margin: "5px" }}
                      onClick={() => {
                        navigate('/adholdingfando', { state: { email: user.email } }); // Pass admin email as state
                      }}
                    >
                      View Holding F&O
                    </Button>
                    <Button variant="outlined" sx={{ margin: "5px" }}
                      onClick={() => {
                        navigate('/adpositionfando', { state: { email: user.email } }); // Pass admin email as state
                      }}
                    >
                      View Position F&O
                    </Button>
                    <Button variant="outlined" sx={{ margin: "5px" }}
                      onClick={() => {
                        navigate('/addeposit', { state: { email: user.email } }); // Pass admin email as state
                      }}
                    >
                      View Deposit
                    </Button>

                    <hr />
                  </CardContent>
                ))}
              </Card>
            </Grid>

            {/* Second Card */}
            <Grid item xs={12} sm={6}>
              <Card>
              <Typography variant="h5" component="div" style={{marginInline:"30%"}}>
                      Pending Withdrawals
                    </Typography>
                {mergeduser.map((user, key) => (
                  <CardContent key={key}>

                    
                    <Typography variant="body2">
                    Email: {user.email}
                    </Typography>
                    <Typography variant="body2">
                      Available Balance:{user.availabefund}
                    </Typography>
                    <Typography variant="body2">
                      Withdrawal Request:{user.requestamount}
                    </Typography>
                    {/* Add your social icons here */}
                    <Button variant="outlined" sx={{ margin: "5px",borderColor:"red" }}
                      onClick={() => {
                        navigate('/adwithdraw', { state: { email: user.email } }); // Pass admin email as state
                      }}
                    >
                      Action
                    </Button>
                    <hr />
                    {/* Add other icons as needed */}
                  </CardContent>
                ))}
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default AdminHome;