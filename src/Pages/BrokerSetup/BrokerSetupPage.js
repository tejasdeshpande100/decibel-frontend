import React from 'react'
import { Button } from '@mui/material';

import './brokerSetupPage.css'



export default function BrokerSetupPage() {

function generateLoginUrl() {
  console.log('generateLoginUrl')
  
}

  return (
    <div>
        <div className="card">

    <h4><b>Zerodha</b></h4> 
   <Button variant="contained" color="primary" onClick={generateLoginUrl}>Login</Button>

  </div>
    </div>
  )
}
