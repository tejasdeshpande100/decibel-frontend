import React,{useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SideNav from '../../Components/SideNav/Desktop/SideNav';
import StrategyPipe from '../../Components/PMDashboard/StrategyPipe/StrategyPipe';
import Banner from '../../Components/PMDashboard/Banner/Banner';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import { useNavigate } from 'react-router-dom'
import { getStrategies } from '../../api/Strategy/strategy';
import Modal from '@mui/material/Modal';
import './pmDashboard.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1400,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    // border: '2px solid #000',
    // boxShadow: 24,
    p: 4,
  };

export default function PMDashboard() {

  const navigate = useNavigate();
  const [strategiesList, setStrategiesList] = React.useState([]);
  const [open,setOpen] =  useState(false)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    document.title = "PM Dashboard"

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

  const renderStrategy = ()=>{
    return (
      <div>
        <div>Chart</div>
        <div>Table</div>
      </div>
    )
  }


  return (
    <Box  sx={{ display: 'flex' }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
      {renderStrategy()}
         
        </Box>
      </Modal>
    <SideNav/>
  <div className="pm-dashbiard-page-container">
      
     <Banner/>
     <div className='live-icon-wrapper'>
      
      <OnlinePredictionIcon style={{marginRight:'0.5em'}} />
     
      LIVE
     </div>

<div className='strategy-pipes-container'>
     {strategiesList.length?strategiesList.map((strategy,index)=>(
       <StrategyPipe strategy={strategy} openModal={handleOpen} key={index}/>
      )):<div className="no-strategies-message-wrapper">
        <div className='no-strategies-message-div'>
         <div>You don't have any strategies.</div> 

          <Button 
          onClick={()=> navigate('/strategies',{state:{mode:'CREATE'}})}
          style={{marginTop:'1em', backgroundColor:'#F0F8FF'}}>Create</Button>
         
        </div>

        </div>}

</div>
<div  className='buttons-container'>
{[1,2,3,4].map((item,index)=>(
 <Button variant="outlined">Button {item}</Button>
   
))}
</div>
  </div>
  </Box>
  )
}
