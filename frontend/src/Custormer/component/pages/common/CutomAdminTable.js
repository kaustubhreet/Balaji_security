import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Select, // Add Select import
  MenuItem // Add MenuItem import
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const CustomAdminTable = ({ headCells, rows, onDelete, onUpdate, onAdd, email, setRows }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newRowData, setNewRowData] = useState({});
  const [editableRowId, setEditableRowId] = useState(null);


  //console.log(rows);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddRow = () => {
    setOpenAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
    setNewRowData({});
  };

  const handleAddDialogSave = () => {
    const newRowWithNumbers = {
      ...newRowData,
      price1: Number(newRowData.price1),
      quantity: Number(newRowData.quantity),
      tradeValue: Number(newRowData.tradeValue),
      price2: Number(newRowData.price2),
      sellvalue: Number(newRowData.sellvalue),
      ltp: String(newRowData.ltp),
      plAmount: Number(newRowData.plAmount),
      email: email,
    };
    onAdd(newRowWithNumbers);
    setOpenAddDialog(false);
    setNewRowData({});
  };

  const handleEditClick = (rowId) => {
    setEditableRowId(rowId);
  };

  const handleEditSave = (rowId) => {
    setEditableRowId(null);
    onUpdate(rowId, rows.find(row => row._id === rowId));
  };

  const filteredRows = Array.isArray(rows) ? 
  rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) : [];

  return (
    <div>
      <div style={{ display: 'flex', marginBottom: 20 }}>
        <TextField
          variant="outlined"
          label="Search"
          onChange={handleSearch}
          style={{ marginRight: 10 }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddRow}
        >
          Add Row
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table aria-label="custom table">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell key={headCell.id}>{headCell.label}</TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row._id}>
                  {headCells.map((headCell) => (
                    <TableCell key={headCell.id}>
                      {editableRowId === row._id ? (
                        headCell.id === 'status' ? (
                          <Select
                            value={row[headCell.id]}
                            onChange={(e) => {
                              const updatedRows = [...rows];
                              const index = updatedRows.findIndex((r) => r._id === row._id);
                              updatedRows[index][headCell.id] = e.target.value;
                              setRows(updatedRows);
                            }}
                          >
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="approved">Approved</MenuItem>
                            <MenuItem value="rejected">Reject</MenuItem>
                          </Select>
                        ) : (
                          <TextField
                            value={row[headCell.id]}
                            onChange={(e) => {
                              const updatedRows = [...rows];
                              const index = updatedRows.findIndex((r) => r._id === row._id);
                              updatedRows[index][headCell.id] = e.target.value;
                              setRows(updatedRows);
                            }}
                          />
                        )
                      ) : (
                        row[headCell.id]
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    {editableRowId === row._id ? (
                      <IconButton
                        aria-label="save"
                        onClick={() => handleEditSave(row._id)}
                      >
                        <SaveIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEditClick(row._id)}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                    <IconButton
                      aria-label="delete"
                      onClick={() => onDelete(row._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length===0 ? 0 :filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Dialog open={openAddDialog} onClose={handleAddDialogClose}>
        <DialogTitle>Add New Row</DialogTitle>
        <DialogContent>
          {headCells.map((headCell) => (
            <TextField
              key={headCell.id}
              label={headCell.label}
              onChange={(e) =>
                setNewRowData((prevData) => ({
                  ...prevData,
                  [headCell.id]: e.target.value,
                }))
              }
              fullWidth
              margin="normal"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose}>Cancel</Button>
          <Button onClick={handleAddDialogSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomAdminTable;
