import React,{useEffect,useState} from 'react'
import {useLocation} from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Radio from '@mui/material/Radio';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,  { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { createOrUpdateStrategy, getStrategies, deleteStrategy } from '../../api/Strategy/strategy';
import SideNav from '../../Components/SideNav/Desktop/SideNav';
import "./strategyPage.css"



  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#EAEAEA',
      color: '#343434',
      fontWeight: 'bolder',
      padding: '10px'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      color:'#343434',
      padding: '10px'
    },
  }));

  const modes = {
    CREATE: 'CREATE',
    EDIT: 'EDIT',
    VIEW: 'VIEW',
  }

  const strategy_modes=[{value:'MANUAL',label:'Manual Trading'},{value:'API',label:'External API Trading'},{value: 'PLATFORM CODED',label:'D.I.C.E. Hosted'},{value:'AMIBROKER',label:'Amibroker Bridge'},{value:'TRADINGVIEW',label:'Tradingview Bridge'},{value:'STOCKMOCK',label:'StockMock'},{value:'ALGOTEST',label:'Algotest'}]

export default function StrategyPage() {
 
  const location = useLocation();
  console.log(location)
  const [strategiesList, setStrategiesList] = React.useState([]);
  const [mode, setMode] = React.useState(location.state?.mode || modes.VIEW);
  const [strategyDetails, setStrategyDetails] = React.useState({
   strategy_id:'',
   strategy_name: '',
   strategy_min_capital: '',
   strategy_return: '',
   strategy_drawdown: '',
   strategy_source: strategy_modes[0].value,
   strategy_created_on: '',
    user_id:localStorage.getItem('user_id')
  });


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

    const handleEdit = (strategy) => {
      // setStrategyDetails(strategy)
      // setMode(modes.EDIT)
    }

    const handleDelete = async (strategy) => {
      setLoading(true)
      const response = await deleteStrategy(strategy)
      if(response.status===200){
        const newStrategiesList = strategiesList.filter((item)=>item.strategy_id!==strategy.strategy_id)
        // setStrategiesList(newStrategiesList)
      }else{
        console.log(response)
      }
      setLoading(false)
    }

  const handleSubmit = async (e) => {
    // e.preventDefault()
    // setLoading(true)
    // console.log(strategyDetails)
    // let response=''
    // if (mode === modes.CREATE || mode === modes.EDIT) {
    //   response = await createOrUpdateStrategy(strategyDetails)
    // }
    
    // console.log(response)

    // if(response.status === 200){
    //   if(mode === modes.CREATE){
    //     setStrategiesList([response.data,...strategiesList])
    //   }else{
    //     setStrategiesList(strategiesList.map((strategy)=> strategy.strategy_id === response.data.strategy_id ? response.data : strategy))
    //   }
      
     
    //   setMode(modes.VIEW)
    // }else{

    // }
    // setLoading(false)
   
    }

    const handleChangeInput = (e) => {
     
      setStrategyDetails({...strategyDetails,[e.target.name]:e.target.value})
    }

  const renderForm = ()=> (
    <div className='strategy-page-container'>
      <div style={{color:'grey'}}className='strategy-page-header'>Strategy Management</div>
      <div className="strategy-form-header">Create New Strategy</div>
    <div className="create-strategy-form">
      
      <form onSubmit={handleSubmit}>
      {/* {renderErrorMessage("email")} */}
        <div className="create-strategy-input-container">
          <div style={{width:'45%'}} >
          <div style={{fontWeight:'bold',marginBottom:'10px'}}>Strategy Name <span style={{color:'#FE0707'}}>*</span></div>
          <input style={{width:'100%'}}  onChange={handleChangeInput} value={strategyDetails.strategy_name} name='strategy_name'  type="text" placeholder="Name" required />
          </div>
          <div style={{width:'45%'}} >
          <div style={{fontWeight:'bold',marginBottom:'10px'}}>Min. Capital <span style={{color:'#FE0707'}}>*</span></div>
          <input  style={{width:'100%'}} onChange={handleChangeInput} value={strategyDetails.strategy_min_capital} name='strategy_min_capital'  type="text" placeholder="Rs.100000" required />
          </div>
        </div>
        <div>
        <div style={{fontWeight:'bold',marginBottom:'10px'}}>About Strategy <span style={{color:'#FE0707'}}>*</span></div>
        <div>
          <textarea style={{width:'100%', height:'170px'}} onChange={handleChangeInput} value={strategyDetails.description} name='description'   type="text" placeholder="Description...." required />
          </div>
        </div>
        <div style={{fontWeight:'bold',marginBottom:'10px'}}>Strategy Source <span style={{color:'#FE0707'}}>*</span></div>
        <div className='strategy-source-radio-container'>
          {strategy_modes.map((mode,index)=>(
            <div style={{width:'33%'}}>
            <Radio
            size='small'
              checked={strategyDetails.strategy_mode === mode.value}
              onChange={(event)=>setStrategyDetails({...strategyDetails,strategy_mode:mode.value})}
              value={strategyDetails.strategy_mode}
              style={{color:'#2CAE76'}}
              name="radio-buttons"
              inputProps={{ 'aria-label': mode.label }}
            />
            {mode.label}
            </div>

            ))}
       
        </div>
        {/* <Select
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
         
        </Select> */}


        
        <div className="button-container">
        <div className='strategy-button-wrapper'>
          <Button  type="submit"
          style={{"text-transform": "none",backgroundColor:'#2CAE76', fontWeight:'bold',width:'200px'}} 
          variant="contained" color="primary" className="strategy-button"
          >{loading?<CircularProgress
            size={25}
            sx={{
              color: 'white',
            }}
          />:modes.CREATE === mode?'Create Strategy':'Save Strategy'}</Button>   
             </div>
             <div className='strategy-button-wrapper'>
        <Button onClick={()=>setMode(modes.VIEW)}  type="submit" 
         style={{"text-transform": "none",backgroundColor:'black', fontWeight:'bold',width:'200px'}} 
         variant="contained" color="primary" 
        >Cancel</Button>
        </div>
        </div>
        
      </form>
      <div style={{textAlign:'center', margin:'10px 0'}} >
    
      </div>
    </div>
    </div>
  );

  const displayStrategies = () => (
    <div className='strategy-page-container'>
        <div style={{color:'grey'}}className='strategy-page-header'>Strategy Management</div>
        <div className='create-button-container'>
<Button 
// onClick={handleOpen}
onClick={()=>{
  setMode(modes.CREATE)
  setStrategyDetails({...strategyDetails,
    strategy_name:'',
    description:'',
    strategy_id:'',
    strategy_mode:strategy_modes[0].value
  })
}}
style={{"text-transform": "none",backgroundColor:'#2CAE76', fontWeight:'bold'}} 
variant="contained" color="primary" className="strategy-button">

   <AddIcon/> Create New Strategy
</Button>
        </div>
        <div className='strategy-table-header'>
            My Strategies
            </div >
            <div className='strategy-table'>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          
          <TableRow  >
           
            {['Strategy ID','Strategy Name','Min. Capital','Return','Drawdown','Source','Created On','Actions'].map((header)=>{
              return (
                <StyledTableCell style={{backgroundColor:'#6B6768',color:'white'}} align="center">{header}</StyledTableCell>
              )})}     
          </TableRow>
        </TableHead>
        <TableBody>
           {[1,2,3,4,5,6,7].map((strategy,index)=>{ 
            return (
              <TableRow
              style={{backgroundColor:index%2===0?'#FFFFFF':'#FBF9F7'}}
              key={strategy.strategy_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell align="center">AX-1031</StyledTableCell>
                <StyledTableCell align="center">QUICK SINGLES NUMBER 02</StyledTableCell>
                <StyledTableCell align="center">₹ 2,00,000</StyledTableCell>
                <StyledTableCell style={{color:'#2CAE76'}} align="center">₹ 1,20,000 (60%)</StyledTableCell>
                <StyledTableCell align="center">₹ 1,20,000 (60%)</StyledTableCell>
                <StyledTableCell align="center">Amibroker</StyledTableCell>
                <StyledTableCell align="center">02-Apr-22</StyledTableCell>
                <StyledTableCell align="center">
                <VisibilityIcon style={{cursor:'pointer',height:'17px'}}/>
                  <EditOutlinedIcon onClick={()=>handleEdit(strategy)} style={{cursor:'pointer',height:'17px'}}/>
                  <DeleteOutlineOutlinedIcon onClick={()=>handleDelete(strategy)} style={{cursor:'pointer',height:'17px'}}/>
                </StyledTableCell>
              {/* <StyledTableCell align="center">{strategy.strategy_id}</StyledTableCell>
                <StyledTableCell align="center">{strategy.strategy_name}</StyledTableCell>
                <StyledTableCell align="center">{strategy.strategy_min_capital}</StyledTableCell>
                <StyledTableCell align="center">{strategy.strategy_return}</StyledTableCell>
                <StyledTableCell align="center">{strategy.strategy_drawdown}</StyledTableCell>
                <StyledTableCell align="center">{strategy.strategy_source}</StyledTableCell>
                <StyledTableCell align="center">{strategy.strategy_created_on}</StyledTableCell>
                <StyledTableCell align="center">
                <VisibilityIcon style={{cursor:'pointer'}}/>
                  <EditOutlinedIcon onClick={()=>handleEdit(strategy)} style={{cursor:'pointer'}}/>
                  <DeleteOutlineOutlinedIcon onClick={()=>handleDelete(strategy)} style={{cursor:'pointer'}}/>
                </StyledTableCell> */}
              </TableRow>
            )

          })}
        {/* {strategiesList.map((strategy,index)=>{ 
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
                  <EditOutlinedIcon onClick={()=>handleEdit(strategy)} style={{cursor:'pointer'}}/>
                  <DeleteOutlineOutlinedIcon onClick={()=>handleDelete(strategy)} style={{cursor:'pointer'}}/>
                </StyledTableCell>
              </TableRow>
            )

          })} */}
          
        </TableBody>
       
      </Table>
      <div className='table-buttons-container'>
        <Button style={{"text-transform": "none",backgroundColor:'#2CAE76', fontWeight:'bold'}} 
variant="contained" color="primary">Create Strategy</Button>
        <Button style={{"text-transform": "none",backgroundColor:'#2CAE76', fontWeight:'bold'}} 
variant="contained" color="primary">Create Strategy</Button>
        <Button style={{"text-transform": "none",backgroundColor:'#2CAE76', fontWeight:'bold'}} 
variant="contained" color="primary">Create Strategy</Button>
        </div>
    </TableContainer> 
    </div>

    </div>
  )
    
  return (
    <Box sx={{ display: 'flex' }}>
      <SideNav />
        {mode === modes.VIEW ?displayStrategies():renderForm()}
    </Box>
  )
}
