import React from 'react'
import Button from '@mui/material/Button';
import './strategyPipe.css'

export default function StrategyPipe(props) {
  const {strategy,openModal} = props;
  return (
    <div className='strategy-pipe'>
      <div>
      <div>
       {strategy.strategy_name} 
      </div>
      <div>
       {strategy.description} 
      </div>
      </div>

      <div>
      <div>
       Open Trades 
      </div>
      <div>
       2
      </div>
      <div>
       Open P/L
      </div>
      <div>2.5%</div>
      </div>

      <div>
      <div>
       Closed Trades 
      </div>
      <div>
       2
      </div>
      <div>
       Closed P/L
      </div>
      <div>2.5%</div>
      </div>

      <div>
        <div>
          LIVE MTM
        </div>
        <div>1000</div>
        <div>
<Button
onClick={()=>openModal()}
style={{backgroundColor:'#2CAE76',color:'white', textTransform:'none', marginTop:'0.7em'}}>View Details</Button>
        </div>
      </div>
      
    </div>
  )
}
