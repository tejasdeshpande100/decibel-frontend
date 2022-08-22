import React,{useEffect,useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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
import { createStrategy, getStrategies } from '../../api/Strategy/strategy';
import "./strategyPage.css"


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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

  const modes = {
    CREATE: 'CREATE',
    EDIT: 'EDIT',
  }

  const strategy_modes=[{value:'MANUAL',label:'Manual Trade'},{value:'API',label:'API Trade'},{value: 'PLATFORM CODED',label:'Platform coded'},{value:'PM RENTED',label:'PM Rented'},{value:'BACKTESTING PLATFORM BASED',label:'Backtesting Platform Based'}]

export default function StrategyPage() {
  const [open, setOpen] = React.useState(false);
  const [strategiesList, setStrategiesList] = React.useState([]);
  const [mode, setMode] = React.useState(modes.CREATE);
  const [strategyDetails, setStrategyDetails] = React.useState({
    strategy_name:'',
    strategy_description:'',
    strategy_id:'',
    strategy_mode:strategy_modes[0].value,
    user_id:localStorage.getItem('user_id')
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading,setLoading] = useState(false)


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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(strategyDetails)
    let response=''
    if (mode === modes.CREATE){
      response = await createStrategy(strategyDetails)
    }
    
    console.log(response)

    if(response.status === 200){
      setStrategiesList([...strategiesList,response.data])
      handleClose()
    }else{

    }
    setLoading(false)
    // code to submit form
    // setOpen(false);
    }

    const handleChangeInput = (e) => {
     
      setStrategyDetails({...strategyDetails,[e.target.name]:e.target.value})
    }

  const renderForm = ()=> (
    <div className="form">
      <form onSubmit={handleSubmit}>
      {/* {renderErrorMessage("email")} */}
        <div className="input-container">
          {/* <label>email </label> */}
          <input onChange={handleChangeInput} name='strategy_name'  type="text" placeholder="Name" required />
        
        </div>
        <div className="input-container">
          {/* <label>email </label> */}
          <textarea onChange={handleChangeInput} name='strategy_description' className='description-area'  type="text" placeholder="Description...." required />
        
        </div>
      
        <Select
        style={{width:'100%',marginBottom:'1em'}}
          labelId="simple-select-label"
          id="simple-select"
          size='small'
          fuullWidth
          value={strategyDetails.strategy_mode}
          label="mode"
          onChange={(event)=>setStrategyDetails({...strategyDetails,strategy_mode:event.target.value})}
        >
            {strategy_modes.map((strategy_modes)=>{
                return (
                    <MenuItem value={strategy_modes.value}>{strategy_modes.label}</MenuItem>
                )
            })}
         
        </Select>


        
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
    <div className="container">
        
        <div className='page-header'>Strategies</div>
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
            My Strategies
            </div >
            <div className='strategy-table'>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          
          <TableRow>
           
            
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Mode</StyledTableCell>
            <StyledTableCell align="center">Running Live</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
        {strategiesList.map((strategy,index)=>{ 
            return (
              <TableRow
              key={strategy.strategy_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <StyledTableCell align="center">{strategy.strategy_name}</StyledTableCell>
                <StyledTableCell align="center">{strategy.description}</StyledTableCell>
                <StyledTableCell align="center">{strategy.strategy_mode}</StyledTableCell>
                <StyledTableCell align="center">False</StyledTableCell>
                <StyledTableCell align="center">
                  <EditOutlinedIcon/>
                  <DeleteOutlineOutlinedIcon/>
                </StyledTableCell>
              </TableRow>
            )

          })}
            {/* <TableRow
              key={1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">
               Lorem
              </TableCell>
              <TableCell align="center">Ipsum</TableCell>
              <TableCell align="center">Lorem</TableCell>
              <TableCell align="center">Ipsum</TableCell>
              
            </TableRow> */}
         
        </TableBody>
      </Table>
    </TableContainer> 
    </div>

    </div>
  )
}
