import React,{useEffect,useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
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
import SideNav from '../../Components/SideNav/Desktop/SideNav';
import { styled } from '@mui/material/styles';
import { getStrategies } from '../../api/Strategy/strategy';
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

  const [strategiesList, setStrategiesList] = React.useState([]);
  const [selectedStrategiesList, setSelectedStrategiesList] = React.useState([]);

  useEffect(() => {
   
    const getData = async () => {
      const response = await getStrategies();
      if(response.status===200){
        setStrategiesList(response.data)
      }else{
        console.log(response)
      }
      return response;
    }

    getData()
    

    }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // code to submit form
    // setOpen(false);
    }


    const addStrategy = (index) => {
      setSelectedStrategiesList([...selectedStrategiesList, strategiesList[index]])
      const newStrategiesList = [...strategiesList]
      newStrategiesList.splice(index, 1)
      console.log(newStrategiesList)
      setStrategiesList(newStrategiesList)
      
    }

    const removeStrategy = (index) => {
      setStrategiesList([...strategiesList, selectedStrategiesList[index]])
      const newSelectedStrategiesList = [...selectedStrategiesList]
      newSelectedStrategiesList.splice(index, 1)
      setSelectedStrategiesList(newSelectedStrategiesList)
      
    }
  const renderForm = ()=> (
    <div className="form">
      <form onSubmit={handleSubmit}>
      {/* {renderErrorMessage("email")} */}
        <div className="input-container">
          {/* <label>email </label> */}
          <input  type="text" placeholder="Name" name="name" required />
        
        </div>
        <div className="input-container">
          {/* <label>email </label> */}
          <textarea name='portfolio_description' className='description-area'  type="text" placeholder="Description...." required />
        
        </div>
        <h3>Choose Strategies</h3>
        <div className='choose-strategies-section'>
          <div className='available-strategies-section'>
            {strategiesList.length ?strategiesList.map((strategy,index)=>(
              <div key={strategy.strategy_id} className='strategy-item'>
                <div className='strategy-item-name'>{strategy.strategy_name}</div>
                <div onClick={()=>addStrategy(index)} className='add-strategy-button'>+ ADD</div>
                </div>
            )):null}
          </div>
          <div className='chosen-strategies-section'>
          { selectedStrategiesList.length? selectedStrategiesList.map((strategy,index)=>(
              <div key={strategy.strategy_id} className='strategy-item'>
                <div className='strategy-item-name'>{strategy.strategy_name}</div>
                <div  onClick={()=>removeStrategy(index)} className='add-strategy-button'> <DeleteOutlineOutlinedIcon/></div>
                </div>
            )):null}
          </div>
        </div>
        
        <div className="button-container">
         
          <Button fullWidth type="submit" style={{"text-transform": "none"}} variant="contained">{loading?<CircularProgress
            size={25}
            sx={{
              color: 'white',
            }}
          />:'Create'}</Button>
         
        </div>
      </form>
      <div style={{textAlign:'center', margin:'10px 0'}} >
    
      </div>
    </div>
  );
    
  return (
    <Box  sx={{ display: 'flex' }}>
      <SideNav/>
    <div className="portfolio-page-container">
        
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
              <TableCell align="center">
              <EditOutlinedIcon/>
                  <DeleteOutlineOutlinedIcon/>
              </TableCell>
              
            </TableRow>
         
        </TableBody>
      </Table>
    </TableContainer> 
    </div>

    </div>
    </Box>
  )
}

