import React from 'react';
import {BrowserRouter,Routes, Route} from "react-router-dom";
import './App.css';
import Homepage from './Pages/Home/Homepage';
import LoginPage from "./Pages/Login/LoginPage";
import SignupPage from "./Pages/Signup/SignupPage";
import SideDrawer from "./Components/Drawer";
import getWindowDimensions from './utils/getWindowDimensions';
import DashboardPage from "./Pages/Dashboard/DashboardPage";
import BrokerSetupPage from "./Pages/BrokerSetup/BrokerSetupPage";
import PrivateRoute from "./PrivateRoute"
import {useSelector} from 'react-redux'

function App() {
  const {width,height}=getWindowDimensions()
  const isLoggedIn=useSelector(state=>state.isLoggedIn)
  console.log(isLoggedIn)

  return (
   <>
   {width<900?<SideDrawer/>:null}
    <BrowserRouter >
      <Routes>
      <Route path="/decibel-signup" element={<SignupPage/>} />
      <Route path="/decibel-login" element={<LoginPage/>} />
      <Route path="/dashboard" element={<PrivateRoute><DashboardPage/></PrivateRoute>} />
      <Route path="/broker-setup" element={<PrivateRoute><BrokerSetupPage/></PrivateRoute>} />
        <Route path="/" element={<Homepage/>} />
        </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
