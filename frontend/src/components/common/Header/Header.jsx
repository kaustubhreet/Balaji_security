import { Link } from 'react-router-dom'; // Import Link from React Router
//import logo from '../../../../public/images/logo.jpg';
import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
//import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null); // Added for second dropdown
  const theme = useTheme();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSecondMenuOpen = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleSecondMenuClose = () => {
    setAnchorEl2(null);
  };

  const menuItems = [
    // Add your menu items here
    { label: 'Home', link: '/' },
    { label: 'About', link: '#about' },
    { label: 'Contact', link: '#contact' },
    { label: 'Service', link: '#services',icons:'bi bi-chevron-down'}
  ];

  const secondMenuItems = [
    // Add your second dropdown menu items here
    { label: 'Career', link: '/career' },
    { label: 'NSE', link: 'https://www.nseindia.com/' },
    { label: 'BSE', link: 'https://www.bseindia.com/' },
    { label: 'FAQs', link: '#faqs' },
    { label: 'Terms & Conditions', link: '/terms' },
  ];

  return (
    <>
      {/* <header id="header" className="fixed-top d-flex align-items-center">
      <div className="container d-flex align-items-center">
        <Link to="/" className="logo me-auto">
          <img src={logo} alt="" style={{ minHeight: '100px', maxHeight: '100px' }} /></Link>

        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li><Link to="/" className="nav-link scrollto active">Home</Link></li>
            <li><Link to="#about" className="nav-link scrollto">About</Link></li>
            <li className="dropdown">
              <Link to="#">
                <span>Services</span> <i className="bi bi-chevron-down"></i>
              </Link>
              <ul>
                <li><Link to="/career">Career</Link></li>
                <li><a href="https://www.nseindia.com/">NSE</a></li>
                <li><a href="https://www.bseindia.com/">BSE</a></li>
                <li><Link to="#faqs">FAQ's</Link></li>
                <li><Link to="/terms">Terms & Conditions</Link></li>
              </ul>
            </li>
            <li><Link to="#contact" className="nav-link scrollto">Contact</Link></li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>

        <Link to="/login" className="get-started-btn scrollto">Login</Link>
       
      </div>
    </header>
    */}

<AppBar position="sticky" sx={{ top: 0, zIndex: theme.zIndex.drawer + 1, backgroundColor: "white", color: "black", fontSize: "20px" }}>
      <Toolbar disableGutters>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 0, marginLeft: "20px" }}>
          <Link to="/" className="logo me-auto">
            <img src={"./images/logo.png"} alt="logo" style={{ minHeight: '100px', maxHeight: '100px', marginBottom: "4px",marginTop:"4px" }} />
          </Link>
        </Typography>
        <Box sx={{ flexGrow: 1 }} /> {/* Spacer to push menu items to right */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}> {/* Only show menu icon on small screens */}
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls={anchorEl ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-list-grow"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'menu-list-grow',
            }}
          >
            {menuItems.map((item) => (
              <MenuItem key={item.label} onClick={handleMenuClose} component={Link} to={item.link}>
                <ListItemIcon>
                  {/* Add icons if needed */}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </MenuItem>
            ))}
            <Link to="/login" className="get-started-btn scrollto" style={{marginLeft:"30%",textDecoration:"none",color:"black"}}>Login</Link>
          </Menu>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}> {/* Only show menu items on larger screens */}
           {menuItems.map((item) => (
            
            <Button key={item.label} onClick={item.label === 'Service' ? handleSecondMenuOpen : null} sx={{ color: 'inherit', textDecoration: 'none' }}>
              {item.label}
            </Button>
          ))}
           {/* Removed redundant Services button */}
          <Menu
            id="menu-list-grow-second"
            anchorEl={anchorEl2}
            open={Boolean(anchorEl2)}
            onClose={handleSecondMenuClose}
            MenuListProps={{
              'aria-labelledby': 'menu-list-grow-second',
            }}
          >
            {secondMenuItems.map((item) => (
              <MenuItem key={item.label} onClick={handleSecondMenuClose} component="a" href={item.link}>
                <ListItemIcon>
                  {/* Add icons if needed */}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </MenuItem>
            ))}
            </Menu>
            <Button style={{backgroundColor:"lightblue"}}>
            <Link to="/login" className="get-started-btn scrollto" style={{marginRight:"20px",textDecoration:"none",color:"black"}}>Login</Link>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
