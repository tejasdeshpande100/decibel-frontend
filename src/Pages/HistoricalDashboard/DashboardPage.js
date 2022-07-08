import * as React from 'react';
import SummaryPanel from '../../Components/HistoricalDashboard/SummaryPannel/SummaryPannel';
import TradingPannel from '../../Components/HistoricalDashboard/TradingPannel/TradingPannel';
import TradingActivityPannel from '../../Components/HistoricalDashboard/TradingActivityPannel/TradingActivityPannel';
import './dashboardPage.css';


export default function DashboardPage() {


  return (
    <div className='main-container'>
      
      <SummaryPanel />
      <TradingPannel/>
      <TradingActivityPannel/>
   
    </div>
  );
}
