import * as React from 'react';
import { useState, useEffect } from 'react';
import { VictoryChart,VictoryLine,VictoryLabel,VictoryVoronoiContainer,VictoryAxis, VictoryTheme } from 'victory';
// import { getSumarryCharts } from '../../../api/HistoricalDashboard/historicalDashboard';
import { chartsData } from '../../../api/HistoricalDashboard/dummyData';
import './summaryPannel.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";;



export default function SummaryPanel() {


  const [anchorEl, setAnchorEl] =useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const equityKeys = ['eq_abs','eq_pct','eq_pct_c','eq_abs_c']
  const drawdownKeys = ['dd_abs','dd_pct']

  //Initial State
  const initialState = {
    statsButtons:{
      statsButton:true,
      generalButton:false,
      
    },
    summaryButtons:{
      equityButton:true,
      drawdownButton:false,
    },
    summaryMoreOptions:equityKeys,
    chartData:[]
  }



  const [state, setState] = useState(initialState);

  const handleEquity = ()=>{
    setState({...state,summaryButtons:{equityButton:true},summaryMoreOptions:equityKeys, chartData:chartsData.eq_abs_c})
  }

  const handleDrawdown = ()=>{
    setState({...state,summaryButtons:{drawdownButton:true}, summaryMoreOptions:drawdownKeys,chartData:chartsData.dd_abs})
  }

  useEffect(() => {
    // const getResponse = async () => {
    //  const response = await getSumarryCharts('DPF01')
    //  return response;
    // }
    //  getResponse().then(data=>console.log(data))

    setState({...state,chartData:chartsData.eq_abs_c})
   
  },[]);

  const handleChnageChart = (option)=>{

    setState({...state,chartData:chartsData[option]})
  }

  const stats = {
  'Gain :':'+578.74%',
  'Abs. Gain: ':'+578.74%',
  'Daily':'0.05%',
  'Monthly:':'1.57%',
  'Drawdown:':'37.70%',
  'Balance:':'$678,739.34',
  'Equity:':'(100.00%) $678,739.34',
  'Highest:':	'(Jun 30) $678,739.34',
  'Profit:':	'$578,739.34',
  'Interest':	'$9,723.53',
  'Deposits':	'$100,000.00',
  'Withdrawals':	'$0.00',
  'Updated':	'4 hours ago',
  'Tracking':	'3334',

  'Balapnce:':'$678,739.34',
  'Equpity:':'(100.00%) $678,739.34',
  'Higphest:':	'(Jun 30) $678,739.34',
  'Propfit:':	'$578,739.34',
  'Intperest':	'$9,723.53',
  'Depposits':	'$100,000.00',
  'Witphdrawals':	'$0.00',
  'Uppdated':	'4 hours ago',
  'Trapcking':	'3334'
  }

//   const stats = {
//     "starting_capital": 10000000,
//     "daily_average_abs": 1351.6683090576942,
//     "daily_average_pct": 0.013516683090576902,
//     "weekly_average_abs": 5857.22933925001,
//     "weekly_average_pct": 0.058572293392500176,
//     "monthly_average_abs": 17571.688017750042,
//     "monthly_average_pct": 0.17571688017750042,
//     "total_profit": 35143.37603550005,
//     "total_profit_pct": 0.35143376035500035,
//     "max_profit": 381727.4138265,
//     "min_loss": -226141.92984599998,
//     "max_profit_pct": 3.8172741382649997,
//     "min_loss_pct": -2.26141929846,
//     "average_win": 113949.05456399999,
//     "average_loss": -69021.69810028125,
//     "average_win_pct": 1.13949054564,
//     "average_loss_pct": -0.6902169810028125,
//     "total_trades": 3842,
//     "total_costs": 143052.8739645,
//     "max_drawdown": -19.113666061369997,
//     "peak_equity_curve_abs": 288760.4636695,
//     "peak_equity_curve_pct": 2.8876046366950003,
//     "current_balance": 10035143.3760355
// }

  const statsKeys = Object.keys(stats);
  
  


  const displayStats = () => {
    const { statsButton,generalButton } = state.statsButtons;

    if(statsButton){
      return statsKeys.map(function(key) {
        return (
          <div key={key} className='table-row-hover table-row'>
                            <div>
                            {key}
                            </div>
                            <div className='small-font'>
                            {stats[key]}
                            </div>
                      </div>
        )
      })
    }else if(generalButton){
      return (
        <div>
          <div>
          Description:
        </div>
        <div>
        The GPS Robot is not like any other type of robot on the market. It uses an absolutely new approach! You will not find anything similar!
        </div>
        <div>
        https://gpsforexrobot.com
          </div>
        </div>
      )
    }
    
  }


  return (
    <div className='summary-panel-container'>

      {/* Stats Pannel */}
      <div className='stats-panel-container'>
        
        <div className='switch-buttons-container'>
          <div >
          <button className='switch-title'>Info</button>
          <button onClick={()=>setState({...state,statsButtons:{statsButton:true}})} style={state.statsButtons.statsButton?{backgroundColor:'white'}:{}} className='switch-button'>Stats</button>
          <button onClick={()=>setState({...state,statsButtons:{generalButton:true}})} style={state.statsButtons.generalButton?{backgroundColor:'white'}:{}} className='switch-button'>General</button>
       </div>
        </div>
        <div className='stats-table'>
        {displayStats()}
        
        </div>
       
 </div>


      <div className='summary-curves-container'>
      <div className='switch-buttons-container'>
      <div>
          <button className='switch-title'>Chart</button>
          <button onClick={handleEquity} style={state.summaryButtons.equityButton?{backgroundColor:'white'}:{}} className='switch-button'>Equity</button>
          <button onClick={handleDrawdown} style={state.summaryButtons.drawdownButton?{backgroundColor:'white'}:{}} className='switch-button'>Drawdown</button>
          </div>
          <div className='more-horizon-container'>
          <MoreHorizIcon 
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          />
          
          <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        {state.summaryMoreOptions.map((option)=>{
            return  <MenuItem key={option} onClick={()=>handleChnageChart(option)}>{option}</MenuItem>
          })}
        {/* <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem> */}
      </Menu>
          </div>
        </div>
      <div className='summary-chart-wrapper'>
      <VictoryChart 
       width={600}
      theme={VictoryTheme.material}
        containerComponent={
          <VictoryVoronoiContainer
          labels={(d) => {
            return (d.datum.y);
           }}
          />
        }
      >
        <VictoryAxis
        // tickLabelComponent={<VictoryLabel angle={90}/>}
        fixLabelOverlap={true}
        />
        <VictoryAxis
        
        dependentAxis={true}
        />
      <VictoryLabel
      x={300}
      y={50}
     
      textAnchor="middle"
    />
    

  <VictoryLine
    data={ state.chartData}
   
    //   [
    //   { x: 1, y: 2 },
    //   { x: 2, y: 3 },
    //   { x: 3, y: 5 },
    //   { x: 4, y: 4 },
    //   { x: 5, y: 6 }
    // ]
  
  />
</VictoryChart>
</div>
      </div>
    
    </div>
  );
}
