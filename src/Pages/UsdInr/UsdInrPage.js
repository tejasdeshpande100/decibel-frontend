import React,{useState} from 'react'
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import {
    VictoryChart,
    VictoryLine,
    VictoryLabel,
    VictoryVoronoiContainer,
    VictoryAxis,
    VictoryTheme,
    VictoryBar,
    VictoryPie,
  } from "victory";
import {chartsData,equity_curve_strategy, equity_curve_nifty} from './dummyData'
import './usdInrPage.css'

export default function UsdInrPage() {

    let arr = []
    chartsData.forEach((element,index) => {
        
     if(!(index%5)){
        arr.push({x:element.date,y:element.cumm_nifty}) 
     } 
    });


    const min = 21;
    const max = 365;
  
    const [value, setValue] = useState(21);
    const [selectedValue, setSelectedValue] = React.useState('a');

    const strategiesArr = [
        {
            value: 'a',
            label:'A'
        },
        {
            value: 'b',
            label:'B'
        },
        {
            value: 'c',
            label:'C'
        }
    ]

    const handleChangeNumber = event => {
        const value = Math.max(min, Math.min(max, Number(event.target.value)));
        setValue(value);
      };

      const handleChangeRadio = (event) => {
        setSelectedValue(event.target.value);
      };

  return (
    <div className="container">
        <div className='title'>
            Nifty Strategy based on USD/INR analysis
        </div>
        <div className='window-size-input'>
      <input
        type="number"
        placeholder="window size"
        value={value}
        onChange={handleChangeNumber}
      />
            </div>
            <div className='radio-buttons'>
               {strategiesArr.map((strategy)=>{
               return (<Radio
               key={strategy.value}
        checked={selectedValue === strategy.value}
        onChange={handleChangeRadio}
        value={strategy.value}
        name="radio-buttons"
        inputProps={{ 'aria-label': strategy.label }}
      />)})} 
            
            </div>
            <div className="charts-container">
            <div className="chart-container">
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
                    // tickLabelComponent={<VictoryLabel angle={90}/>}
                    fixLabelOverlap={true}
                  />
                  <VictoryAxis dependentAxis={true} />
                  <VictoryLabel x={300} y={50} textAnchor="middle" />

                  <VictoryLine
                    data={equity_curve_strategy}
                  />
                  <VictoryLine
                    data={equity_curve_nifty}
                  />
                </VictoryChart>
              </div>

              
            </div>
                </div>
                <div>
                    {arr.length}
                    {JSON.stringify(arr)}
                    
                    </div>
               
    </div>
  )
}
