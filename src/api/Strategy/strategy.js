import Axios from 'axios'

const crudStrategyUrl = process.env.REACT_APP_BACKEND_URL+"/strategies"
const getStrategiesUrl = process.env.REACT_APP_BACKEND_URL+"/get-strategies"

export const createOrUpdateStrategy = async (strategyDetails)=>{
    
    try{
  
        const response = await Axios.post(crudStrategyUrl, strategyDetails)
        
       
        return response
            
    }catch(error){
        
            return error.response
    }  
   
}

export const deleteStrategy = async (strategy)=>{
    try{
  
        const response = await Axios.delete(crudStrategyUrl, {
            data: strategy
          })
        
       
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
