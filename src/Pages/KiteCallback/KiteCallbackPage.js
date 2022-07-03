import React, { useState } from 'react'
import {  useSearchParams } from 'react-router-dom';

export default function KiteCallbackPage() {
    const [BrokerLogin, setBrokerLogin] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams()

    const status = searchParams.get('status');
    const request_token = searchParams.get('request_token');
    console.log(status,request_token)

    if(status === 'success' && request_token && !BrokerLogin){
        console.log(status,request_token)
        setBrokerLogin(1)
    }else{
        console.log("Login Failed")
    }

    
  return (
    <>
    {BrokerLogin? <div>Success</div>:<div>Login Failed</div>}
    </>
    )
}
