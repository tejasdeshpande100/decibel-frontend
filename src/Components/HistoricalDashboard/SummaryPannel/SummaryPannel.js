import * as React from 'react';
import { useState, useEffect } from 'react';
import { VictoryChart,VictoryLine,VictoryLabel,VictoryVoronoiContainer,VictoryAxis, VictoryTheme } from 'victory';
import { getSumarryCharts } from '../../../api/HistoricalDashboard/historicalDashboard';

import './summaryPannel.css';


export default function SummaryPanel() {

  //Initial State
  const initialState = {
    statsButtons:{
      statsButton:true,
      generalButton:false,
      
    },
    summaryButtons:{
      growthButton:true,
      balanceButton:false,
      profithButton:false,
      drawdownButton:false,
    }
  }

  const [state, setState] = useState(initialState);

  useEffect(() => {
    const getResponse = async () => {
     const response = await getSumarryCharts('DPF01')
     return response;
    }
     getResponse().then(data=>console.log(data))
   
  },[]);


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
  'Tracking':	'3334'
  }
  const statsKeys = Object.keys(stats);
  statsKeys.map(function(key) {
    return console.log(key,stats[key]);
  })


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
          <button className='switch-title'>Info</button>
          <button onClick={()=>setState({...state,statsButtons:{statsButton:true}})} style={state.statsButtons.statsButton?{backgroundColor:'white'}:{}} className='switch-button'>Stats</button>
          <button onClick={()=>setState({...state,statsButtons:{generalButton:true}})} style={state.statsButtons.generalButton?{backgroundColor:'white'}:{}} className='switch-button'>General</button>
        </div>
        <div>
        {displayStats()}
        
        </div>
       
 </div>


      <div className='summary-curves-container'>
      <div className='switch-buttons-container'>
          <button className='switch-title'>Chart</button>
          <button onClick={()=>setState({...state,summaryButtons:{growthButton:true}})} style={state.summaryButtons.growthButton?{backgroundColor:'white'}:{}} className='switch-button'>Growth</button>
          <button onClick={()=>setState({...state,summaryButtons:{balanceButton:true}})} style={state.summaryButtons.balanceButton?{backgroundColor:'white'}:{}} className='switch-button'>Balance</button>
          <button onClick={()=>setState({...state,summaryButtons:{profitButton:true}})} style={state.summaryButtons.profitButton?{backgroundColor:'white'}:{}} className='switch-button'>Profit</button>
          <button onClick={()=>setState({...state,summaryButtons:{drawdownButton:true}})} style={state.summaryButtons.drawdownButton?{backgroundColor:'white'}:{}} className='switch-button'>Drawdown</button>
        </div>
      <VictoryChart 
      theme={VictoryTheme.material}
        containerComponent={
          <VictoryVoronoiContainer
          labels={(d) => {
            return (d.datum.y);
           }}
          />
        }
      >
      <VictoryLabel
      x={300}
      y={50}
     
      textAnchor="middle"
    />
    

  <VictoryLine
    data={[
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 5 },
      { x: 4, y: 4 },
      { x: 5, y: 6 }
    ]}
  />
</VictoryChart>
      </div>
    
    </div>
  );
}
