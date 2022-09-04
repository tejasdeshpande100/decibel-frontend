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
import { Link } from "react-router-dom";

const drawerWidth = 240;

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
            border: 'none'
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar >
          <div style={{textAlign:'center'}} className="dice-sidenav-logo">
       <img style={{height:'100px', cursor:'pointer'}} alt={'Templogo'} src={Logo}/>
        </div> 
        </Toolbar >
        

        <Divider />
        <List>
          {[{label:"Trading Pit",link:'/place-order'}, {label:"Subscribers",link:'/'}, {label:"Portfolios",link:'/portfolios'}, {label:"Strategies",link:'/strategies'},  {label:"Dashboard",link:'/pm-dashboard'}].map((item, index) => (
            <Link key={item.label} style={{color:'#515151'}} to={item.link}>
            <ListItem
            style={window.location.pathname === item.link ? {backgroundColor:'#f5f5f5'} : {}}
             disablePadding>
              
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <LaunchIcon /> : <LaunchIcon />}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
             
            </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </>
  );
}

