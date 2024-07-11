import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


const Adminpage = () => {
  

  return (
    <>
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'url("./images/adminLogin.jpg")',
      backgroundSize: 'cover',
      }}>
        
      <Container >
        <Box style={{backgroundColor:"black",padding:"40px 40px",borderRadius:"20px"}}>
        <Typography variant="h2" style={{ color: 'white',fontWeight:"bolder", textAlign: 'center', marginBottom: '1.5rem' }}>
          Welcome to Balaji Securities Website
        </Typography>
        <Typography variant="h4" style={{ color: 'white',fontWeight:"bolder", textAlign: 'center', marginBottom: '3.5rem' }}>
           Admin Section
        </Typography>

        <Link to="/ad_login">
        <Button variant="contained" color="primary" style={{ color: 'white', textAlign: 'center', marginBottom: '1.5rem', padding:"7px",marginInline:"40%",fontWeight:"bolder",fontSize:'20px' }}>
         Admin Login
        </Button>
        </Link>
        </Box>
      </Container>
    </div>

    </>
  )
}

export default Adminpage