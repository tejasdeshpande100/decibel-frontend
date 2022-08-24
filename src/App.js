import React from 'react';
import {BrowserRouter,Routes, Route} from "react-router-dom";
import './App.css';
import Homepage from './Pages/Home/Homepage';
import LoginPage from "./Pages/Login/LoginPage";
import SignupPage from "./Pages/Signup/SignupPage";
import SideDrawer from "./Components/Drawer";
import getWindowDimensions from './utils/getWindowDimensions';
import DashboardPage from "./Pages/HistoricalDashboard/DashboardPage";
import BrokerLoginPage from "./Pages/BrokerLogin/BrokerLoginPage";
import BrokerSetupPage from './Pages/BrokerSetup/BrokerSetupPage';
import KiteCallbackPage from "./Pages/KiteCallback/KiteCallbackPage";
import UsdInrPage from './Pages/UsdInr/UsdInrPage'
import PrivateRoute from "./PrivateRoute"
import HeaderNav from './Components/HeaderNav/HeaderNav';
import OrderPage from './Pages/OrderPage/OrderPage';
import StrategyPage from './Pages/StrategyPage/StrategyPage';
import PortfolioPage from './Pages/PortfolioPage/PortfolioPage';
import PMDashboard from './Pages/PMDashboard/PMDashboard';
// import {useSelector} from 'react-redux'
// import Axios from 'axios'

function App() {
  const {width,height}=getWindowDimensions()

  // const isLoggedIn=useSelector(state=>state.isLoggedIn)


  return (
   <>

   {width<900?<SideDrawer/>:<HeaderNav/>}
  
    <BrowserRouter >
      <Routes>
      <Route path="/decibel-signup" element={<SignupPage/>} />
      <Route path="/decibel-login" element={<LoginPage/>} />
      <Route path="/dashboard" element={<PrivateRoute><DashboardPage/></PrivateRoute>} />
      <Route path="/broker-login" element={<PrivateRoute><BrokerLoginPage/></PrivateRoute>} />
      <Route path="/broker-setup" element={<PrivateRoute><BrokerSetupPage/></PrivateRoute>} />
      <Route path="/kite-callback" element={<PrivateRoute><KiteCallbackPage/></PrivateRoute>} />
      <Route path="/usd-inr" element={<PrivateRoute><UsdInrPage/></PrivateRoute>} />
      <Route path="/place-order" element={<PrivateRoute><OrderPage/></PrivateRoute>} />
      <Route path="/create-strategy" element={<PrivateRoute><StrategyPage/></PrivateRoute>} />
      <Route path="/create-portfolio" element={<PrivateRoute><PortfolioPage/></PrivateRoute>} />
      <Route path="/pm-dashboard" element={<PrivateRoute><PMDashboard/></PrivateRoute>} />
        <Route path="/" element={<Homepage/>} />
        </Routes>
  </BrowserRouter>
 
  </>
  );
}

export default App;
