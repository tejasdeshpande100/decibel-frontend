import Axios from 'axios'

const crudPortfolioUrl = process.env.REACT_APP_BACKEND_URL+"/portfolios"
const getPortfoliosUrl = process.env.REACT_APP_BACKEND_URL+"/get-portfolios"

export const createOrUpdatePortfolio = async (portfolioDetails)=>{
    
    try{
  
        const response = await Axios.post(crudPortfolioUrl, portfolioDetails)
        
       
        return response
            
    }catch(error){
        
            return error.response
    }  
   
}

export const deletePortfolio = async (portfolio)=>{
    try{
  
        const response = await Axios.delete(crudPortfolioUrl, {
            data: portfolio
          })
        
       
        return response
            
    }catch(error){
        
            return error.response
    }  
}

export const getPortfolios = async ()=>{
    const user_id = localStorage.getItem('user_id')
    try{
  
        const response = await Axios.post(getPortfoliosUrl, {'user_id':user_id})
        
       
        return response
            
    }catch(error){
        
            return error.response
    }  
   
}
