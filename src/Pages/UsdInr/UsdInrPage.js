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
  const [window, setWindow] = useState(14)

 
  useEffect(() => {
    const getResponse = async () => {
      const eqDdResponse = await equityAndDrawdown(window)
      const corrResponse = await correlationPlots(window)
      console.log(eqDdResponse)
      return {...eqDdResponse.data,...corrResponse.data};
    }
    getResponse().then(response => {
      setState(response)
     
    }).catch(error => {
      console.log(error)
    })

console.log(window)
  }, [window])


   
// window sizes
const windowValues = [
  { label: '7', value: 7 },
  { label: '10', value: 10 },
  { label: '14', value: 14 },
  { label: '21', value: 21 },
  { label: '22', value: 22 },
  { label: '42', value: 42 },
  { label: '63', value: 63 },
  { label: '90', value: 90 }
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
      isOptionEqualToValue={(option, value) => option.value === value.value}
      onChange={(event, value) => {
        setState(null)
        setWindow(value.value)
      }}
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
              <div className="charts-container">
              <div className="chart-container">
               
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

                <div className="chart-container">
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
                    crossAxis
                    offsetY={50}
                  />
                  <VictoryAxis  dependentAxis={true} />
                  <VictoryLabel x={300} y={50} textAnchor="middle" />

                  <VictoryLine
                    data={state?state.corr:[]}
                  />
                  
                </VictoryChart>
                  </div>

                  <div className="chart-container">
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

                  <div className="chart-container">
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
    style={{
      data: { stroke: "red", strokeWidth: 2 },
      labels: { angle: -90, fill: "red", fontSize: 20 }
    }}
    // labels={["Important"]}
    labelComponent={<VictoryLabel y={100}/>}
    x={() => 23.5}
  />
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
  <div key={el} className='signals-table-row'>
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
