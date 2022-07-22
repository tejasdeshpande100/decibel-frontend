import Axios from 'axios'

const loginUrl = process.env.REACT_APP_BACKEND_URL+"/login"
const googleLoginUrl = "https://lthdu5y95h.execute-api.us-east-1.amazonaws.com/prod/google-login"
const signupUrl = process.env.REACT_APP_BACKEND_URL+"/signup"

export const login = async (userData)=>{
    
    try{
  
        const response = await Axios.post(loginUrl, userData)
       
       
        return response
            
    }catch(error){
        
            return error.response
    }  
   
}

export const google_login = async (userData)=>{
    
  try{

      const response = await Axios.post(googleLoginUrl, userData)

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

  export const signout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      
    }
  };