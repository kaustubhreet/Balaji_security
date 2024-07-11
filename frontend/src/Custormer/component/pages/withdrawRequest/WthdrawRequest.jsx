import React, { useState, useEffect } from 'react';
import DrawerHeader from '../../layouts/dashboard/SideBar';
import Box from '@mui/material/Box';
import {
  Table, TableBody, TextField, InputAdornment,
  SwipeableDrawer, TableCell, TableContainer, TableHead, TableRow, Paper, Button
} from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import axios from "axios";

// /http://localhost:5000/mobileApi/requestwithdrawal/radhe12345@gmail.com, /:email/editrequestwithdrawal/:id, /:email/deleterequestwithdrawal/:id,/:email/withdrawals-for get request

const WthdrawRequest = () => {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const [email, setEmail] = useState("");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [token, setToken] = useState("");
  const [availabeAmount, setavailabeAmount] = useState(null);

  useEffect(() => {
    // Get email from localStorage
    const storedtoken = localStorage.getItem('token');
    const storedEmail = localStorage.getItem("email");
    setEmail(storedEmail);
    //const cleanToken = storedtoken.replace('Bearer ', '');
    setToken(storedtoken);

  }, []);

  useEffect(() => {
    if (email) {
      fetchProfileData();
    }
  }, [email]);

  const fetchProfileData = async () => {
    // Fetch data based on the email
    try {
      const response = await axios(`${backendUrl}/mobileApi/requestwithdrawal/${email}`, {
        headers: {
          Authorization: `${token}` // Include token in request headers
        },
      });
      console.log(response.data);
      if(response.data.status===200){
      setData(response.data);
      let len = response.data.length;
      //console.log(response.data);
     // console.log(response.data[len - 1].availabefund);
      setavailabeAmount(response.data[len - 1].availabefund);
      }
    } catch (error) {
      let err=error.message
            //console.log(err);
            alert(err);
    }
  }

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortBy) {
      if (sortBy === 'requestamount') {
        return sortOrder === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
      } else {
        return sortOrder === 'asc' ? a[sortBy].localeCompare(b[sortBy]) : b[sortBy].localeCompare(a[sortBy]);
      }
    }
    return 0;
  });
console.log(availabeAmount);

  const handleAddRequest = async (requestAmount) => {
    if(reqamount>availabeAmount){
      alert("Available amount is low!");
    }
    try {
      const response = await axios.post(`${backendUrl}/mobileApi/requestwithdrawal/${email}`, {
        requestamount: requestAmount, // Assuming this is the field name for the request amount in your backend
        email: email,
        availabefund: availabeAmount
      }, {
        headers: {
          Authorization: token
        }
      });
      console.log(response.data.length);
      loadData();

      alert(response.data.message);
      toggleDrawer(); // Close the drawer after submitting
    } catch (error) {
      let err=error.message
      //console.log(err);
      alert(err);
    }
  };


  const handleDelete = async (id) => {
    try {
      // Send delete request to the backend using axios
      const res = await axios.delete(`${backendUrl}/mobileApi/deleterequestwithdrawal/${email}/${id}`, {
        headers: {
          Authorization: token
        }
      });
     // console.log(res);
      alert(res.data.message);
      loadData();
      // Update state to reflect the deletion
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      let err=error.message
            //console.log(err);
            alert(err);
    }
  };
  const [chid, setchid] = useState(null);
  const [reqamount, setReqamount] = useState(null);


  const handleEditRequestAmount = (id, newValue) => {

    //console.log(newValue, id);
    setchid(id);
    setReqamount(newValue);
    // Find the index of the row with the given id
    const dataIndex = data.findIndex(row => row._id === id);

    if (dataIndex !== -1) {
      // Clone the data array
      const newData = [...data];
      // Update the requestamount field of the corresponding row
      newData[dataIndex].requestamount = newValue;
      // Update the state with the new data
      setData(newData);
    }
  };
  const handleEdit = async (id) => {
    try {
      // Send delete request to the backend using axios
      // Make API call to edit request amount
      const response = await axios.put(
        `${backendUrl}/editrequestwithdrawal/${email}/${id}`,
        { requestamount: reqamount,
        email:email,
      availabefund:data.availabefund
     }, // Updated request amount
        {
          headers: {
            Authorization: token
          }
        }
      );

      // If edit is successful, update the data state
      setData(prevData =>
        prevData.map(item =>
          item._id === id ? { ...item, requestamount:reqamount } : item
        )
      );
      alert(response.data.message);

    } catch (error) {
      let err=error.message
      //console.log(err);
      alert(err);
    }
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

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const filteredData = data.filter(row =>
    (row.requestamount && row.requestamount.toString().includes(searchTerm)) ||
    (row.status && row.status.toLowerCase().includes(searchTerm.toLowerCase()))
  );


  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <DrawerHeader />{/* Assuming this component renders your sidebar and header */}
      <Box sx={{ flexGrow: 1, p: 3, mt: '64px' }} >
        <h1 style={{ fontSize: "30px", paddingBlock: "20px", fontWeight: "bold" }}>WITHDRAWAL LIST</h1>
        <Box sx={{ display: 'flex', flexDirection: "end", justifyContent: 'space-between', alignItems: 'center' }}>
          <Button onClick={toggleDrawer} variant="contained" color="primary">SEND REQUEST</Button>
          <SwipeableDrawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            onOpen={() => setDrawerOpen(true)}
          >
            <div style={{ width: 250, marginTop: "100px" }}>
              <form onSubmit={(e) => {
                e.preventDefault();
                const requestAmount = e.target.elements.request_amount.value;
                handleAddRequest(requestAmount);
              }}>
                <div className="mb-3 p-3">
                  <label htmlFor="request_amount" className="form-label"
                    style={{ color: "black", fontSize: "20px", fontWeight: "bold", textAlign: "center" }}>Request Amount</label>
                  <input
                    type="number" // Assuming the request amount is a number
                    className="form-control"
                    id="request_amount"
                    name="request_amount"
                    placeholder="Enter Request Amount"
                  />
                </div>
                {/* Drawer content goes here */}
                <Button type="submit" variant="contained" style={{ fontSize: "18px", marginInline: "8px", fontWeight: "bold" }}>Submit</Button>
                <Button onClick={toggleDrawer} variant="contained" style={{ fontSize: "18px", fontWeight: "bold" }}>Cancel</Button>
              </form>
            </div>
          </SwipeableDrawer>

          <TextField
            label="Search"
            variant="outlined"
            style={{ marginLeft: 'auto' }}
            margin="normal"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">

                </InputAdornment>
              ),
            }}
          />
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell onClick={() => handleSort('availabefund')}>Availble Amount <SwapVertIcon /></TableCell>
                <TableCell onClick={() => handleSort('requestamount')}>Request Amount <SwapVertIcon /></TableCell>
                <TableCell onClick={() => handleSort('status')}>Status <SwapVertIcon /></TableCell>
                <TableCell >Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map(row => (
                <TableRow key={row._id}>
                  <TableCell>{row.availabefund}</TableCell>
                  <TableCell><input
                    type="text"
                    value={row.requestamount}
                    onChange={(e) => handleEditRequestAmount(row._id, e.target.value)}
                  /></TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="error" onClick={() => handleDelete(row._id)}>Delete</Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="error" onClick={() => handleEdit(row._id)}>Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box display="flex" justifyContent="center" mt={3}>
          <Button onClick={(e) => handleChangePage(e, page - 1)} disabled={page === 0}>Previous</Button>
          <Button onClick={(e) => handleChangePage(e, page + 1)} disabled={paginatedData.length < rowsPerPage}>Next</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default WthdrawRequest