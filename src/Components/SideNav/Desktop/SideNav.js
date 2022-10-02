import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LaunchIcon from '@mui/icons-material/Launch';
import Logo from '../../../images/Logo 1.png'
import portfolio_management_icon from '../../../images/portfolio_management_icon.png'
import strategy_management_icon from '../../../images/strategy_management_icon.png'
import dashboard_icon from '../../../images/dashboard_icon.png'
import trading_pit_icon from '../../../images/trading_pit_icon.png'
import subscriber_management_icon from '../../../images/subscriber_management_icon.png'
import historical_performance_icon from '../../../images/historical_performance_icon.png'
import invoice_icon from '../../../images/invoice_icon.png'
import logout_sidebar_icon from '../../../images/logout_sidebar_icon.png'
import { Link } from "react-router-dom";

const drawerWidth = 270;

export default function SideNav() {

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            border: 'none',
            backgroundColor:'#04121F',
            color:'#DEDEDE',
            // zIndex: -1
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar >
          <div style={{textAlign:'left', marginTop:'3em'}} className="dice-sidenav-logo">
       <img style={{height:'50px', cursor:'pointer'}} alt={'Templogo'} src={Logo}/>
        </div> 
        </Toolbar >
        

        <Divider />
        <List style={{marginTop:'5em'}} >
          {[
            {label:"Dashboard/ Home",link:'/pm-dashboard',icon:dashboard_icon},
            {label:"Trading Pit",link:'/place-order',icon:trading_pit_icon}, 
            {label:"Subscriber Management",link:'/subscriber-management',icon:subscriber_management_icon}, 
            {label:"Portfolio Management",link:'/portfolios',icon:portfolio_management_icon}, 
            {label:"Strategy Management",link:'/strategies',icon:strategy_management_icon},
            {label:"Invoice/Billing",link:'/',icon:invoice_icon},
            {label:"Historical Performance",link:'/',icon:historical_performance_icon}
          ].map((item, index) => (
            <Link key={item.label} style={{color:'#515151'}} to={item.link}>
            <ListItem
            style={window.location.pathname === item.link ? {backgroundColor:'#25262C',fontWeight:'bold'} : {}}
             disablePadding>
              <div >
              <div style={{display:'flex',justifyContent:'space-around', padding:'3px 10px',margin:'3px 0',color:'#DEDEDE'}}>
                <ListItemIcon>
                 <img style={{height:'25px',paddingTop:'5px'}} src={item.icon} alt='icon'/>
                </ListItemIcon>
                <ListItemText   primary={item.label+' >'} />
              </div>
             </div>
            </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </>
  );
}

