import Axios from 'axios'

const getSumarryChartsUrl = "https://zx8sipvone.execute-api.ap-south-1.amazonaws.com/dev"

export const getSumarryCharts = async (client_id)=>{
    
    try{
        
         const response = await Axios.get(`${getSumarryChartsUrl}/client-equity-curve`)
         return response
            
    }catch(error){
        
            return error.response
    }  
   
}