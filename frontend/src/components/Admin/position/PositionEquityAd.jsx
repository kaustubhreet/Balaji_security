import React, { useState, useEffect } from 'react';
import DrawerHeader from '../../../Custormer/component/layouts/dashboard/SideBar';
import CustomTable from '../../../Custormer/component/pages/common/CutomAdminTable';
import { headCells } from '../../../Custormer/component/pages/common/data';
import Box from '@mui/material/Box';
import axios from "axios";
import { useLocation } from 'react-router-dom';

const PositionEquityAd = () => {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const location = useLocation();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email); // Set admin email from props
    }
  }, [location.state]);

  //console.log(data);
  //console.log(email);

  useEffect(() => {
    if (email) {
      // Fetch data based on the email
      axios.get(`${backendUrl}/positionHoldingApi/positionEquity/${email}`).then((response) => {
        setData(response.data);
       console.log(response.data);

      }).catch((error) => {
        let err=error.message
            //console.log(err);
            alert(err);
      });
    }
  }, [email]);

  const handleDelete = (id) => {
    axios.delete(`${backendUrl}/positionHoldingApi/positionEquity/${id}`)
      .then(() => {
        // Reload data after deletion
        loadData();
      })
      .catch((error) => {
        let err=error.message
            //console.log(err);
            alert(err);
      });
  };

  const handleUpdate = (id, updatedRow) => {
    axios.put(`${backendUrl}/positionHoldingApi/positionEquity/${id}`, updatedRow).then(() => {
      // Reload data after update
      loadData();
    }).catch((error) => {
      let err=error.message
            //console.log(err);
            alert(err);
    });
  };

  const handleAdd = (newRow) => {
    axios.post(`${backendUrl}/positionHoldingApi/positionEquity/${email}`, newRow)
      .then(() => {
        // Reload data after addition
        loadData();
      })
      .catch((error) => {
        let err=error.message
            //console.log(err);
            alert(err);
      });
  };

  const loadData = () => {
    if (email) {
      // Fetch data based on the email
      axios.get(`${backendUrl}/positionHoldingApi/positionEquity/${email}`).then((response) => {
        setData(response.data);
        console.log(response.data);
      }).catch((error) => {
        let err=error.message
        //console.log(err);
        alert(err);
      });
    }
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <DrawerHeader /> {/* Assuming this component renders your sidebar and header */}
      <Box sx={{ flexGrow: 1, p: 3, mt: '64px' }}>
        <h1 style={{ marginBlock: "30px", alignItems: "center" }}>POSITION EQUITY </h1>

        <CustomTable headCells={headCells}
          rows={data}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onAdd={handleAdd}
          email={email}
          setRows={setData}
        />
      </Box>
    </Box>
  )
}

export default PositionEquityAd;