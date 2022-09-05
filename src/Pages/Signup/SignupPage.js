import React, { useState } from "react";
import Checkbox from '@mui/material/Checkbox';
// import {useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
// import {signIn} from '../../redux/actions'
import {signup} from "../../api/auth";
import Button from '@mui/material/Button';

import "./signupPage.css";

function SignupPage(props) {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [investor,setInvestor] = useState(false)
  const [loading, setLoading] = useState(false);
//  const dispatch = useDispatch()
 const navigate = useNavigate();

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    setLoading(true);
    
    var { email, pass } = document.forms[0];

    let response = await signup({email:email.value,password:pass.value,portfolio_manager:!investor});

    setLoading(false);
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
        <div style={{width:'100%'}} className="input-container">
         
          <input style={{width:'100%'}} placeholder="Email" type="email" name="email" required />
        
        </div>
        <div style={{width:'100%'}} className="input-container">
         
          <input style={{width:'100%'}} placeholder="Passowrd" type="password" name="pass" required />

        </div>
       
         <div>
         <Checkbox onClick={()=>setInvestor(true)}  checked={investor} /> I am an investor
         </div>
         <div>
         <Checkbox onClick={()=>setInvestor(false)} checked={!investor} /> I am a Portfolio Manager
         </div>
      
        <div className="button-container">
        <Button fullWidth type="submit" style={{"text-transform": "none"}} variant="contained">{loading?<CircularProgress
            size={25}
            sx={{
              color: 'white',
            }}
          />:'Signup'}</Button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div style={{paddingBottom:'4em'}} className="login-form">
        <div className="title">Sign Up</div>
        { renderForm}
      </div>
      <Link to='/decibel-login' className="signup">Sign In</Link>
    </div>
  );
}

export default SignupPage;
