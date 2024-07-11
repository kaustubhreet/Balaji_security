import React, { useState, useEffect } from 'react';
import DrawerHeader from '../../layouts/dashboard/SideBar';
import Box from '@mui/material/Box';
import { Table, TableBody, TextField, TablePagination, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { headCells } from '../common/data';
import axios from "axios";


const TradeReport = () => {

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem("email");
    setEmail(storedEmail);
  }, []);

  //call position and holding data and merge it into single object then pass it into it.
  const [hcommodity, setHcommodity] = useState([]);
  const [pcommodity, setPcommodity] = useState([]);
  const [hequity, setHequity] = useState([]);
  const [pequity, setPequity] = useState([]);
  const [hFandO, setHFandO] = useState([]);
  const [pFandO, setPFandO] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
  useEffect(() => {

    if (email) {
      // Fetch holding and position data
      //console.log(email,37);
      const fetchData = async () => {
        try {
           axios.get(`${backendUrl}/positionHoldingApi/positionEquity/${email}`).then((response1) => {
          setPequity(response1.data);
          //console.log(response1.data);
        });
          

          // Fetch data based on the email
           axios.get(`${backendUrl}/positionHoldingApi/holdingCommodity/${email}`).then((response2) => {
          setHcommodity(response2.data);
         // console.log(response.data);
        });

          axios.get(`${backendUrl}/positionHoldingApi/holdingEquity/${email}`).then((response3) => {
          setHequity(response3.data);
          //console.log(response.data);
        });

           axios.get(`${backendUrl}/positionHoldingApi/holdingFandO/${email}`).then((response4) => {
          setHFandO(response4.data);
          //console.log(response.data);
        });


        axios.get(`${backendUrl}/positionHoldingApi/positionFandO/${email}`).then((response5) => {
          setPFandO(response5.data);
          //console.log(response.data);
        });

           axios.get(`${backendUrl}/positionHoldingApi/positionCommodity/${email}`).then((response6) => {
          setPcommodity(response6.data);
          //console.log(response.data);
        });

        } catch (error) {
          let err=error.message
            //console.log(err);
            alert(err);
        }

      };
      fetchData();
    }

  }, [email]);

  useEffect(() => {
    // Merge holding and position data into a single array
    const mergedDataArray = [];
    if (Array.isArray(hcommodity)) {
        mergedDataArray.push(...hcommodity);
    }
    if (Array.isArray(pcommodity)) {
        mergedDataArray.push(...pcommodity);
    }
    if (Array.isArray(hequity)) {
        mergedDataArray.push(...hequity);
    }
    if (Array.isArray(pequity)) {
        mergedDataArray.push(...pequity);
    }
    if (Array.isArray(hFandO)) {
        mergedDataArray.push(...hFandO);
    }
    if (Array.isArray(pFandO)) {
        mergedDataArray.push(...pFandO);
    }
    setMergedData(mergedDataArray);
}, [hcommodity, pcommodity, hequity, pequity, hFandO, pFandO]);

  //console.log(mergedData);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setPage(0); // Reset page to 0 when search value changes
  };

  const filteredData = mergedData.filter(row =>
    Object.values(row).some(value =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //console.log(headCells);

  return (
    <Box sx={{ display: 'flex' }}>
      <DrawerHeader />{/* Assuming this component renders your sidebar and header */}
      <Box sx={{ flexGrow: 1, p: 3, mt: '64px' }}>
        <h1 style={{ fontSize: "30px", paddingBlock: "20px", fontWeight: "bold" }}>TRADE REPORT</h1>
        <TextField
          label="Search"
          variant="filled"
          value={searchValue}
          onChange={handleSearchChange}
          style={{ marginBottom: '20px', display: "inline-flex", marginInlineStart: "85%" }}
        />
        <div style={{ maxHeight: 'calc(100vh - 250px)', overflowY: 'auto' }}>
          <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 640 }}>
              <Table stickyHeader aria-label="sticky table" >
                <TableHead>
                  <TableRow>
                    {headCells.map((heading, index) => (
                      <TableCell key={index} onClick={() => handleSort(heading.key)}>
                        {heading.label}
                        <SwapVertIcon />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData && filteredData.length > 0 ? (
                    filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                      <TableRow key={row.id}>
                        {headCells.map((heading, index) => (
                          <TableCell key={index}>{row[heading.id]}</TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={headCells.length} align="center">
                        No matching data found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </Box>
    </Box>
  )
}

export default TradeReport