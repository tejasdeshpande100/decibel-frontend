import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

import {saveKiteCreds} from "../../api/broker_token";

export default function BrokerSetupPage() {
    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const navigate = useNavigate();
   
     const handleSubmit = async (event) => {
       //Prevent page reload
       event.preventDefault();
       const email = localStorage.getItem('email')
       var { kite_api_key, kite_api_secret } = document.forms[0];
   
       let response = await saveKiteCreds({email,kite_api_key:kite_api_key.value,kite_api_secret:kite_api_secret.value})

   
       if(response.status === 200){
           console.log(response)
           navigate('/broker-login')
       }else{
          
        //   error
          setErrorMessages({ name: "kite_api_key", message: response.data.message  });
        console.log(response)
        
       }
   
     };
   
     // Generate JSX code for error message
     const renderErrorMessage = (name) =>
       name === errorMessages.name && (
         <div className="error">{errorMessages.message}</div>
       );
   
     // JSX code for login form
     const renderForm = (
       <div className="form">
         <form onSubmit={handleSubmit}>
         {renderErrorMessage("kite_api_key")}
           <div className="input-container">
             <label>kite_api_key </label>
             <input type="text" name="kite_api_key" required />
           
           </div>
           <div className="input-container">
             <label>kite_api_secret </label>
             <input type="password" name="kite_api_secret" required />
   
           </div>
           <div className="button-container">
             <input type="submit" />
           </div>
         </form>
       </div>
     );
   
     return (
       <div className="app">
         <div className="login-form">
           <div className="title">Setup Broker</div>
           { renderForm}
         </div>
       </div>
     );
   }