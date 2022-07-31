import React,{useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';
import Autocomplete from '@mui/material/Autocomplete';
import {
    VictoryChart,
    VictoryLegend,
    VictoryLine,
    VictoryLabel,
    VictoryVoronoiContainer,
    VictoryAxis,
    VictoryTheme,
    VictoryBar
  } from "victory";
import {equityAndDrawdown, correlationPlots} from '../../api/f2f/f2f'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,  { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './usdInrPage.css'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#404040',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function UsdInrPage() {

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

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
        return Math.round((d.datum.y + Number.EPSILON) * 100) / 100;
      }}
      />
    }
  >
    <VictoryLegend x={125} y={50}
  	// title="Legend"
    centerTitle
    orientation="horizontal"
    gutter={20}
    style={{ border: { stroke: "black" }, title: {fontSize: 20 } }}
    data={[
      { name: "One", symbol: { fill: "tomato", type: "star" } },
      { name: "Two", symbol: { fill: "orange" } },
      { name: "Three", symbol: { fill: "gold" } }
    ]}
  />
    <VictoryAxis
      fixLabelOverlap={true}
      tickFormat={(t) => t.split('-')[0]}
    />
    <VictoryAxis dependentAxis={true} />
    <VictoryLine
      data={state?state.eq:[]}
    />
    <VictoryLine
      data={state?state.nf:[]}
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
                      return Math.round((d.datum.y + Number.EPSILON) * 100) / 100;
                    }}
                    />
                  }
                >
                  <VictoryAxis
                    fixLabelOverlap={true}
                    crossAxis
                    offsetY={50}
                    tickFormat={(t) => t.split('-')[0]}
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
                        return Math.round((d.datum.y + Number.EPSILON) * 100) / 100;
                      }}
                    />
                  }
                >
                  <VictoryAxis
                  tickFormat={(t) => t.split('-')[0]}
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
                      return Math.round((d.datum.y + Number.EPSILON) * 100) / 100;
                    }}
                    />
                  }
                >
                  <VictoryAxis
                    fixLabelOverlap={true}
                    tickFormat={(t) => Math.round(t* 100)/100 }
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
            {/* <div className='signals-table-container'>
                  <div className='signals-table'>
                  <div  className='header-row'>
  <div className='table-cell'>
                        DATE
                      </div>
                      <div className='table-cell'>
                      EXIT
                      </div>
                      <div className='table-cell'>
                      LONG
                      </div>
                      <div className='table-cell'>
                      NIFTY CLOSE
                      </div>
                      <div className='table-cell'>
                      NIFTY REGIME
                      </div>
                      <div className='table-cell'>
                      USD CLOSE
                      </div>
                      <div className='table-cell'>
                      USD REGIME
                      </div>
                      </div>

{state.signal.map((el)=>{
  console.log(el)
return (
  <div key={el.date} className='signals-table-row'>
  <div className='table-cell'>
                        {el.date}
                      </div>
                      <div className='table-cell'>
                      {el.exit}
                      </div>
                      <div className='table-cell'>
                      {el.long}
                      </div>
                      <div className='table-cell'>
                      {el.nifty_close}
                      </div>
                      <div className='table-cell'>
                      {el.nifty_regime}
                      </div>
                      <div className='table-cell'>
                      {el.usd_close}
                      </div>
                      <div className='table-cell'>
                      {el.usd_regime}
                      </div>
                      </div>
                      
)
})}
                </div>      
                    
            </div> */} 

            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>DATE</StyledTableCell>
            <StyledTableCell align="center">EXIT</StyledTableCell>
            <StyledTableCell align="center">LONG</StyledTableCell>
            <StyledTableCell align="center">NIFTY CLOSE</StyledTableCell>
            <StyledTableCell align="center">NIFTY REGIME</StyledTableCell>
            <StyledTableCell align="center">USD CLOSE</StyledTableCell>
            <StyledTableCell align="center">USD REGIME</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.signal.map((row) => (
            <TableRow
              key={row.date}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="center">
                {row.exit}
              </TableCell>
              <TableCell align="center">{row.long}</TableCell>
              <TableCell align="center">{row.nifty_close}</TableCell>
              <TableCell align="center">{row.nifty_regime}</TableCell>
              <TableCell align="center">{row.usd_close}</TableCell>
              <TableCell align="center">{row.usd_regime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>    
             </>        ): ( 
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
