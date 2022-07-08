import React,{ useState } from 'react'
import './tradingActivityPannel.css'

export default function TradingActivityPannel() {
    const initialState = {
        pannelButtons:{
          openTrades:true,
          openOrders:false,
          history:false,
          exposure:false,
        }
      }
    
      const [state, setState] = useState(initialState);
    
      return (
        <div className='trading-panel-container'>
            <div className='switch-buttons-container'>
              <button className='switch-title'>Trading Activity</button>
              <button onClick={()=>setState({...state,pannelButtons:{openTrades:true}})} style={state.pannelButtons.openTrades?{backgroundColor:'white'}:{}} className='switch-button'>Open Trades (0)</button>
              <button onClick={()=>setState({...state,pannelButtons:{openOrders:true}})} style={state.pannelButtons.openOrders?{backgroundColor:'white'}:{}} className='switch-button'>Open Orders (0)</button>
              <button onClick={()=>setState({...state,pannelButtons:{history:true}})} style={state.pannelButtons.history?{backgroundColor:'white'}:{}} className='switch-button'>History (10)</button>
              <button onClick={()=>setState({...state,pannelButtons:{exposure:true}})} style={state.pannelButtons.exposure?{backgroundColor:'white'}:{}} className='switch-button'>Exposure</button>
            </div>
        </div>
      )
}
