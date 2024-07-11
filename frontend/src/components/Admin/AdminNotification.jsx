//url-/updateWithdrawalRequestFromAdmin/:email/:id

//http://localhost:5000/admin/auth/addBankDetails;

import React, { useState, useEffect } from 'react';
import DrawerHeader from '../../Custormer/component/layouts/dashboard/SideBar'; 
import Box from '@mui/material/Box';
import CustomTable from '../../Custormer/component/pages/common/CutomAdminTable';

import axios from "axios";
import { useLocation } from 'react-router-dom';

const headCells=[
    {
      id: 'availabefund',
      numeric: true,
      disablePadding: false,
      label: 'Available Fund',
    },
    {
      id: 'requestamount',
      numeric: true,
      disablePadding: false,
      label: 'Request Amount',
    },
    {
      id: 'status',
      numeric: false,
      disablePadding: false,
      label: 'Status',
      dropdownOptions: ["pending", "approved","rejected"] 
    },
];

const AdminNotification = () => {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const location = useLocation(); 
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email); // Set admin email from props
    }
  }, [location.state]);

  useEffect(() => {
    if (email) {
      // Fetch data based on the email
      axios.get(`${backendUrl}/mobileApi/requestwithdrawal/${email}`).then((response) => {
        setData(response.data);
        
      }).catch((error) => {
        let err=error.message
            //console.log(err);
            alert(err);
      });
    }
  }, [email]);

  const handleDelete = (id) => {
    alert("not Allowed from admin side!")
    /*axios.delete(`${backendUrl}/mobileApi/holdingCommodity/${id}`)
      .then(() => {
        // Reload data after deletion
        loadData();

      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });*/
  };

  const handleUpdate = (id, updatedRow) => {
    console.log(updatedRow);
    axios.put(`${backendUrl}/mobileApi/editrequestwithdrawal/${email}/${id}`, updatedRow).then(() => {
      // Reload data after update
      loadData();
    }).catch((error) => {
      let err=error.message
      //console.log(err);
      alert(err);
    });
  };

 

  const loadData = () => {
    if (email) {
      // Fetch data based on the email
      axios.get(`${backendUrl}/mobileApi/requestwithdrawal/${email}`).then((response) => {
        setData(response.data);
      }).catch((error) => {
        let err=error.message
        //console.log(err);
        alert(err);
      });
    }
  };


  return (
    <>
    <Box sx={{ display: 'flex'}}>  
    <DrawerHeader/> {/* Assuming this component renders your sidebar and header */}
    <Box sx={{ flexGrow: 1, p: 3, mt: '64px' }} style={{overflowX:"visible"}}>
      <h1 style={{marginBlock:"30px",alignItems:"center"}}>WITHDRAWAL REQUEST </h1>
    
      <CustomTable 
      headCells={headCells}
      rows={data}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
      
      email={email}
      setRows={setData}
      />
      </Box>
    </Box>
    </>
  )
}

export default AdminNotification;