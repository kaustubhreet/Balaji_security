import React,{useEffect,useState} from 'react';
import DrawerHeader from '../../layouts/dashboard/SideBar'; 
import Box from '@mui/material/Box';
import { Table, TableBody, TextField, TablePagination, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import axios from "axios";


const headCells=[
  {
    id: '_id',
    numeric: false,
    disablePadding: false,
    label: 'DEPOSITEID',
  },
  {
    id: 'amount',
    numeric: true,
    disablePadding: true,
    label: 'AMOUNT',
  },
  {
    id: 'processedBy',
    numeric: false,
    disablePadding: false,
    label: 'PROCESSED BY',
  },
  {
    id: 'transactionId',
    numeric: false,
    disablePadding: false,
    label: 'TRANSACTIONID',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'DATE TIME',
  },
  
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'STATUS',
  }
  
];

const Deposit = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [email, setEmail] = useState("");
  const [mergedData, setMergedData] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem("email");
    setEmail(storedEmail);
  }, []);

  

  useEffect(() => {
    if (email) {
      // Fetch data based on the email
      axios.get(`${backendUrl}/positionHoldingApi/deposite/${email}`).then((response) => {
        setMergedData(response.data.result.deposite);
        //console.log(response.data.result.deposite);

      }).catch((error) => {
        let err=error.message
        //console.log(err);
        alert(err);
      });
    }
  }, [email]);

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



  return (
    <Box sx={{ display: 'flex' }}>
    <DrawerHeader /> {/* Assuming this component renders your sidebar and header */}
    <Box sx={{ flexGrow: 1, p: 3, mt: '64px' }}>
    <h1 style={{padding:"20px",alignContent:"center"}}>DEPOSIT</h1>
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

export default Deposit