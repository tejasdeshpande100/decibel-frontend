import React, { useState, useEffect } from "react";
// import {useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import CircularProgress from '@mui/material/CircularProgress';
import {signIn} from '../../redux/actions'
import {login, google_login} from "../../api/auth";
import Button from '@mui/material/Button';
import Axios from 'axios'

import "./loginPage.css";

function LoginPage(props) {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [loading, setLoading] = useState(false);
//  const dispatch = useDispatch()
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
        
        // dispatch(signIn())
        console.log(response.data);
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('email',response.data.user.email)
        localStorage.setItem('user_id',response.data.user.user_id)

        navigate('/pm-dashboard')
       
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
    {theme:"outline",size:"large", shape:'circle', type:'icon'}
  )

  
}, [])

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();
    setLoading(true);

    var { email, pass } = document.forms[0];

    let response = await login({email:email.value,password:pass.value})
    
setLoading(false);
    if(response.status !== 200){
      if(response.data && response.data.message){
        setErrorMessages({ name: "email", message: response.data.message  });
      }else{
        setErrorMessages({ name: "email", message: "Internal server error"  });
      }
        
    }else{
        
        // dispatch(signIn())
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('email',response.data.user.email)
        localStorage.setItem('user_id',response.data.user.user_id)

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
          <input type="email" placeholder="Email" name="email" required />
        
        </div>
        <div className="input-container">
          {/* <label>Password </label> */}
          <input type="password" placeholder="Password" name="pass" required />

        </div>
        <div className="button-container">
         
          <Button fullWidth type="submit" style={{"text-transform": "none"}} variant="contained">{loading?<CircularProgress
            size={25}
            sx={{
              color: 'white',
            }}
          />:'Login'}</Button>
         
        </div>
      </form>
      <div style={{textAlign:'center', margin:'10px 0'}} >
     or
      </div>
      <div style={{display:'flex'}}>
      <div style={{margin:'auto'}} id="signInDiv"></div>
      </div>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        { renderForm}
      </div>
      <Link to='/decibel-signup' className="signup">Sign up</Link>
    </div>
  );
}

export default LoginPage;
