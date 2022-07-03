import Axios from 'axios'

const saveKiteCredsUrl = process.env.REACT_APP_BACKEND_URL+"/save-creds"
const generateLoginUrl = process.env.REACT_APP_BACKEND_URL+"/zerodha-login-url"

export const saveKiteCreds = async (userData)=>{
    
    try{
        const headers = { 
            'x-api-key': process.env.REACT_APP_API_GATEWAY_KEY
        };
         const response = await Axios.post(saveKiteCredsUrl, userData, { headers })
         return response
            
    }catch(error){
        
            return error.response
    }  
   
}

export const generateLoginLink = async (userData)=>{
    
    try{
        const headers = { 
            'x-api-key': process.env.REACT_APP_API_GATEWAY_KEY
        };
         const response = await Axios.post(generateLoginUrl, userData, { headers })
         return response
            
    }catch(error){
        
            return error.response
    }  
   
}