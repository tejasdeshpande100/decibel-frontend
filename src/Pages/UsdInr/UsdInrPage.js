import React,{useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';
import Autocomplete from '@mui/material/Autocomplete';
import {
    VictoryChart,
    VictoryLine,
    VictoryLabel,
    VictoryVoronoiContainer,
    VictoryAxis,
    VictoryTheme,
    VictoryBar
  } from "victory";
import {equityAndDrawdown, correlationPlots} from '../../api/f2f/f2f'
import './usdInrPage.css'

export default function UsdInrPage() {

  const [state, setState] = useState()


 
  useEffect(() => {
    const getResponse = async () => {
      const eqDdResponse = await equityAndDrawdown()
      const corrResponse = await correlationPlots()
      console.log(eqDdResponse)
      return {...eqDdResponse.data.body,...corrResponse.data.body};
    }
    getResponse().then(response => {
      setState(response)
     
    }).catch(error => {
      console.log(error)
    })


  }, [])


   
// window sizes
const windowValues = [
  { label: 7 },
  { label: 10 },
  { label: 14 },
  { label: 21 },
  { label: 22 },
  { label: 42 },
  { label: 63 },
  { label: 90 }
]

  return (
    <div className="container">
        <div className='title'>
            Nifty Strategy based on USD/INR analysis
        </div>
  <div className='sub-header'>
    <div className='sub-title'>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ligula nisi, mollis vitae iaculis ac, condimentum non tellus. Phasellus vel dictum urna. In mollis est arcu, a porttitor velit scelerisque ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut congue pellentesque bibendum. Morbi pharetra nibh nec massa maximus, ac facilisis quam posuere.
    </div>
    <div className='autocomplete-container'>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={windowValues}
      
      renderInput={(params) => <TextField {...params} label="Window" />}
    />
      </div>
  </div>
   
  <div className="body-wrapper">
            <div className="body-container">  

            
            {state ? (<>
            <div className="chart-title-container">
                <div className="chart-title">Equity/Drawdown Curve</div>
              </div>
              <div>
               
    <VictoryChart
    width={600}
    theme={VictoryTheme.material}
    containerComponent={
      <VictoryVoronoiContainer
        labels={(d) => {
          return d.datum.y;
        }}
      />
    }
  >
    <VictoryAxis
      fixLabelOverlap={true}
    />
    <VictoryAxis dependentAxis={true} />
    <VictoryLine
      data={state?state.eq:[]}
    />
  </VictoryChart>
   
               
              </div>

              <div>
                <VictoryChart
                  width={600}
                  theme={VictoryTheme.material}
                  containerComponent={
                    <VictoryVoronoiContainer
                      labels={(d) => {
                        return d.datum.y;
                      }}
                    />
                  }
                >
                  <VictoryAxis
                    fixLabelOverlap={true}
                  />
                  <VictoryAxis dependentAxis={true} />
                  <VictoryLabel x={300} y={50} textAnchor="middle" />

                  <VictoryLine
                    data={state?state.dd:[]}
                  />
                  
                </VictoryChart>
              </div>
              
              <div className="corr-charts-container">
                <div className="corr-chart-container">
                <VictoryChart
                  width={600}
                  theme={VictoryTheme.material}
                  containerComponent={
                    <VictoryVoronoiContainer
                      labels={(d) => {
                        return d.datum.y;
                      }}
                    />
                  }
                >
                  <VictoryAxis
                    fixLabelOverlap={true}
                  />
                  <VictoryAxis dependentAxis={true} />
                  <VictoryLabel x={300} y={50} textAnchor="middle" />

                  <VictoryLine
                    data={state?state.corr:[]}
                  />
                  
                </VictoryChart>
                  </div>

                  <div className="corr-chart-container">
                <VictoryChart
                  width={600}
                  theme={VictoryTheme.material}
                  containerComponent={
                    <VictoryVoronoiContainer
                      labels={(d) => {
                        return d.datum.y;
                      }}
                    />
                  }
                >
                  <VictoryAxis
                    fixLabelOverlap={true}
                  />
                  <VictoryAxis dependentAxis={true} />
                  <VictoryLabel x={300} y={50} textAnchor="middle" />

                  <VictoryBar
                    data={state?state.corr_hist:[]}
                  />
                  
                </VictoryChart>
                  </div>
                
            </div>
            <div className='signals-table-container'>
                  <div className='signals-table'>
                    

{[1,2,3,4,5].map((el)=>{
return (
  <div className='signals-table-row'>
  <div>
                        hello
                      </div>
                      <div>
                        hello
                      </div>
                      <div>
                        hello
                      </div>
                      <div>
                        hello
                      </div>
                      </div>
                      
)
})}
                </div>      
                    
            </div>       </>        ): (
              <>
              <div className='chart-skeleton'>
    <Skeleton variant="rectangular" height={400} />
    </div>
    <div className='chart-skeleton'>
    <Skeleton variant="rectangular" height={400} />
    </div>
    </>
    
  )}
            </div>
           
         
                </div>
 
                
               
    </div>
  )
}
