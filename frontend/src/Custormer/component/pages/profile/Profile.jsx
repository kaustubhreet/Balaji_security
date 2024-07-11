import React, { useState, useEffect } from 'react';
import DrawerHeader from '../../layouts/dashboard/SideBar';
import Typography from '@mui/material/Typography';
import { Box, CardContent, Grid, CardMedia, Dialog } from '@mui/material';
import Card from '@mui/material/Card';
import axios from 'axios';
//const data = [{ "NAME": "KAUSTUBH", "EMAIL": "MISHUYASHU@GMAIL.COM", "MOBILE": 9262685542, "AADHAR": 23619426293, "PANCARD": "NDUI32897BNDD8E", "FATHER NAME": "MANOJ KUMAR", "MOTHER NAME": "SAVITA DEVI", "NOMINEE": "BILL GATES", "TOTAL FUND": 126838291, "CURRENTFUND": 2910937.00 }];

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [userData, setUserData] = useState(null);
  const [pancard, setPanCard] = useState(null);
  const [adhaarf, setAdhaarf] = useState(null);
  const [adhaarb, setAdhaarb] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [availableamount, setAvailableamount] = useState(0);
  const [bankPassbook, setBankPassbook] = useState(null);
  //const { setDpPhoto } = useContext(AuthContext); // Get dpPhoto and setDpPhoto from context
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //url for profile: http://localhost:5000/mobileApi/profile
  useEffect(() => {
    // Fetch user profile data from backend
    async function fetchProfileData() {
      let token = localStorage.getItem('token');
      //const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pc2h1eWFzaHUyM0BnbWFpbC5jb20iLCJfaWQiOiI2NWRlYWY1MTBkZjg1ZWJkNzhjN2ZmMmIiLCJpYXQiOjE3MDkyMDkwNjMsImV4cCI6MTcxMTgwMTA2M30.KOoqhyf-7Be30_AiUl1ch6c53_17yuslGGDpv6XQTFc';

      try {
        //const headers = { 'Authorization': token };
        const response = await axios(`${backendUrl}/mobileApi/profile`, {
          headers: {
            Authorization: `${token}` // Include token in request headers
          },
        });

       
        if (!response) {
          throw new Error('Failed to fetch profile data');
        }

        const data = response.data;
        setUserData(data.result.userProfile);

        const url = `${backendUrl}/images/`;

        setPanCard(url + `${data.result.userProfile.documents.panCard}`);
        setAdhaarf(url + `${data.result.userProfile.documents.adharCardFront}`);
        setAdhaarb(url + `${data.result.userProfile.documents.adharCardBack}`);
        setBankPassbook(url + `${data.result.userProfile.documents.bankPassbook}`);
        setPhoto(url + `${data.result.userProfile.documents.passportImage}`);
        // Set profile picture URL
        //setDpPhoto(url + `${data.result.userProfile.documents.passportImage}`);

        //console.log(data.result.userProfile);
        //setUserData(data.userProfile);
        if (response.data.code === 1) {
          try {
              const respo = await axios(`${backendUrl}/mobileApi/getamount/${response.data.result.userProfile.email}`);
              console.log(respo);
              if (respo) {
                  setAvailableamount(respo.data.amount);
              }
          } catch (error) {
              if (error.response && error.response.status === 404) {
                  // Set Availableamount to 0 if 404 error occurs
                  setAvailableamount(0);
              } else {
                  // Handle other errors if needed
                  console.error("Error fetching amount:", error);
              }
          }
      
         }
    }catch (error) {
        let err=error.message
        //console.log(error.response.data,71);
        //if(error.response.status!==403)
        alert(err);
      }
    }

    fetchProfileData();
  }, []);

  //console.log(pancard);



  if (!userData) {
    return (
      <Box sx={{ display: 'flex' }}>
        <DrawerHeader />
        <Box sx={{ flexGrow: 1, p: 3, mt: '64px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        data not available
      </Box>
      </Box>
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
                  NAME - {userData.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  EMAIL - {userData.email}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  MOBILE - {userData.mobile}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  AADHAR NUMBER - {userData.adharNumber}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  PAN CARD - {userData.panNumber}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  FATHER NAME - {userData.fatherName}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  MOTHER NAME - {userData.motherName}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  NOMINEE - {userData.nomineeName}
                </Typography>
                
                <Box sx={{ display: 'flex', p: 2, gap: 5 }}>
                  <Typography variant="h5" color="text.primary" component="div" sx={{ mb: 3, fontWeight: "bolder" }}>
                    TOTAL FUND: {availableamount}
                  </Typography>
                  {/*<Typography variant="h5" color="text.primary" component="div" sx={{ mb: 3, fontWeight: "bolder" }}>
                    CURRENT AVAILABLE MARGIN: {userData.nomineeName}
  </Typography>*/}
                  
                </Box>
                <hr style={{ backgroundColor: "red", padding: "1px" }} />
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: "350px", height: "450px", padding: "2px 2px",marginRight:"100px",marginBottom:"10px" }}
              image={photo}
              alt="album cover"
            />
          </Card>

        </Box>
      </Box>



      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1, p: 3, mt: '64px', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Grid container spacing={3} sx={{ height: 'auto', width: 'auto', alignItems: 'center', justifyContent: 'center' }}>

            <Grid item sx={{ width: "250px", height: "350px" }} >
              <Card onClick={() => handleOpen( adhaarf )}>
                <CardContent>
                  <Typography variant="h6" color="text.secondary">
                    Adhaar Card front:
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  height="auto"
                  width="100%"
                  image={adhaarf}
                  alt="image1"
                />
              </Card>
            </Grid>

            <Grid item sx={{ width: "250px", height: "350px" }}>
              <Card onClick={() => handleOpen( adhaarb )}>

                <CardContent>
                  <Typography variant="h6" color="text.secondary">
                    Adhaar Card back:
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  height="auto"
                  width="100%"
                  image={adhaarb}
                  alt="image2"
                />
              </Card>
            </Grid>
            <Grid item sx={{ width: "250px", height: "350px" }}>
              <Card onClick={() => handleOpen(pancard)}>

                <CardContent>
                  <Typography variant="h6" color="text.secondary">
                    Pan Card Details
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  height="auto"
                  width="100%"
                  image={pancard}
                  alt="image3"
                />
              </Card>
            </Grid>
            <Grid item sx={{ width: "250px", height: "350px", margin: "10px" }}>
              <Card onClick={() => handleOpen(bankPassbook)}>


                <CardContent>
                  <Typography variant="h6" color="text.secondary">
                    Passbook Details
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  height="auto"
                  width="100%"
                  image={bankPassbook}
                  alt="image4"
                />
              </Card>
            </Grid>
          </Grid>
          <Dialog onClose={handleClose} open={open}>
            <CardMedia
              component="img"
              height="auto"
              width="100%"
              image={selectedImage}
              alt="Zoomed image"
            />
          </Dialog>
        </Box>
      </Box>
    </>
  )
}

export default Profile;