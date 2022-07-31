import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
// import List from '@mui/material/List';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { isAuthenticated } from '../../api/auth';
import './index.css'

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const signOut = ()=>{
    localStorage.removeItem('token')
    window.location.href = '/decibel-login'
    }

  const signIn = ()=>{
    window.location.href = '/decibel-login'
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className='acc-icon-wrapper'>
      <AccountBoxIcon style={{fontSize: '80px'}} />
      <div>
      {isAuthenticated()?
      <Button onClick={signOut} variant="contained">Sign Out</Button>:
      <Button onClick={signIn} variant="contained">Log in</Button>
      }
      </div>
      </div>
      
      
      {/* <List>
      
          <ListItem key={'About'} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                
              </ListItemIcon>
              <ListItemText primary={'About'} />
            </ListItemButton>
          </ListItem>
      
      </List>
      <Divider /> */}
      
    </Box>
  );

  return (
    <div className='drawer'>
     
        <React.Fragment key={'right'}>
          <Button onClick={toggleDrawer('right', true)}>
            <MenuIcon/>
            </Button>
          <Drawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
          >
            {list('right')}
          </Drawer>
        </React.Fragment>
      
    </div>
  );
}
