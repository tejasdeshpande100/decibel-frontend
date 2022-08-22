import Axios from 'axios'

const createStrategyUrl = process.env.REACT_APP_BACKEND_URL+"/strategies"
const getStrategiesUrl = process.env.REACT_APP_BACKEND_URL+"/get-strategies"

export const createStrategy = async (strategyDetails)=>{
    
    try{
  
        const response = await Axios.post(createStrategyUrl, strategyDetails)
        
       
        return response
            
    }catch(error){
        
            return error.response
    }  
   
}

export const getStrategies = async ()=>{
    const user_id = localStorage.getItem('user_id')
    try{
  
        const response = await Axios.post(getStrategiesUrl, {'user_id':user_id})
        
       
        return response
            
    }catch(error){
        
            return error.response
    }  
   
}
