import React, { useState, useEffect } from 'react';
import DrawerHeader from '../../layouts/dashboard/SideBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { CardMedia } from '@mui/material';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 700,
  height: 400,
  padding: theme.spacing(5),
  ...theme.typography.body2,

}));

const Addfund = () => {
  const [userData, setUserData] = useState([]);
  const [bankPassbook, setBankPassbook] = useState(null);
  const [email, setEmail] = useState("");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [token, setToken] = useState("");

  const [fundData, setavailableAmount] = useState(null);

  useEffect(() => {
    // Get email from localStorage
    const storedtoken = localStorage.getItem('token');
    const storedEmail = localStorage.getItem("email");
    setEmail(storedEmail);
    //const cleanToken = storedtoken.replace('Bearer ', '');
    setToken(storedtoken);

  }, []);

  const fetchFundData = async () => {
    // Fetch data based on the email
    try {
      const response = await axios(`${backendUrl}/mobileApi/requestwithdrawal/${email}`, {
        headers: {
          Authorization: `${token}` // Include token in request headers
        },
      });

      //setfundData(response.data);
      let len = response.data.length;
      console.log(response.data);
      //console.log(response.data[len - 1].availabefund);
      if (len > 0) {
        setavailableAmount(response.data[len - 1].availabefund);
      }
      else {
        setavailableAmount(0);
      }

    } catch (error) {
      let err = error.message
      //console.log(err);
      if (error.response.status == !404)
        alert(err);
    }
  }

  const [lenuserdata, setLenUserData] = useState(0);

  useEffect(() => {
    // Fetch user profile data from backend
    async function fetchProfileData() {
      let token = localStorage.getItem('token');

      try {
        //const headers = { 'Authorization': token };
        const response = await axios(`${backendUrl}/mobileApi/bankDetails`, {
          headers: {
            Authorization: `${token}` // Include token in request headers
          },
        });

        if (!response) {
          throw new Error('Failed to fetch profile data');
        }

        const data = response.data;
        const len = data.result.BankDetails.length;
        setLenUserData(len);

        //if (data.length > 0)
        setUserData(data.result.BankDetails[len - 1]);
        //console.log(data.result.BankDetails[len-1].documents.QRImage);

        const url = `${backendUrl}/images/`;
        setBankPassbook(url + `${data.result.BankDetails[len - 1].documents.QRImage}`);

        //console.log(url + `${data.result.BankDetails[1].documents.QRImage}`);
      } catch (error) {
        let err = error.message
        //console.log(err);
        alert(err);
      }
    }

    fetchProfileData();
    fetchFundData();
  }, []);


  //console.log(lenuserdata, 2);
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <DrawerHeader /> {/* Assuming this component renders your sidebar and header */}
        <Box sx={{ flexGrow: 1, p: 3, mt: '64px' }}>
          <Stack direction="row" spacing={2}>
            <DemoPaper >
              <Typography sx={{ padding: "3px", fontSize: "29px", fontWeight: "bolder" }}> TOTAL ADDED FUND</Typography>
              <hr />
              <Typography sx={{ padding: "3px", fontSize: "29px", fontWeight: "bolder", fontFamily: "cursive" }}>{fundData}</Typography>

            </DemoPaper>
            <DemoPaper >
              <Typography sx={{ padding: "2px", fontSize: "29px", fontWeight: "bolder" }}> ADD FUND ON ACCOUNT.</Typography>
              {
                lenuserdata > 0 ? (
                  <>
                    <Typography style={{ padding: "2px", fontSize: "25px", fontWeight: "bold", color: "blue" }}>ACCOUNT HOLDER NAME: {userData.accountHolderName}</Typography>
                    <Typography style={{ padding: "2px", fontSize: "25px", fontWeight: "bold", color: "blue" }}>ACCOUNT - {userData.accountNumber} </Typography>
                    <Typography style={{ padding: "2px", fontSize: "25px", fontWeight: "bold", color: "blue" }}> IFSC - {userData.ifscCode} </Typography>
                    <CardMedia
                      component="img"
                      sx={{ width: "170px", height: "170px", padding: "2px 2px", marginRight: "100px", marginBottom: "10px" }}
                      image={bankPassbook}
                      alt="album cover"
                    />
                  </>
                ) : null
              }
            </DemoPaper>
          </Stack>
        </Box>
      </Box>
    </>
  )
}

export default Addfund