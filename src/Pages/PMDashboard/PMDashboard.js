import React,{useEffect} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SideNav from '../../Components/SideNav/Desktop/SideNav';
import StrategyPipe from '../../Components/PMDashboard/StrategyPipe/StrategyPipe';
import Banner from '../../Components/PMDashboard/Banner/Banner';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import { getStrategies } from '../../api/Strategy/strategy';
import './pmDashboard.css'

export default function PMDashboard() {

  const [strategiesList, setStrategiesList] = React.useState([]);

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


  return (
    <Box  sx={{ display: 'flex' }}>
    <SideNav/>
  <div className="pm-dashbiard-page-container">
      
     <Banner/>
     <div className='live-icon-wrapper'>
      
      <OnlinePredictionIcon style={{marginRight:'0.5em'}} />
     
      LIVE
     </div>

<div className='strategy-pipes-container'>
     {strategiesList.length?strategiesList.map((strategy,index)=>(
       <StrategyPipe strategy={strategy} key={index}/>
      )):null}

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
