import React,{ useState } from 'react';

import './tradingPannel.css'

export default function TradingPannel() {

    //Initial State
  const initialState = {
    tradingPannelButtons:{
      periods:true,
      goals:false,
      browser:false,
    }
  }

  const [state, setState] = useState(initialState);

  return (
    <div className='trading-panel-container'>
        <div className='switch-buttons-container'>
          <div>
          <button className='switch-title'>Trading</button>
          <button onClick={()=>setState({...state,tradingPannelButtons:{periods:true}})} style={state.tradingPannelButtons.periods?{backgroundColor:'white'}:{}} className='switch-button'>Periods</button>
          <button onClick={()=>setState({...state,tradingPannelButtons:{goals:true}})} style={state.tradingPannelButtons.goals?{backgroundColor:'white'}:{}} className='switch-button'>Goals</button>
          <button onClick={()=>setState({...state,tradingPannelButtons:{browser:true}})} style={state.tradingPannelButtons.browser?{backgroundColor:'white'}:{}} className='switch-button'>Browser</button>
          </div>
        </div>
    </div>
  )
}
