import { Container, Grid, Typography, Box, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/CheckCircle';

const AboutSection = () => {
  return (
    <section id="about" className="bg-dark">
      <Container maxWidth="md" style={{marginTop:"4rem"}}>
        <Grid container >
          <Grid item xs={12} md={5} style={{marginTop:"4rem"}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
              <Typography variant="h3" color="white" >
                WEALTH MANAGEMENT
              </Typography>
              <Typography variant="body1" color="white"  sx={{mt:4}}>
                {/* Your content here */}
                Having served over 1,00,000 clients over the last 25 years, our team has witnessed all types of bull and bear markets and strongly believe that in order to protect oneself from the volatility and to generate returns consistently, one needs an effective wealth manager. We offer Wealth Management services to all our clients and work very closely with each client to understand their long-term and short-term goals and thereupon provide them a variety of investment opportunities. Our work doesn't end there, from advising to executing to monitoring/evaluating we maintain a very proactive approach towards the wealth management aspect for our investors/clients.
              </Typography>
              <Button variant="contained" href="#about" sx={{ mt: 2 }} style={{color:"white",background:"black",border:"2px solid red",marginInline:"20%",borderRadius:"20px",padding:"10px 10px"}} >
                About Us
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <img style={{marginTop:"7rem",marginInline:"3rem"}} src="./images/homescreen.jpg" alt="about"/>
              <List style={{marginInline:"3rem"}}>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon style={{color:"red"}} />
                  </ListItemIcon>
                  <ListItemText style={{color:"white"}}  primary="Strong in-house research team" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon style={{color:"red"}} />
                  </ListItemIcon>
                  <ListItemText style={{color:"white"}}  primary="Goal based investment planners" />
                </ListItem>
                {/* Add more list items here */}
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon style={{color:"red"}} />
                  </ListItemIcon>
                  <ListItemText style={{color:"white"}}   primary="Experienced Team Has a Unique Blend of VC Investing, Operational Build-up and M&A Skills." />
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="body2" style={{marginTop:"2rem",paddingBottom:"2rem"}}>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckIcon style={{color:"white"}} />
              </ListItemIcon>
              <ListItemText style={{color:"white"}}  primary="Sistema Asia Fund India is a Securities & Exchange Board of India registered category II Alternative Investment fund (AIF)." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon style={{color:"white"}} />
              </ListItemIcon>
              <ListItemText style={{color:"white"}}  primary="Balaji is the exclusive partner with Sistema (A Russian Conglomerate with interest in Telecom, Retail, Real Estate, Technology, Healthcare etc.) for this fund" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon style={{color:"white"}} />
              </ListItemIcon>
              <ListItemText style={{color:"white"}}  primary="Invests in Series B+ rounds of technology enabled portfolio companies located in" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon style={{color:"white"}} />
              </ListItemIcon>
              <ListItemText style={{color:"white"}}  primary="India with gateway platform between India / SEA and Russia / Europe." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon style={{color:"white"}} />
              </ListItemIcon>
              <ListItemText style={{color:"white"}}  primary="Mid-Stage Investing is Under-Represented in India and offers an Attractive Playing Field." />
            </ListItem>
          </List>
        </Typography>
      </Container>
    </section>
  )
};

export default AboutSection;