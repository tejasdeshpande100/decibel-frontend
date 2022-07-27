import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {signIn} from '../../redux/actions'
import {signup} from "../../api/auth";
import Button from '@mui/material/Button';

import "./signupPage.css";

function SignupPage(props) {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
 const dispatch = useDispatch()
 const navigate = useNavigate();

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();
    
    var { email, pass } = document.forms[0];

    let response = await signup({email:email.value,password:pass.value})


    if(response.status !== 200){
        setErrorMessages({ name: "email", message: response.data.message  });
    }else{
        

        navigate('/decibel-login')
       
    }

  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for signup form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
      {renderErrorMessage("email")}
        <div className="input-container">
         
          <input placeholder="email" type="email" name="email" required />
        
        </div>
        <div className="input-container">
         
          <input placeholder="passowrd" type="password" name="pass" required />

        </div>
        <div className="button-container">
        <Button fullWidth type="submit" style={{"text-transform": "none"}} variant="contained">Signup</Button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign Up</div>
        { renderForm}
      </div>
    </div>
  );
}

export default SignupPage;
