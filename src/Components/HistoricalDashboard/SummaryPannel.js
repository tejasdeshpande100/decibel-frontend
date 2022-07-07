import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { VictoryChart,VictoryLine,VictoryLabel,VictoryVoronoiContainer } from 'victory';

import './summaryPannel.css';


export default function SummaryPanel() {



  const stats = {
    'Gain :':'+578.74%',
    'Abs. Gain: ':'+578.74%',
    'Daily':'0.05%',
    'Monthly:':'1.57%',
    'Drawdown:':'37.70%',
    'Balance:':'$678,739.34',
    'Equity:':'(100.00%) $678,739.34',
   'Highest:':	'(Jun 30) $678,739.34',
'Profit:':	'$578,739.34',
'Interest':	'$9,723.53',
'Deposits':	'$100,000.00',
'Withdrawals':	'$0.00',
'Updated':	'4 hours ago',
'Tracking':	'3334'
  }
  const statsKeys = Object.keys(stats);
  statsKeys.map(function(key) {
    return console.log(key,stats[key]);
  })


  return (
    <div className='summary-panel-container'>
      <div className='stats-panel-container'>
        <div>
        {statsKeys.map(function(key) {
    return (
      <div className='table-row-hover table-row'>
                        <div>
                        {key}
                        </div>
                        <div className='small-font'>
                        {stats[key]}
                        </div>
                  </div>
    )
  })}
        </div>
        {/* <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
            {statsKeys.map(function(key) {
    return (
      <TableRow hover role="checkbox" tabIndex={-1} key={100}>
                    
                        <TableCell  key={1} align={'left'}>
                        {key}
                        </TableCell>
                        <TableCell key={2} align={'right'}>
                        {stats[key]}
                        </TableCell>

                        
                        
                     
                  </TableRow>
    )
  })}
          <TableRow hover role="checkbox" tabIndex={-1} key={100}>
                    
                        <TableCell  key={1} align={'left'}>
                        Abs. Gain:
                        </TableCell>
                        <TableCell key={2} align={'right'}>
                        +578.74%
                        </TableCell>
                        
                     
                  </TableRow>
              
    
          </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>
       */}
       </div>
      <div className='summary-curves-container'>
      <VictoryChart 
        containerComponent={
          <VictoryVoronoiContainer
            labels={d => "(x=" + d.datum.x+ ";y=" + d.datum.y + ")" }
          />
        }
      >
      <VictoryLabel
      x={300}
      y={50}
      // text="Removing this label fixes everything"
      textAnchor="middle"
    />
  <VictoryLine
    data={[
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 5 },
      { x: 4, y: 4 },
      { x: 5, y: 6 }
    ]}
  />
</VictoryChart>
      </div>
    {/* <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">

        <TableHead>
            <TableRow>
              <TableCell align="left" colSpan={1}>
                Country
              </TableCell>
              <TableCell align="left" colSpan={1}>
                Details
              </TableCell>
            </TableRow>
            </TableHead>

          <TableBody>
          <TableRow hover role="checkbox" tabIndex={-1} key={100}>
                    
                        <TableCell key={1} align={'left'}>
                        Abs. Gain:
                        </TableCell>
                        <TableCell key={2} align={'right'}>
                        +578.74%
                        </TableCell>
                        
                     
                  </TableRow>
    
          </TableBody>
        </Table>
      </TableContainer>
      
    </Paper> */}
    </div>
  );
}
