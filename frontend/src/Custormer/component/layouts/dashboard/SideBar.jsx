import React, { useContext, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Tooltip, Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsInputCompositeIcon from '@mui/icons-material/SettingsInputComposite';
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AssessmentIcon from '@mui/icons-material/Assessment';
import KeyIcon from '@mui/icons-material/Key';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { AuthContext } from '../../../../contextApi/AuthContext';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Holdingdata = [
   
    { icon: <LegendToggleIcon />, label: 'EQUITY', link: 'holdingequity' },
    { icon: <LegendToggleIcon />, label: 'F&O', link: 'holdingfando' },
    { icon: <LegendToggleIcon />, label: 'COMMODITY', link: 'holdingcommodity' }
];

const Positiondata = [
    { icon: <TrendingUpIcon />, label: 'EQUITY', link: 'positionequity' },
    { icon: <TrendingUpIcon />, label: 'F&O', link: 'positionfando' },
    { icon: <TrendingUpIcon />, label: 'COMMODITY', link: 'positioncommodity' }
];

const drawerWidth = 240;

// Function to generate holding links based on user's role
const generateHoldingLinks = (role) => {
    if (role === 'admin') {
        return [
           
            { icon: <LegendToggleIcon />, label: 'EQUITY', link: 'adholdingequity' },
            { icon: <LegendToggleIcon />, label: 'F&O', link: 'adholdingfando' },
            { icon: <LegendToggleIcon />, label: 'COMMODITY', link: 'adholdingcommodity' }
        ];
    } else {
        return Holdingdata;
    }
};

// Function to generate position links based on user's role
const generatePositionLinks = (role) => {
    if (role === 'admin') {
        return [
            { icon: <TrendingUpIcon />, label: 'EQUITY', link: 'adpositionequity' },
            { icon: <TrendingUpIcon />, label: 'F&O', link: 'adpositionfando' },
            { icon: <TrendingUpIcon />, label: 'COMMODITY', link: 'adpositioncommodity' }
        ];
    } else {
        return Positiondata;
    }
};




const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function SideBar() {
    const { dpPhoto } = useContext(AuthContext);

    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openarrow, setOpenarrow] = useState(true);

    const [role, setRole] = useState(localStorage.getItem('role'));

    const holdingLinks = generateHoldingLinks(role);
    const positionLinks = generatePositionLinks(role);

    const handleArrowClick = () => {
        setOpenarrow(!openarrow);
    };

    const [openpositionarrow, setOpenpositionarrow] = useState(true);

    const handlePositionArrowClick = () => {
        setOpenpositionarrow(!openpositionarrow);
    };


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        const role = localStorage.getItem("role");
        if (role === "admin") {
            navigate("/ad_login");
        }

    }

    const handleAddFund = () => {
        const role = localStorage.getItem("role");
        if (role === "admin") {
            navigate("/adaddfund");
        }

    }

    const handleAddDeposit = () => {
        const role = localStorage.getItem("role");
        if (role === "admin") {
            navigate("/addeposit");
        }

    }

    const handleProfile = () => {
        const role = localStorage.getItem("role");
        if (role === "admin") {
            navigate("/adprofile");
        }

    }

    const handleChangePassword = () => {
        const role = localStorage.getItem("role");
        if (role === "admin") {
            navigate("/ad_changepassword");
        }
    }

    return (
        <Box sx={{ display: 'flex' }} >
            <CssBaseline />

            <AppBar position="fixed" sx={{ backgroundColor: '#081C34' }} open={open}>

                <Toolbar>

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography >
                        BALAJI SECURITIES
                    </Typography>
                    
                    <Tooltip title="Notifications">
                        <IconButton
                            size="large"
                            color="inherit"
                            sx={{ ml: 'auto' }}
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                            <i class="bi bi-bell-fill" sx={{ color: 'black' }}></i>
                        </IconButton>
                    </Tooltip>

                    {localStorage.getItem('loggedin') && localStorage.getItem('role') === "admin" ? (
                        <Tooltip title="View Your Details">
                            <Avatar
                                sx={{
                                    bgcolor: 'grey',
                                    cursor: 'pointer',
                                    height: 40,
                                    width: 40,
                                    ml: 2
                                }}
                                onClick={() => handleProfile()}
                            >
                                <img height="50px" width="70px" src={dpPhoto} alt="profile img" />
                            </Avatar>
                        </Tooltip>
                    ) : (
                        <Link to="/profile" style={{textDecoration: "none",color:"black" }}>
                            <Tooltip title="View Your Details">
                                <Avatar
                                    sx={{
                                        bgcolor: 'grey',
                                        cursor: 'pointer',
                                        height: 40,
                                        width: 40,
                                        ml: 2
                                    }}
                                >
                                    <img height="50px" width="70px" src={dpPhoto} alt="profile img" />
                                </Avatar>
                            </Tooltip>
                        </Link>
                    )}





                    {localStorage.getItem('loggedin') && localStorage.getItem('role') === "admin" ? (
                        <Tooltip title="Logout">
                            <IconButton
                                sx={{
                                    bgcolor: 'grey',
                                    cursor: 'pointer',
                                    height: 40,
                                    width: 40,
                                    ml: 2
                                }}
                                onClick={() => {
                                    window.localStorage.removeItem("loggedin")
                                    handleLogout()
                                }}
                            //onClick={() => handleLogout()}
                            >
                                <LogoutIcon sx={{ color: "white" }} />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Logout">
                            <Link to="/login" style={{textDecoration: "none",color:"black" }}>
                                <IconButton
                                    size="large"
                                    sx={{ ml: 'auto', marginRight: "0" }}
                                    onClick={() => {
                                        window.localStorage.removeItem("loggedin")
                                        //handleLogout()
                                    }}
                                >
                                    <LogoutIcon sx={{ color: "white" }} />
                                </IconButton>
                            </Link>
                        </Tooltip>
                    )}
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open} >
                <DrawerHeader style={{background:"#081C34"}}>
                    <IconButton onClick={handleDrawerClose} style={{background:"white"}}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />


                <List >

                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                            onClick={() => {
                                const role = localStorage.getItem('role');
                                const destination = role === 'admin' ? '/adminhome' : '/dashboardhome';
                                navigate(destination);
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="DASHBOARD" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ display: 'block' }}>
                        {localStorage.getItem('loggedin') && localStorage.getItem('role') === "admin" ? (
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                onClick={() => {
                                    navigate('/adprofile');
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="PROFILE" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        ) : (
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                onClick={() => {
                                    navigate('/profile');
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="PROFILE" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>

                        )}

                    </ListItem>


                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            alignItems="flex-start"
                            onClick={handlePositionArrowClick}
                            sx={{
                                px: 2.0,
                                pt: 2.5,
                                pb: open ? 0 : 2.5,
                                '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 1 } },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <SettingsInputCompositeIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="POSITION"
                                sx={{ opacity: open ? 1 : 0 }}
                                //secondary="Equity, F and O, Commodity"
                                secondaryTypographyProps={{
                                    noWrap: true,
                                    fontSize: 12,
                                    lineHeight: '16px',
                                    color: openpositionarrow ? 'black' : 'red',
                                }}
                            />
                            <KeyboardArrowDown
                                sx={{
                                    mr: -1,
                                    opacity: open ? 1 : 0, // Always show arrow icon
                                    transform: openpositionarrow ? 'rotate(-180deg)' : 'rotate(0)',
                                    transition: '0.2s',
                                }}
                            />
                        </ListItemButton>
                        {openpositionarrow &&
                            positionLinks.map((item) => (
                                <ListItemButton
                                    key={item.label}
                                    sx={{ py: 0, minHeight: 32, color: 'inherit', opacity: "1" }}
                                    onClick={() => {
                                        navigate(`/${item.link}`);
                                    }}
                                >
                                    <ListItemIcon sx={{ color: 'inherit', opacity: 0.6 }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.label}
                                        primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                                    />
                                </ListItemButton>
                            ))
                        }
                    </ListItem>



                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            alignItems="flex-start"
                            onClick={handleArrowClick}
                            sx={{
                                px: 2.0,
                                pt: 2.5,
                                pb: open ? 0 : 2.5,
                                '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 1 } },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <DataThresholdingIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="HOLDING"
                                sx={{ opacity: open ? 1 : 0 }}
                                //secondary="Equity, F and O, Commodity"
                                /*secondaryTypographyProps={{
                                    noWrap: true,
                                    fontSize: 12,
                                    lineHeight: '16px',
                                    color: openarrow ? 'black' : 'red',
                                }}*/
                            />
                            <KeyboardArrowDown
                                sx={{
                                    mr: -1,
                                    opacity: open ? 1 : 0, // Always show arrow icon
                                    transform: openarrow ? 'rotate(-180deg)' : 'rotate(0)',
                                    transition: '0.2s',
                                }}
                            />
                        </ListItemButton>
                        {openarrow &&
                            holdingLinks.map((item) => (
                                <ListItemButton
                                    key={item.label}
                                    sx={{ py: 0, minHeight: 32, color: 'inherit', opacity: "1" }}
                                    onClick={() => {
                                        navigate(`/${item.link}`);
                                    }}
                                >
                                    <ListItemIcon sx={{ color: 'inherit', opacity: 0.6 }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.label}
                                        primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                                    />
                                </ListItemButton>
                            ))
                        }
                    </ListItem>


                    <ListItem disablePadding sx={{ display: 'block' }}>
                    {localStorage.getItem('loggedin') && localStorage.getItem('role') === "admin" ? (

                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                            onClick={() => {
                                handleAddDeposit()
                                
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <AutoGraphIcon />
                            </ListItemIcon>
                            <ListItemText primary="DEPOSIT" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    ):(
                        <Link to="/deposit" style={{textDecoration: "none",color:"black" }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <AutoGraphIcon />
                            </ListItemIcon>
                            <ListItemText primary="DEPOSIT" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                        </Link>
                    )}
                    </ListItem>

                    <ListItem disablePadding sx={{ display: 'block' }}>
                        {localStorage.getItem('loggedin') && localStorage.getItem('role') === "admin" ? (

                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                onClick={() => {
                                    handleAddFund()
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}>
                                    <AddCircleOutlineIcon />
                                </ListItemIcon>
                                <ListItemText primary="ADD FUND" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        ) : (
                            <Link to="/addfund" style={{textDecoration: "none",color:"black" }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}

                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}>
                                        <AddCircleOutlineIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="ADD FUND" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </Link>
                        )}
                    </ListItem>
                    {localStorage.getItem('loggedin') && localStorage.getItem("role") === "user" ? (
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                            onClick={() => {
                                navigate('/tradeReport');
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}>
                                <AssessmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="TRADE REPORT" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem> ) : (null)}
                </List>

                <Divider />
                <List>
                {localStorage.getItem('loggedin') && localStorage.getItem("role") === "user" ? (
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                            onClick={() => {
                                navigate('/withdrawRequest');
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <AccountBalanceWalletIcon />
                            </ListItemIcon>
                            <ListItemText primary="WITHDRAWAL REQUEST" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>) : (null)}

                    <ListItem disablePadding sx={{ display: 'block' }}>

                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}

                        >
                            {localStorage.getItem('loggedin') && localStorage.getItem("role") === "admin" ? (
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                    onClick={handleChangePassword}
                                >
                                    <KeyIcon />
                                </ListItemIcon>
                            ) : (
                                <Link to="/changePassword" style={{textDecoration: "none",color:"black" }}>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <KeyIcon />
                                    </ListItemIcon>
                                </Link>
                            )}

                            <ListItemText primary="CHANGE PASSWORD" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>

                </List>
            </Drawer>


        </Box>
    );
}