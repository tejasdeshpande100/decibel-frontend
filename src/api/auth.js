import Axios from 'axios'

const loginUrl = process.env.REACT_APP_BACKEND_URL+"/login"
const signupUrl = process.env.REACT_APP_BACKEND_URL+"/register"

export const login = async (userData)=>{
    
    try{
        // const headers = { 
        //     'x-api-key': process.env.REACT_APP_API_GATEWAY_KEY
        // };
        //  const response = await Axios.post(loginUrl, userData, { headers })
        const response = await Axios.post(loginUrl, userData)
       
        // const response = await Axios.post(process.env.REACT_APP_BACKEND_URL+"/login",{email:"tejasdesh18@gmail.com",password:"tejas"});
        return response
            
    }catch(error){
        
            return error.response
    }  
   
}

export const signup = async (userData)=>{
    
    try{
        const headers = { 
            'x-api-key': process.env.REACT_APP_API_GATEWAY_KEY
        };
         const response = await Axios.post(signupUrl, userData, { headers })
         return response
            
    }catch(error){
        
            return error.response
    }  
   
}

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  };