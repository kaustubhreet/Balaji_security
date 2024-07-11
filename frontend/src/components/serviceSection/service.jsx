import { Container, Grid, Box, Typography } from '@mui/material';

const Service = () => {
  const services = [
    {
      image: 'bi bi-briefcase', // Replace with your image path
      title: 'Financial Planning',
      description: 'Financial planning is the process of setting and achieving personal or organizational financial goals...',
    },
    {
      image: 'bi bi-card-checklist', // Replace with your image path
      title: 'IPO Service',
      description: 'An IPO (Initial Public Offering) service refers to the process and assistance provided by financial institutions...',
    },
    {
        image: 'bi bi-bar-chart', // Replace with your image path
        title: 'Derivatives Broking',
        description: 'Derivatives broking involves facilitating the trading of financial instruments known as derivatives between buyers and sellers. Derivatives are financial contracts or instruments that derive their value from an underlying asset, such as stocks, bonds, commodities, currencies, or indices.',
      },
      {
        image: 'bi bi-binoculars', // Replace with your image path
        title: 'Fixed Deposits Stock',
        description: 'A fixed deposit (also known as a time deposit or term deposit) is a financial instrument offered by banks and other financial institutions. It allows individuals to deposit a certain amount of money for a fixed period at a predetermined interest rate.',
      },
      {
        image: 'bi bi-brightness-high', // Replace with your image path
        title: 'Holding Planning',
        description: "Holding planning is not a standard financial term or concept that I am aware of. It's possible that you might be referring to a specific type of planning related to holding assets, investments, or positions, but without further context or details, I cannot provide a specific explanation.",
      },
      {
        image: 'bi bi-calendar4-week', // Replace with your image path
        title: 'Mutual funds',
        description: 'Mutual funds are investment vehicles that pool money from multiple investors to invest in a diversified portfolio of stocks, bonds, or other securities. They are managed by professional fund managers who make investment decisions on behalf of the funds shareholders.',
      },

  ];

  return (
    <section id="services" style={{background:"black",color:"white"}}>
       <center><h2 style={{fontSize:"38px",fontWeight:"bolder",paddingTop:"4rem"}}>Services</h2></center>
        <Typography variant='body1' sx={{alignItems:"center",marginInline:"20%",marginBottom:"40px",marginTop:"20px"}}>Equities and securities are terms commonly used in the world of finance and investing. They refer to different types of financial instruments that represent ownership or rights in a company, organization, or asset.</Typography>
       
    <Container maxWidth="lg">
      <Grid container spacing={6} >
        {services.map((service, index) => (
          <Grid item xs={12} md={6} key={index} >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 4,
              }}
            >
              <Box sx={{ width: '40%',height:"120px" }}>
                <i className={service.image} style={{ color:"red",fontSize: '80px', lineHeight: '80px',marginLeft:"20px"  }} />
              </Box>
              <Box sx={{ width: '60%' }} style={{border:"1px solid white", padding:"10px 10px 10px",borderRadius:"20px"}}>
                <Typography variant="h5" gutterBottom>
                  {service.title}
                </Typography>
                <Typography variant="body3">
                  {service.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
    </section>
  );
};

export default Service;
