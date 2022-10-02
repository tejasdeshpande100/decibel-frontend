import React,{useEffect,useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,  { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SideNav from '../../Components/SideNav/Desktop/SideNav';
import { styled } from '@mui/material/styles';
import { getStrategies } from '../../api/Strategy/strategy';
import {getPortfolios,createOrUpdatePortfolio, deletePortfolio} from '../../api/Portfolio/portfolio'
import "./portfolioPage.css"



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

  

export default function PortfolioPage() {
  const [loading,setLoading] = useState(false)
  const [mode, setMode] = React.useState(modes.VIEW);
  const [allStrategiesList, setAllStrategiesList] = React.useState([{strategy_id:1,strategy_name:'Strategy 1'},{strategy_id:2,strategy_name:'Strategy 2'}]);
  const [strategiesList, setStrategiesList] = React.useState([{strategy_id:1,strategy_name:'Strategy 1'},{strategy_id:2,strategy_name:'Strategy 2'}]);
  const [selectedStrategiesList, setSelectedStrategiesList] = React.useState([]);
  const [portfoliosList, setPortfoliosList] = React.useState([]);
  const [portfolioDetails, setPortfolioDetails] = React.useState({
    portfolio_name:'',
    portfolio_id:'',
    portfolio_min_capital: '',
   portfolio_return: '',
   portfolio_drawdown: '',
  //  portfolio_source: portfolio_modes[0].value,
  portfolio_created_on: '',
    strategy_list:selectedStrategiesList,
    user_id:localStorage.getItem('user_id')
  });

  useEffect(() => {
   
    const getData = async () => {
      const strategy_response = await getStrategies();
      const portfolio_response = await getPortfolios();
      
      if(strategy_response.status===200){
        setStrategiesList(strategy_response.data)
        setAllStrategiesList(strategy_response.data)
      }else{
        console.log(strategy_response)
      }

      if(portfolio_response.status===200){
        setPortfoliosList(portfolio_response.data)
      }else{
        console.log(portfolio_response)
      }
      
      return strategy_response;
    }

    // getData()
    

    }, [])

  const handleChangeInput = (e) => {
    setPortfolioDetails({...portfolioDetails,[e.target.name]:e.target.value})
    // setPortfolioDetails(portfolio)
   
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(portfolioDetails, selectedStrategiesList)
    const response = await createOrUpdatePortfolio({...portfolioDetails,strategy_list:selectedStrategiesList.map(strategy=>strategy.strategy_id)})
    
    if(response.status===200){
      console.log(response)
      setPortfoliosList([...portfoliosList,response.data])

      if(mode === modes.CREATE){
        setPortfoliosList([response.data,...portfoliosList])
      }else{
        
        setPortfoliosList(portfoliosList.map((portfolio)=> portfolio.portfolio_id === response.data.portfolio_id ? response.data : portfolio))
      }

      setMode(modes.VIEW)
    }else{
      console.log(response)
    }
    setSelectedStrategiesList([])
          setStrategiesList(allStrategiesList)
    setLoading(false)
    // code to submit form
    // setOpen(false);
    }


    const addStrategy = (index) => {
      setSelectedStrategiesList([...selectedStrategiesList, strategiesList[index]])
      const newStrategiesList = [...strategiesList]
      newStrategiesList.splice(index, 1)

      setStrategiesList(newStrategiesList)
      
    }

    const removeStrategy = (index) => {
      setStrategiesList([...strategiesList, selectedStrategiesList[index]])
      const newSelectedStrategiesList = [...selectedStrategiesList]
      newSelectedStrategiesList.splice(index, 1)
      setSelectedStrategiesList(newSelectedStrategiesList)
      
    }

      console.log(strategiesList)

    const handleDelete = async (portfolio) => {

      setLoading(true)
      const response = await deletePortfolio(portfolio)
      if(response.status===200){
        const newPortfoliosList = portfoliosList.filter((item)=>item.portfolio_id!==portfolio.portfolio_id)
        setPortfoliosList(newPortfoliosList)
      }else{
        console.log(response)
      }
      setLoading(false)
    }

   


    const handleEdit = (index) => {
      setPortfolioDetails({...portfolioDetails,...portfoliosList[index]})
      let selected = []
      let others = []
      console.log('portfoliosList[index]',portfoliosList[index],strategiesList)
      selected = portfoliosList[index].strategy_list.map(id=>{
        return allStrategiesList.find(strategy=>strategy.strategy_id===id)
      })
      others = allStrategiesList.filter((strategy)=>{
        
        return !portfoliosList[index].strategy_list.includes(strategy.strategy_id)
          
        }
      )
      
      console.log(others)
      setSelectedStrategiesList(selected)
      setStrategiesList(others)
      setMode(modes.EDIT)

    }


  // const renderForm = ()=> (
  //   <div className="portfolio-page-container">
  //   <div className="create-portfolio-form">
  //     <form onSubmit={handleSubmit}>
  //     {/* {renderErrorMessage("email")} */}
  //       <div className="create-portfolio-input-container">
  //         {/* <label>email </label> */}
  //         <input style={{width:'100%'}} onChange={handleChangeInput} value={portfolioDetails.portfolio_name} name='portfolio_name'  type="text" placeholder="Name" required />
        
  //       </div>
  //       <div className="create-portfolio-input-container">
  //         {/* <label>email </label> */}
  //         <textarea style={{width:'100%'}} onChange={handleChangeInput} value={portfolioDetails.description} name='description' className='description-area'  type="text" placeholder="Description...." required />
        
  //       </div>
  //       <h3>Choose Strategies</h3>
  //       <div className='choose-strategies-section'>
  //         <div className='available-strategies-section'>
  //           {strategiesList.length ?strategiesList.map((strategy,index)=>(
  //             <div key={strategy.strategy_id} className='strategy-item'>
  //               <div className='strategy-item-name'>{strategy.strategy_name}</div>
  //               <div onClick={()=>addStrategy(index)} className='add-strategy-button'>+ ADD</div>
  //               </div>
  //           )):null}
  //         </div>
  //         <div className='chosen-strategies-section'>
  //         { selectedStrategiesList.length? selectedStrategiesList.map((strategy,index)=>(
  //             <div key={strategy.strategy_id} className='strategy-item'>
  //               <div className='strategy-item-name'>{strategy.strategy_name}</div>
  //               <div  onClick={()=>removeStrategy(index)} className='add-strategy-button'> <DeleteOutlineOutlinedIcon/></div>
  //               </div>
  //           )):null}
  //         </div>
  //       </div>
        
  //       <div className="button-container">
         
  //       <div className='strategy-button-wrapper'>
  //       <Button 
  //       onClick={()=>{
  //         setSelectedStrategiesList([])
  //         setStrategiesList(allStrategiesList)
  //         setMode(modes.VIEW)
  //         }} fullWidth type="submit" style={{"text-transform": "none"}} variant="outlined">Cancel</Button>
  //       </div>
  //       <div className='strategy-button-wrapper'>
  //         <Button fullWidth type="submit" style={{"text-transform": "none"}} variant="contained">{loading?<CircularProgress
  //           size={25}
  //           sx={{
  //             color: 'white',
  //           }}
  //         />:modes.CREATE === mode?'Create':'Save'}</Button>   
  //            </div>
         
  //       </div>
  //     </form>
  //     <div style={{textAlign:'center', margin:'10px 0'}} >
    
  //     </div>
  //   </div>
  //   </div>
  // );

  const renderForm = ()=> (
    <div className='strategy-page-container'>
      <div style={{color:'grey'}}className='strategy-page-header'>Portfolio Management</div>
      <div className="strategy-form-header">Create New Portfolio</div>
    <div className="create-portfolio-form">
      
      <form onSubmit={handleSubmit}>
      {/* {renderErrorMessage("email")} */}
        <div className="create-portfolio-input-container">
          <div style={{width:'45%'}} >
          <div style={{fontWeight:'bold',marginBottom:'10px'}}>Portfolio Name <span style={{color:'#FE0707'}}>*</span></div>
          <input style={{width:'100%'}} onChange={handleChangeInput} value={portfolioDetails.portfolio_name} name='portfolio_name'  type="text" placeholder="Name" required />
          </div>
          <div style={{width:'45%'}} >
          <div style={{fontWeight:'bold',marginBottom:'10px'}}>Min. Capital <span style={{color:'#FE0707'}}>*</span></div>
          <input  style={{width:'100%'}} onChange={handleChangeInput} value={portfolioDetails.portfolio_min_capital} name='portfolio_min_capital'  type="text" placeholder="Rs.100000" required />
          </div>
        </div>
        <div className="create-portfolio-input-container">
          <div style={{width:'100%'}}>
        <div style={{fontWeight:'bold',marginBottom:'10px'}}>Portfolio Description<span style={{color:'#FE0707'}}>*</span></div>
        <div>
          <textarea style={{width:'100%', height:'170px'}} onChange={handleChangeInput} value={portfolioDetails.description} name='description'   type="text" placeholder="Description...." required />
          </div>
          </div>
        </div>
        <div className='build-portfolio-band' >BUILD PORTFOLIO</div>
        
<div style={{padding:'2em 2em 0 2em'}}>

        
       <div className='choose-strategies-section'>
        <div className='available-strategies-section-wrapper'> <h3>Add Strategy</h3>
        <div className='available-strategies-section'>
        {strategiesList.length ?strategiesList.map((strategy,index)=>(
              <div key={strategy.strategy_id} className='strategy-item'>
                <div className='strategy-item-name'>{strategy.strategy_name}</div>
                <div className='strategy-item-name'>SX-120123</div>
                <div className='strategy-item-name'>₹ 2,00,000</div>
                <div onClick={()=>addStrategy(index)} style={{"text-transform": "none",backgroundColor:'#2CAE76', color:'white',padding:'0.5px 7px', borderRadius:'5px', cursor:'pointer'}} 
variant="contained" color="primary">ADD +</div>
                </div>
            )):null}
          </div>
          </div>
          
          <div className='chosen-strategies-section'>
          <div > <h3>Portfolio Composition</h3>
          <div className='available-portfolios-section'>
            <div className='portfolio-composition-table-header'>
              <div>Strategy</div>
              <div>Strategy Id</div>
              <div>Min. Capital</div>
              <div>Multiplier</div>
              <div>Weight</div>
              <div>Action</div>
            
 </div>
          { selectedStrategiesList.length? selectedStrategiesList.map((strategy,index)=>(
              <div key={strategy.strategy_id} className='strategy-item'>
                <div className='strategy-item-name'>{strategy.strategy_name}</div>
                <div className='strategy-item-name'>SX-120123</div>
                <div className='strategy-item-name'>₹ 2,00,000</div>
               <input type="number" className='multiplier-input'></input>
                <div className='strategy-item-name'>12.50%</div>
                <div  style={{color:'#D20A16'}} onClick={()=>removeStrategy(index)} className='add-strategy-button'><DeleteOutlineOutlinedIcon style={{height:'20px'}}/></div>
                </div>
            )):null}
            </div>
            </div>
          </div>
       
        </div>
      
        </div>
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
          />:modes.CREATE === mode?'Create Portfolio':'Save Portfolio'}</Button>   
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

//   const displayPortfolios = () => (
//     <div className="portfolio-page-container">
        
//     <div className='page-header'>Portfolios</div>
//     <div className='create-button-container'>
// <Button 
// onClick={()=>{
//   setPortfolioDetails({...portfolioDetails, portfolio_name:'',
//   description:'',
//   portfolio_id:'',
//   strategy_list:[]})
//   setSelectedStrategiesList([])
//   setMode(modes.CREATE)

  
// }}
// variant="contained" color="primary" className="strategy-button">

// <AddIcon/> Create
// </Button>
// {/* <Modal
//     open={open}
//     onClose={handleClose}
//     aria-labelledby="modal-modal-title"
//     aria-describedby="modal-modal-description"
//   >
//     <Box sx={style}>
//     {renderForm()}
      
//     </Box>
//   </Modal> */}
//     </div>
//     <div className='strategy-table-header'>
//         My Portfolios
//         </div >
//         <div className='strategy-table'>
//         <TableContainer component={Paper}>
//   <Table sx={{ minWidth: 650 }} aria-label="simple table">
//     <TableHead>
//       <TableRow>
//         <StyledTableCell align="center">Name</StyledTableCell>
//         <StyledTableCell align="center">Description</StyledTableCell>
//         <StyledTableCell align="center">Running Live</StyledTableCell>
//         <StyledTableCell align="center">Action</StyledTableCell>
       
//       </TableRow>
//     </TableHead>
//     <TableBody>
      
//         {portfoliosList.length?portfoliosList.map((portfolio,index)=>(
//           <TableRow
//           key={portfolio.portfolio_id}
//           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//         >
//           <TableCell align="center">
//            {portfolio.portfolio_name}
//           </TableCell>
//           <TableCell align="center">{portfolio.description}</TableCell>
//           <TableCell align="center">False</TableCell>
//           <TableCell align="center">
//           <EditOutlinedIcon onClick={()=>handleEdit(index)} style={{cursor:'pointer'}}/>
//               <DeleteOutlineOutlinedIcon onClick={()=>handleDelete(portfolio)}  style={{cursor:'pointer'}}/>
//           </TableCell>
          
//         </TableRow>

//         )):null}
     
//     </TableBody>
//   </Table>
// </TableContainer> 
// </div>

// </div>)

const displayPortfolios = () => (
  <div className='strategy-page-container'>
      <div style={{color:'grey'}}className='strategy-page-header'>Portfolio Management</div>
      <div className='create-button-container'>
<Button 
// onClick={handleOpen}
onClick={()=>{
  setPortfolioDetails({...portfolioDetails, portfolio_name:'',
  description:'',
  portfolio_id:'',
  strategy_list:[]})
  setSelectedStrategiesList([])
  setMode(modes.CREATE)
  
}}
style={{"text-transform": "none",backgroundColor:'#2CAE76', fontWeight:'bold', marginBottom:'10px'}} 
variant="contained" color="primary" className="strategy-button">

 <AddIcon/> Create New Portfolio
</Button>
      </div>
      <div>Create a portfolio of one or more strategies to enhance risk management and to generate consistent returns. You can combine strategies and assign different weights to create a Portfolio.  You can share Portfolios with other traders and have them trade on these. </div>
      <div className='strategy-table-header'>
          My Portfolios
          </div >
          <div className='strategy-table'>
          <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        
        <TableRow  >
         
          {['Portfolio ID','Portfolio Name','Min. Capital','Return','Drawdown','Source','Created On','Actions'].map((header)=>{
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
           
            </TableRow>
          )

        })}
        
      </TableBody>
     
    </Table>
    <div className='table-buttons-container'>
      <Button style={{"text-transform": "none",backgroundColor:'#2CAE76', fontWeight:'bold'}} 
variant="contained" color="primary">Create Portfolio</Button>
      <Button style={{"text-transform": "none",backgroundColor:'#2CAE76', fontWeight:'bold'}} 
variant="contained" color="primary">Create Portfolio</Button>
      <Button style={{"text-transform": "none",backgroundColor:'#2CAE76', fontWeight:'bold'}} 
variant="contained" color="primary">Create Portfolio</Button>
      </div>
  </TableContainer> 
  </div>

  </div>
)
    
  return (
    <Box  sx={{ display: 'flex' }}>
      <SideNav/>
      {mode === modes.VIEW ?displayPortfolios():renderForm()}
    
    </Box>
  )
}

