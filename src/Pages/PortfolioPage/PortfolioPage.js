import React,{useEffect,useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,  { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import "./portfolioPage.css"


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    // border: '2px solid #000',
    // boxShadow: 24,
    p: 4,
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#EAEAEA',
      color: '#343434',
      fontWeight: 'bolder',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      color:'#343434',
      fontWeight: 'bold',
    },
  }));

export default function StrategyPage() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading,setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // code to submit form
    // setOpen(false);
    }

  const renderForm = ()=> (
    <div className="form">
      <form onSubmit={handleSubmit}>
      {/* {renderErrorMessage("email")} */}
        <div className="input-container">
          {/* <label>email </label> */}
          <input  type="text" placeholder="Name" name="name" required />
        
        </div>
        
        <div className="button-container">
         
          <Button fullWidth type="submit" style={{"text-transform": "none"}} variant="contained">{loading?<CircularProgress
            size={25}
            sx={{
              color: 'white',
            }}
          />:'Login'}</Button>
         
        </div>
      </form>
      <div style={{textAlign:'center', margin:'10px 0'}} >
    
      </div>
    </div>
  );
    
  return (
    <div className="container">
        
        <div className='page-header'>Portfolios</div>
        <div className='create-button-container'>
<Button 
onClick={handleOpen}
variant="contained" color="primary" className="strategy-button">

   <AddIcon/> Create
</Button>
<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        {renderForm()}
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
        </div>
        <div className='strategy-table-header'>
            My Portfolios
            </div >
            <div className='strategy-table'>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
           
            
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Running Paper</StyledTableCell>
            <StyledTableCell align="center">Running Live</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow
              key={1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">
               Lorem
              </TableCell>
              <TableCell align="center">Ipsum</TableCell>
              <TableCell align="center">Lorem</TableCell>
              <TableCell align="center">Ipsum</TableCell>
              
            </TableRow>
         
        </TableBody>
      </Table>
    </TableContainer> 
    </div>

    </div>
  )
}
