import React from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DecibelLogo from '../../images/decibelLogo.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { isAuthenticated } from '../../api/auth';
import './headerNav.css'


export default function HeaderNav() {



    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
 const signOut = ()=>{
    localStorage.removeItem('token')
    window.location.href = '/decibel-login'
    }

  return (
    <div className='nav'>
        <div className='logo-container'>
<img className='logo' src={DecibelLogo} alt='Devibel'/>
        </div>
        <div className='account-icon-container'>
<AccountBoxIcon onClick={handleClick} fontSize='large'  />
{isAuthenticated()?<Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={signOut}>Sign Out</MenuItem>
      </Menu>:null}
        </div>
    </div>
  )
}
