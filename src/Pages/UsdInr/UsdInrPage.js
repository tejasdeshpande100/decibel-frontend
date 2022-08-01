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
      const lineOptions = {
        plugins: {
          title: {
              display: true,
              text: 'Custom Chart Title',
              position:'top'
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
      return {
        corr:{
        options: lineOptions,
        data:{
          labels: corrResponse.data.corr.x.map(x => x.split('-')[0]),
          datasets: [
            {
              label: "Users Gained",
              data: corrResponse.data.corr.y,
              backgroundColor: [
                "rgba(75,192,192,1)",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0",
              ],
              borderColor: "black",
              borderWidth: 2,
            },
          ],
        }
          
        },
        corr_hist:{
          options: lineOptions,
          data:{
            labels: corrResponse.data.corr_hist.x.map(x => Math.round((parseFloat(x) + Number.EPSILON) * 100) / 100),
            datasets: [
              {
                label: "Users Gained",
                data: corrResponse.data.corr_hist.y,
                backgroundColor: [
                  "rgba(75,192,192,1)",
                  "#ecf0f1",
                  "#50AF95",
                  "#f3ba2f",
                  "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
              },
            ]
        }
      },
        dd:{
          options: lineOptions,
          data:{
            labels: eqDdResponse.data.dd.x.map(x => x.split('-')[0]),
            datasets: [
              {
                label: "Users Gained",
                data: eqDdResponse.data.dd.y,
                backgroundColor: [
                  "rgba(75,192,192,1)",
                  "#ecf0f1",
                  "#50AF95",
                  "#f3ba2f",
                  "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
              },
            ]
        }
      },
        eq:{
          options: lineOptions,
          data:{
            labels: eqDdResponse.data.eq.x.map(x => x.split('-')[0]),
            datasets: [
              {
                label: "Users Gained",
                data: eqDdResponse.data.eq.y,
                backgroundColor: [
                  "rgba(75,192,192,1)",
                  "#ecf0f1",
                  "#50AF95",
                  "#f3ba2f",
                  "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
              },
              {
                label: "Nifty",
                data: eqDdResponse.data.nf.y,
                // backgroundColor: [
                //   "rgba(75,192,192,1)",
                //   "#ecf0f1",
                //   "#50AF95",
                //   "#f3ba2f",
                //   "#2a71d0",
                // ],
                borderColor: "black",
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

console.log(window)
  }, [window])

  console.log(state)
   
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

            
            {state ? (
            <>
            <div className="chart-title-container">
                <div className="chart-title">Equity/Drawdown Curve</div>
              </div>
              <div className="charts-container">
              <div className="chart-container">
              <LineChart 
              chartOptions={state.eq.options}
              chartData={state.eq.data} />
               
              </div>

                <div className="chart-container">
               
                <LineChart 
              chartOptions={state.dd.options}
              chartData={state.dd.data} />
                  </div>

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
          {state.signals.map((row) => (
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
