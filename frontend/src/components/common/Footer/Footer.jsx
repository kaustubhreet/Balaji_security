import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'black', padding: '20px 0', marginTop: 'auto',color:"white" }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5" style={{ fontFamily: 'Open Sans', marginBottom: '1rem',fontWeight:"bolder" }}>
              BALAJI SECURITIES
            </Typography>
            <hr style={{background:"red",padding:"3px"}}/>

            <Typography variant="body1">
              Kh no-202,<br />
              Himadri Appartment, Burari,<br />
              Delhi - 110084 <br />
              <strong>Phone:</strong> +91 9262685542 <br />
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" style={{ fontFamily: 'Open Sans', marginBottom: '1rem',fontWeight:"bolder" }}>
              Useful Links
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><i className="bi bi-chevron-right"></i><Link to="#">Home</Link></li>
              <li><i className="bi bi-chevron-right"></i><Link to="#about">About us</Link></li>
              <li><i className="bi bi-chevron-right"></i><Link to="#faq">FAQ</Link></li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" style={{ fontFamily: 'Open Sans', marginBottom: '1rem',fontWeight:"bolder" }}>
              Our Services
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><i className="bi bi-chevron-right"></i><Link to="https://www.nseindia.com/">NSE</Link></li>
              <li><i className="bi bi-chevron-right"></i><Link to="https://www.bseindia.com/">BSE</Link></li>
              <li><i className="bi bi-chevron-right"></i><Link to="#services">Services</Link></li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" style={{ fontFamily: 'Open Sans', marginBottom: '1rem',fontWeight:"bolder" }}>
              Join Our Newsletter
            </Typography>
            <Typography variant="body1">
              For More Information
            </Typography>
            <Typography variant="h6" style={{ fontFamily: 'Open Sans', marginTop: '1rem' }}>
              Call Now:
            </Typography>
            <Typography variant="body1">
              +91 9262685542 
            </Typography>
          </Grid>
        </Grid>
        <div style={{ marginTop: '2rem', borderTop: '1px solid #e0e0e0', paddingTop: '20px' }}>
          <Typography variant="body2" style={{ fontFamily: 'Open Sans', color: '#616161', textAlign: 'center' }}>
            &copy; Copyright <strong><span>KAUSTUBH REET</span></strong>.
          </Typography>
          <Typography variant="body2" style={{ fontFamily: 'Open Sans', color: '#616161', textAlign: 'center' }}>
            Designed by <a href="#" style={{ color: '#616161' }}>WEB DEVELOPER</a>
          </Typography>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
