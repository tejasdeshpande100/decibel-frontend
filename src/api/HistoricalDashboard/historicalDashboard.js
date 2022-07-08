import Axios from 'axios'

const getSumarryChartsUrl = "https://imrm0rz8y4.execute-api.ap-south-1.amazonaws.com/dev/client-equity"

export const getSumarryCharts = async (client_id)=>{
    
    try{
        
         const response = await Axios.get(`${getSumarryChartsUrl}?client_id=${client_id}`)
         return response
            
    }catch(error){
        
            return error.response
    }  
   
}