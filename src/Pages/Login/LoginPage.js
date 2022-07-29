import React, { useState, useEffect } from "react";
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import {signIn} from '../../redux/actions'
import {login, google_login} from "../../api/auth";
import Button from '@mui/material/Button';
import Axios from 'axios'

import "./loginPage.css";

function LoginPage(props) {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
 const dispatch = useDispatch()
 const navigate = useNavigate();

 async function handleCallbackResponse(response) {
  console.log(response);
  let userObj = jwt_decode(response.credential);

  if(userObj.email && userObj.name){
    let response = await google_login(userObj);
    
    if(response.status !== 200){
      if(response.data && response.data.message){
        setErrorMessages({ name: "email", message: response.data.message  });
      }else{
        setErrorMessages({ name: "email", message: "Internal server error"  });
      }
        
    }else{
        
        dispatch(signIn())
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('email',response.data.user.email)

        navigate('/usd-inr')
       
    }
  }
  
}

useEffect(() => {
  /* global google */
  google.accounts.id.initialize({
    client_id:"106141003588-7s8kb86pufofvmemcrg5sej6v12m3k83.apps.googleusercontent.com",
    callback: handleCallbackResponse,
  });
  
  
  google.accounts.id.renderButton(
    document.getElementById("signInDiv"),
    {theme:"outline",size:"large"}
  )
}, [])

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();
    
    var { email, pass } = document.forms[0];

    let response = await login({email:email.value,password:pass.value})
    console.log('response',response)

    if(response.status !== 200){
      if(response.data && response.data.message){
        setErrorMessages({ name: "email", message: response.data.message  });
      }else{
        setErrorMessages({ name: "email", message: "Internal server error"  });
      }
        
    }else{
        
        dispatch(signIn())
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('email',response.data.user.email)

        navigate('/usd-inr')
       
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
      {renderErrorMessage("email")}
        <div className="input-container">
          {/* <label>email </label> */}
          <input type="email" placeholder="email" name="email" required />
        
        </div>
        <div className="input-container">
          {/* <label>Password </label> */}
          <input type="password" placeholder="password" name="pass" required />

        </div>
        <div className="button-container">
         
          <Button fullWidth type="submit" style={{"text-transform": "none"}} variant="contained">Login</Button>
         
        </div>
      </form>
      <div>
      <div style={{width:"500px"}} id="signInDiv"></div>
      </div>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        { renderForm}
      </div>
    </div>
  );
}

export default LoginPage;
