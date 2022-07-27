import Axios from 'axios'


const baseUrl = "https://zx8sipvone.execute-api.ap-south-1.amazonaws.com/dev"
const equityAndDrawdownUrl = baseUrl+"/f2f/eq-dd"
const correlationPlotsUrl = baseUrl+"/f2f/corr"


export const equityAndDrawdown = async (window)=>{
    
    try{
  
        const response = await Axios.get(equityAndDrawdownUrl+`?window=${window}`)
       
       
        return response
            
    }catch(error){
        
            return error.response
    }  
   
}

export const correlationPlots = async (window)=>{
    
    try{
  
        const response = await Axios.get(correlationPlotsUrl+`?window=${window}`)
       
       
        return response
            
    }catch(error){
        
            return error.response
    }  
   
}