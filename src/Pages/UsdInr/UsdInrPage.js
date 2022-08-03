import React,{useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';
import Autocomplete from '@mui/material/Autocomplete';
import {equityAndDrawdown, correlationPlots} from '../../api/f2f/f2f'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,  { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LineChart from "../../Components/Charts/LineChart";
import BarChart from "../../Components/Charts/BarChart";
import getWindowDimensions from '../../utils/getWindowDimensions';
import './usdInrPage.css'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#EAEAEA',
    color: '#343434',
    fontWeight: 'bolder',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color:'#343434',
    fontWeight: 'bold',
  },
}));

export default function UsdInrPage() {

  const {width,height}=getWindowDimensions()
  if(0) console.log(width,height)


  


  const [state, setState] = useState()
  const [window, setWindow] = useState(14)

 
  useEffect(() => {
    const getResponse = async () => {
      const eqDdResponse = await equityAndDrawdown(window)
      const corrResponse = await correlationPlots(window)
      const lineOptions = {
        scales: {
          
          x: {
            title: {
              display: true,
              text: 'Year'
            },
            ticks: {
              
                     
            }
          }
        },
        
        plugins: {
          
          subtitle: {
            display: true,
            text: `Switching Strategy with window size =${window} days`,
            align:'start'
        },
          title: {
              display: true,
              text: 'Custom Chart Title',
              position:'top',
              align:'start'
          }
      },
        elements:{
          line:{
            borderWidth: 0.1
          },
            point:{
                borderWidth: 0,
                radius: 0,
                backgroundColor: 'rgba(0,0,0,0)'
            }
        }
    }

    if(width>400){
      lineOptions.scales.x.ticks.minRotation = 0;
      lineOptions.scales.x.ticks.maxRotation = 0
    } 
    const edDdLineOptions = {...lineOptions}
    console.log(width)
    edDdLineOptions.aspectRatio= 1.8;
    if(width>700) edDdLineOptions.aspectRatio= 2.7;
    if(width<400) edDdLineOptions.aspectRatio= 1;
    
    edDdLineOptions.scales.x.ticks.maxTicksLimit= 14

    const corrLineOptions = {...lineOptions}
    corrLineOptions.scales.x.ticks.maxTicksLimit= 10
    corrLineOptions.aspectRatio= 1.5;
    if(width<700) corrLineOptions.aspectRatio= 1.4;
    if(width<400) corrLineOptions.aspectRatio= 1;
     
    console.log(edDdLineOptions)
      return {
        corr:{
          options: {...corrLineOptions,scales:{...lineOptions.scales,y:{
            title: {
              display: true,
              text: 'Correlation'
            }
          },
        x:{
          ...corrLineOptions.scales.x,
          ticks: {
            ...corrLineOptions.scales.x.ticks,
            // Include a dollar sign in the ticks
            callback: function(value, index, ticks) {
             
                return corrResponse.data.corr.x[index].split('-')[0];
            }
          }
        }},plugins: {
            ...lineOptions.plugins,
            subtitle: {
              display: true,
              text: `Rolling ${window}-days correlation of Nifty & INR Daily Returns`,
              align:'start'
          },
            title: {...lineOptions.plugins.title,
              text: 'Correlation Curve',
            }}},
        data:{
          labels: corrResponse.data.corr.x,
          datasets: [
            {
              label: "correlation",
              data: corrResponse.data.corr.y,
              backgroundColor: 
              "rgba(75,192,192,1)",
              
            borderColor: "rgba(75,192,192,1)",
              borderWidth: 2,
            },
          ],
        }
          
        },
        corr_hist:{
          
          options: {...corrLineOptions,scales:{...lineOptions.scales,y:{
            
            title: {
              display: true,
              text: '% of observations in a bucket'
            }
          },x:{...corrLineOptions.scales.x,
            title: {
              display: true,
              text: 'Correlation Buckets'
            },
            
          }
        
        },plugins: {
            ...lineOptions.plugins,
            subtitle: {
              display: true,
              text: `Distribution of ${window}-days correlation of Nifty & INR Daily Returns`,
              align:'start'
          },
            title: {...lineOptions.plugins.title,
              text: 'Correlation Histogram',
            }}},
          data:{
            labels: corrResponse.data.corr_hist.x.map(x => Math.round((parseFloat(x) + Number.EPSILON) * 100) / 100),
            datasets: [
              {
                label: "correlation histogram",
                data: corrResponse.data.corr_hist.y,
                backgroundColor: 
                  "rgba(75,192,192,1)",
                  
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 2,
              },
            ]
        }
      },
        dd:{
        options: {...edDdLineOptions,scales:{...lineOptions.scales,y:{
          title: {
            display: true,
            text: 'Drawdown'
          }
        },
        x:{
          ...lineOptions.scales.x,
          ticks: {...edDdLineOptions.scales.x.ticks,
            // Include a dollar sign in the ticks
            callback: function(value, index, ticks) {
             
                return eqDdResponse.data.dd.x[index].split('-')[0];
            }
          }
        }},plugins: {
          ...lineOptions.plugins,
            title: {...edDdLineOptions.plugins.title,
              text: 'Drawdown Curve',
            }
                   }},
          data:{
            labels: eqDdResponse.data.dd.x,
            datasets: [
              
              {
                label: "Drawdown",
                data: eqDdResponse.data.dd.y,
                borderColor: "#cc0000",
                backgroundColor: "#cc0000",
                borderWidth: 2,
              },
            ]
        }
      },
        eq:{
          options: {...edDdLineOptions,scales:{...lineOptions.scales,y:{
            title: {
              display: true,
              text: 'Equity'
            }
          },x:{
            ...lineOptions.scales.x,
            ticks: {...edDdLineOptions.scales.x.ticks,
              // Include a dollar sign in the ticks
              callback: function(value, index, ticks) {
               
                  return eqDdResponse.data.eq.x[index].split('-')[0];
              }
            }
          }},plugins: {
            ...lineOptions.plugins,
 title: {...edDdLineOptions.plugins.title,
   text: 'Equity Curve',
 }
        }},
          data:{
            labels: eqDdResponse.data.eq.x,
            datasets: [
              {
                label: "Strategy",
                data: eqDdResponse.data.eq.y,
                borderColor: "#D86F35",
                borderWidth: 2,
                backgroundColor: '#D86F35',
              },
              {
                label: "Nifty",
                data: eqDdResponse.data.nf.y,
                borderColor: "#5FC9E2",
                backgroundColor: '#5FC9E2',
                borderWidth: 2,
              }
            ],
          }
            
          },
        signals: corrResponse.data.signal
      }
    }
    getResponse().then(response => {
      setState(response)
     
    }).catch(error => {
      console.log(error)
    })


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
        IDENTIFYING MARKET REGIMES
        </div>
        <div className='sub-title'>
        Switching Strategy – Longs Only – NIFTY or USDINR
        </div>
        <div className='sub-title'>
        Face2Face Talk on 04th Aug 2022
        </div>
  <div className='sub-header'>
    This page shows the current signal of the Switching strategy shared with the viewers of Face2Face Talk on 04-Aug-22. A link to Youtube video is available at the bottom of this page. 
Traders can choose from selective window/period sizes on this page and the results of this page will update. This can help discretionary traders on performing Multi-Time Frame analysis too. The default setting is 21 Days period. 
  </div>
  <div className='autocomplete-container'>
    <div>
     
    </div>
    <Autocomplete
    style={{width:'20%'}}
      disablePortal
      id="combo-box-demo"
     
      options={windowValues}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      onChange={(event, value) => {
        setState(null)
        setWindow(value.value)
      }}
      renderInput={(params) => <TextField {...params} label="Duration" />}
    />
      </div>
  <div className="body-wrapper">
            <div className="body-container">  

            
            {state ? (
            <>
            <div className="chart-title-container">
                {/* <div className="chart-title">Equity/Drawdown Curve</div> */}
              </div>
              <div style={{width:'auto'}} className='chart-container' >
              <LineChart 
              chartOptions={state.eq.options}
              chartData={state.eq.data} />
               
              </div>

                <div style={{width:'auto'}} className='chart-container' >
               
                <LineChart 
              chartOptions={state.dd.options}
              chartData={state.dd.data} />
                  </div>
              <div className="charts-container">
              

                  <div className="chart-container">
                  <LineChart 
              chartOptions={state.corr.options}
              chartData={state.corr.data} />
              </div>

                  <div className="chart-container">
                  <BarChart 
              chartOptions={state.corr_hist.options}
              chartData={state.corr_hist.data} />
                  </div>
                
            </div>
           <div className='table-heading'>{`Most Recent 10 Trades for Window size = ${window} Days`}</div>


            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>DATE</StyledTableCell>
            
            <StyledTableCell align="center">LONG</StyledTableCell>
            <StyledTableCell align="center">EXIT LONG</StyledTableCell>
            <StyledTableCell align="center">NIFTY CLOSE</StyledTableCell>
            <StyledTableCell align="center">USDINR CLOSE</StyledTableCell>
            <StyledTableCell align="center">NIFTY REGIME</StyledTableCell>
           
            <StyledTableCell align="center">USDINR REGIME</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.signals.map((row) => (
            <TableRow
              key={row.date}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="center">{row.long}</TableCell>
              <TableCell align="center">
                {row.exit}
              </TableCell>
              <TableCell align="center">{row.nifty_close}</TableCell>
              <TableCell align="center">{row.usd_close}</TableCell>
              <TableCell style={row.nifty_regime==='BEARISH'?{color:'#C32D2D'}:{color:'#279F67'}} align="center">{row.nifty_regime}</TableCell>
              <TableCell style={row.usd_regime==='BEARISH'?{color:'#C32D2D'}:{color:'#279F67'}} align="center">{row.usd_regime}</TableCell>
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
