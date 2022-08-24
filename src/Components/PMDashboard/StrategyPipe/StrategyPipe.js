import React from 'react'
import Button from '@mui/material/Button';
import './strategyPipe.css'

export default function StrategyPipe(props) {
  const {strategy} = props;
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
       Open P/L: 2.5%
      </div>
      </div>

      <div>
      <div>
       Closed Trades 
      </div>
      <div>
       2
      </div>
      <div>
       Open P/L: 2.5%
      </div>
      </div>

      <div>
        <div>
          MTM: 1000
        </div>
        <div>
<Button style={{backgroundColor:'#F0F8FF', textTransform:'none'}}>View</Button>
        </div>
      </div>
      
    </div>
  )
}
