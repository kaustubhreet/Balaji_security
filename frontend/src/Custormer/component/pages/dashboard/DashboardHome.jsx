import React, { useContext, useEffect } from 'react';
import DrawerHeader from '../../layouts/dashboard/SideBar';
import Box from '@mui/material/Box';
import { AuthContext } from '../../../../contextApi/AuthContext';
import axios from 'axios';


const DashboardHome = () => {
  const { setDpPhoto } = useContext(AuthContext); // Get dpPhoto and setDpPhoto from context
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    // Check if there's an authentication token in session storage
    const token = sessionStorage.getItem('token');
    async function fetchProfileData() {

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

        const url = `${backendUrl}/images/`;

        setDpPhoto(url + `${response.data.result.userProfile.documents.passportImage}`);
      } catch (error) {
        let err = error.message
        //console.log(err);
        alert(err);
      }
    }

    fetchProfileData();

  }, []);


  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <DrawerHeader /> {/* Assuming this component renders your sidebar and header */}
        <Box sx={{ flexGrow: 1, p: 3, mt: '64px' }}>
          <div className="container-sm">
            <div class="row" >

              <div class="col-xl-4 col-md-6 col-12">
                <div class="card card-congratulation-medal">
                  <div class="card-body" style={{height:"20vh"}}>
                    <h4 class="mb-75 mt-2 pt-50">Congratulations 🎉</h4>
                    <p class="card-text font-small-3">You have great strength to success</p>
                    <h3  >

                    </h3>

                    <img height="100"  src="https://www.mehtasecurity.in/public/backend/app-assets/images/illustration/badge.svg" class="congratulation-medal" alt="Medal Pic" />
                  </div>
                </div>
              </div>


              <div class="col-xl-8 col-md-6 col-12">
                <div class="card card-statistics">
                  <div class="card-header">
                    <h4 class="card-title" style={{ alignContent: "center", marginInline: "40%" }}>Statistics</h4>

                  </div>
                  <div class="card-body statistics-body">
                    <div class="row">
                      <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                        <div class="d-flex flex-row">
                          <div class="avatar bg-light-primary me-2">
                            <div class="avatar-content">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trending-up avatar-icon"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                            </div>
                          </div>
                          <div class="my-auto">
                            <h4 class="fw-bolder mb-0">230k</h4>
                            <p class="card-text font-small-3 mb-0">Sales</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                        <div class="d-flex flex-row">
                          <div class="avatar bg-light-info me-2">
                            <div class="avatar-content">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user avatar-icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </div>
                          </div>
                          <div class="my-auto">
                            <h4 class="fw-bolder mb-0">8.549k</h4>
                            <p class="card-text font-small-3 mb-0">Customers</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-sm-0">
                        <div class="d-flex flex-row">
                          <div class="avatar bg-light-danger me-2">
                            <div class="avatar-content">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-box avatar-icon"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                            </div>
                          </div>
                          <div class="my-auto">
                            <h4 class="fw-bolder mb-0">1.423k</h4>
                            <p class="card-text font-small-3 mb-0">Products</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-3 col-sm-6 col-12">
                        <div class="d-flex flex-row">
                          <div class="avatar bg-light-success me-2">
                            <div class="avatar-content">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign avatar-icon"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                            </div>
                          </div>
                          <div class="my-auto">
                            <h4 class="fw-bolder mb-0">$9745</h4>
                            <p class="card-text font-small-3 mb-0">Revenue</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{/*
            <Grid container spacing={3} sx={{ height: 'auto', width: 'auto', alignItems: 'center', justifyContent: 'center' }}>
             
              <Grid item xs={6}>
                <Paper className={classes.paper} >
                  <Typography variant="h4" gutterBottom style={{ marginLeft: "10%", marginTop: "5%", marginBottom: "5%", fontWeight: "bolder" }}>
                    CONGRATULATIONS
                  </Typography>
                  <Typography variant="p" gutterBottom style={{ marginLeft: "10%", marginTop: "5%" }}>
                    YOU HAVE WON SOMETHING SPECIALS
                  </Typography>
                  <Box style={{ marginLeft: "60%" }}>
                    <img alt="Avatar" src="./images/dpimage.jpeg" sx={{ height: "100px", width: "70px" }} />
                  </Box>
                </Paper>
              </Grid>
              

            </Grid>

            <Typography variant="h4" style={{ marginLeft: "40%", marginTop: "5%", fontWeight: "bolder", marginBottom: "20px" }}>
              STATISTICS
            </Typography>
            <Grid container spacing={3} sx={{ height: 'auto', width: 'auto', marginTop: "20px", alignItems: 'center', justifyContent: 'center' }}>

              <Grid item style={{ width: "200px", height: "250px", margin: "10px" }} >
                <Card >

                  <CardMedia
                    component="img"
                    height="auto"
                    width="100%"
                    image="./images/dpimage.jpeg"
                    alt="image1"
                  />
                  <CardContent>
                    <Typography variant="h6" color="text.secondary">
                      Adhaar Card front:
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item style={{ width: "200px", height: "250px", margin: "10px" }}>
                <Card >


                  <CardMedia
                    component="img"
                    height="auto"
                    width="100%"
                    image="./images/dpimage.jpeg"
                    alt="image2"
                  />
                  <CardContent>
                    <Typography variant="h6" color="text.secondary">
                      Adhaar Card back:
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item style={{ width: "200px", height: "250px", margin: "10px" }}>
                <Card >


                  <CardMedia
                    component="img"
                    height="auto"
                    width="100%"
                    image="./images/dpimage.jpeg"
                    alt="image3"
                  />
                  <CardContent>
                    <Typography variant="h6" color="text.secondary">
                      Pan Card Details
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item style={{ width: "200px", height: "250px", margin: "10px" }}>
                <Card >

                  <CardMedia
                    component="img"
                    height="auto"
                    width="100%"
                    image="./images/dpimage.jpeg"
                    alt="image4"
                  />
                  <CardContent>
                    <Typography variant="h6" color="text.secondary">
                      Passbook Details
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            */}


          </div>
        </Box>
      </Box>


    </>
  )
}

export default DashboardHome;