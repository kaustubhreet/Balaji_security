import React from 'react';
import { Container, Grid, Typography, Button, Link } from '@mui/material';
import "./Herosection.css";

const HeroSection = () => {

 
  return (
    <>


    <section id="hero" className="d-flex align-items-center">
    <div data-aos="zoom-out" data-aos-delay="100" >
      <Container maxWidth="lg" >
        <Grid container spacing={2} style={{marginTop:"3rem"}}>
          <Grid item xs={12}>
            <Typography variant="h2" component="h2" gutterBottom style={{marginTop:"20px",marginLeft:"3rem",marginRight:"2rem"}}>
              Better digital experience with Balaji Securities
            </Typography>
            <Typography variant="h5" component="h3" gutterBottom style={{marginTop:"20px",color:"white",marginLeft:"3rem",marginRight:"2rem"}}>
              A Good Financial Plan is a road map that shows us exactly how the choices we make today will affect our future.
            </Typography>
            <Link href="#about" underline="none" sx={{ display: 'inline-block', mt: 2 }}>
              <Button variant="contained" color="primary" style={{marginTop:"20px",marginLeft:"3rem",marginRight:"2rem",padding:"20px 30px",background:"red",color:"whitesmoke",fontWeight:"bolder"}}>
                Get Started
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </div>

</section>
</>
  )
}

export default HeroSection;