import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import ZerodhaSVG from '../../images/broker-zerodha.svg'
import {generateLoginLink} from "../../api/broker_token";
import './brokerLoginPage.css'




export default function BrokerLoginPage() {

  const navigate = useNavigate();

async function generateLoginUrl() {
  console.log('generateLoginUrl')
  const email = localStorage.getItem('email')

  const response = await generateLoginLink({email})
  console.log(response)

  if(response.status === 200){
    window.location.href=response.data.url
  }else{
    console.log('Missing kite creds')
    navigate('/broker-setup')
  }
  
}

  return (
    <div>
        <div className="card">
        <img style={{'width':'inherit'}} alt='zerodha'  src={ZerodhaSVG}/>
    <h4 style={{'color':'grey'}}><b>Zerodha</b></h4> 
    
   <Button variant="contained" color="primary" onClick={generateLoginUrl}>Login</Button>

  </div>
    </div>
  )
}
