import React, { useState, useEffect } from 'react';
import DrawerHeader from '../../Custormer/component/layouts/dashboard/SideBar';
import Typography from '@mui/material/Typography';
import { Box, CardContent, CardMedia } from '@mui/material';
import Card from '@mui/material/Card';
import axios from 'axios';

const AdProfile = () => {
  const [userData, setUserData] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
  //url for profile: http://localhost:5000/mobileApi/profile
  useEffect(() => {
    // Fetch user profile data from backend
    async function fetchProfileData() {
      let token = localStorage.getItem('token');
      
      try {
       
        const response = await axios(`${backendUrl}/admin/auth/profile`, {
          headers: {
            Authorization: `${token}` // Include token in request headers
          },
        });

        if (!response) {
          throw new Error('Failed to fetch profile data');
        }

        const data = response.data;
        setUserData(data.result.userProfile);   
      } catch (error) {
        let err=error.message
        //console.log(err);
        alert(err);
      }
    }
    fetchProfileData();
  }, []);




  if (!userData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        data not available
      </Box>
    );
  }


  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <DrawerHeader /> {/* Assuming this component renders your sidebar and header */}
        <Box sx={{ flexGrow: 1, p: 3, mt: '64px' }}>
          <h1 style={{ fontSize: "30px", paddingBlock: "30px", fontWeight: "bold" }}>USER PROFILE</h1>
          
          <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1', paddingRight: '20px' }}>
              <CardContent>
                <Typography component="div" variant="h4" sx={{ mb: 3, fontWeight: "bolder" }}>
                 ADMIN NAME - {userData.username}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  EMAIL - {userData.email}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  MOBILE - {userData.mobileNo}
                </Typography>
                
                <hr style={{ backgroundColor: "red", padding: "1px" }} />
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: "350px", height: "450px", padding: "2px 2px",marginRight:"100px",marginBottom:"10px" }}
              image={'/images/dpimage.jpeg'}
              alt="album cover"
            />
          </Card>

        </Box>
      </Box>

    </>
  )
}

export default AdProfile;