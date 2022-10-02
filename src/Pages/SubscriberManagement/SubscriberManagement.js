import React,{useState} from 'react'
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,  { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SideNav from '../../Components/SideNav/Desktop/SideNav';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import './subscriberManagement.css'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#EAEAEA',
    color: '#343434',
    fontWeight: 'bolder',
    padding:'10px',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color:'#343434',
    padding:'5px',
  },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    // border: '2px solid #000',
    // boxShadow: 24,
    p: 4,
  };

  const loginTypes = {
    FULLY_MANAGED: 'Fully Managed',
    PARTIALLY_MANAGED: 'Partially Managed',
}

const formTypes = {
    EMAIL_INVITE:'Email Invite',
    MANUAL_ENTRY:'Manual Entry'
}

const clientStatuses = {
  ACTIVE: 'Active',
  DEACTIVATED: 'Deactivated',
}

export default function SubscriberManagement() {
    
    const [open, setOpen] = React.useState(false);
    const [formType, setFormType] = React.useState(formTypes.EMAIL_INVITE);
    const [loginType, setLoginType] = React.useState(loginTypes.FULLY_MANAGED);
    const [clientStatus, setClientStatus] = React.useState(clientStatuses.DEACTIVATED);

 
    const [formData, setFormData] = React.useState({
        EmailInvite:{
            email:'',
            name:''
        },
        ManualEntry:{
            email:'',
            phone:'',
            name:'',
            alias:'',
            broker:'',
            broker_user_name:'',
            broker_password:'',
            api_key:'',
            api_secret:'',
            totp:''
        }
    });
    

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChangeClientStatus = (event) => {
      setClientStatus(event.target.value);
    };

    const handleSubmitEmailInvite = () => {
    }

    const handleInputEmailInvite = (e) => {
     console.log(e.target.name)
     setFormData({...formData,EmailInvite:{...formData.EmailInvite,[e.target.name]:e.target.value}})
      }

    
    const EmailInviteForm =  (
            <div className="email-invite-form">
                <form onSubmit={handleSubmitEmailInvite}>
      {/* {renderErrorMessage("email")} */}
        <div className="email-invite-form-input-container">
          {/* <label>email </label> */}
          <input style={{width:'100%'}} onChange={handleInputEmailInvite} value={formData.EmailInvite.email} name='email'  type="email" placeholder="email" required />
        
        </div>
        <div className="email-invite-form-input-container">
          {/* <label>email </label> */}
          <input style={{width:'100%'}} onChange={handleInputEmailInvite} value={formData.EmailInvite.name} name='name'  type="text" placeholder="name" required />
        
        </div>
        
        <div className="email-invite-button-container">
          
        
          <Button fullWidth type="submit" style={{"textTransform": "none"}} variant="contained">Send Invite</Button>   
            
        </div>
        
      </form>
                </div>
                )
        
    const handleSubmitManualEntry = (e) => {
    }

    const handleInputManualEntry = (e) => {
        console.log(e.target.name)
        setFormData({...formData,ManualEntry:{...formData.ManualEntry,[e.target.name]:e.target.value}})
            }

        const ManualEntryForm =  (
            <div className="manual-entry-form">
            <form onSubmit={handleSubmitManualEntry}>
  {/* {renderErrorMessage("email")} */}
    <div className="manual-entry-form-input-container">
      {/* <label>email </label> */}
      <input style={{width:'100%'}} onChange={handleInputManualEntry} value={formData.ManualEntry.email} name='email'  type="email" placeholder="email" required />
    
    </div>
    <div className="manual-entry-form-input-container">
      {/* <label>email </label> */}
      <input style={{width:'100%',border:'none',backgroundColor:'#F0F0F0'}} onChange={handleInputManualEntry} value={formData.ManualEntry.phone} name='phone'  type="number" placeholder="phone" required />
    
    </div>
    <div className="manual-entry-form-input-container">
      {/* <label>email </label> */}
      <input style={{width:'100%'}} onChange={handleInputManualEntry} value={formData.ManualEntry.name} name='name'  type="text" placeholder="name" required />
    
    </div>
    <div className="manual-entry-form-input-container">
      {/* <label>email </label> */}
      <input style={{width:'100%'}} onChange={handleInputManualEntry} value={formData.ManualEntry.alias} name='alias'  type="text" placeholder="alias" required />
    
    </div>
    <div className="manual-entry-form-input-container">
      {/* <label>email </label> */}
      <input style={{width:'100%'}} onChange={handleInputManualEntry} value={formData.ManualEntry.broker} name='broker'  type="text" placeholder="broker" required />
    
    </div>
    <div className="manual-entry-form-input-container">
      {/* <label>email </label> */}
      <input style={{width:'100%'}} onChange={handleInputManualEntry} value={formData.ManualEntry.broker_user_name} name='broker_user_name'  type="text" placeholder="broker username" required />
    
    </div>
    <div className="manual-entry-form-input-container">
      {/* <label>email </label> */}
      <input style={{width:'100%'}} onChange={handleInputManualEntry} value={formData.ManualEntry.broker_password} name='broker_password'  type="text" placeholder="broker password" required />
    
    </div>
    <div className="manual-entry-form-input-container">
      {/* <label>email </label> */}
      <input style={{width:'100%'}} onChange={handleInputManualEntry} value={formData.ManualEntry.api_key} name='api_key'  type="text" placeholder="api key" required />
    
    </div>
    <div className="manual-entry-form-input-container">
      {/* <label>email </label> */}
      <input style={{width:'100%'}} onChange={handleInputManualEntry} value={formData.ManualEntry.api_secret} name='api_secret'  type="text" placeholder="api secret" required />
    
    </div>
    <div className="manual-entry-form-input-container">
      {/* <label>email </label> */}
      <input style={{width:'100%',border:'none',backgroundColor:'#F0F0F0'}} onChange={handleInputManualEntry} value={formData.ManualEntry.totp} name='totp'  type="number" placeholder="totp" required />
    
    </div>
    
    <div className="manual-entry-button-container">
      
    
      <Button fullWidth type="submit" style={{"textTransform": "none"}} variant="contained">Send Invite</Button>   
        
    </div>
    
  </form>
            </div>
                    )


            const handleChangeLoginType=(login_type)=>{
                if(login_type===loginTypes.PARTIALLY_MANAGED){
                    setFormType(formTypes.EMAIL_INVITE)
                }
                setLoginType(login_type)
            }
        
            const handleChangeFormType = (event) => {
                setFormType(event.target.value);
              };

    const addEditSubscriberModal = () => {


        return (
         <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
       <div className='subscriber-modal-body-container'>
            <div className='subscriber-modal-header'>
                <h3>Add Subscriber</h3>
            </div>
            <div className='subscriber-modal-switch-form-type'>
                <div>     
        <Radio
      size='small'
        checked={loginType === loginTypes.FULLY_MANAGED}
        onChange={()=>handleChangeLoginType(loginTypes.FULLY_MANAGED)}
        value={loginTypes.FULLY_MANAGED}
        name="radio-buttons"
        inputProps={{ 'aria-label': loginTypes.FULLY_MANAGED }}
      />
      {loginTypes.FULLY_MANAGED}
      <Radio
      size='small'
        checked={loginType  === loginTypes.PARTIALLY_MANAGED}
        onChange={()=>handleChangeLoginType(loginTypes.PARTIALLY_MANAGED)}
        value={loginTypes.PARTIALLY_MANAGED}
        name="radio-buttons"
        inputProps={{ 'aria-label': loginTypes.PARTIALLY_MANAGED }}
      />
      {loginTypes.PARTIALLY_MANAGED}
      </div>
      <div> 
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formType}
          label="Age"
          onChange={handleChangeFormType}
        >
          <MenuItem value={formTypes.EMAIL_INVITE}>{formTypes.EMAIL_INVITE}</MenuItem>
          {loginType === loginTypes.FULLY_MANAGED?<MenuItem value={formTypes.MANUAL_ENTRY}>{formTypes.MANUAL_ENTRY}</MenuItem>:null}
        </Select>
      </div>
            </div>
            <div className='divider'></div>
            <div>
                {formType===formTypes.EMAIL_INVITE? EmailInviteForm: ManualEntryForm}
            </div>
       </div>
         
        </Box>
      </Modal> 
        )
    }


    const approvalQueueTable = () => {
    return (
      <div className='approval-queue-conatiner'>
         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          
          <TableRow  >
           
            {['Strategy ID','Strategy Name','Min. Capital','Return','Drawdown','Source','Created On','Actions'].map((header)=>{
              return (
                <StyledTableCell style={{backgroundColor:'#6B6768',color:'white'}} align="center">{header}</StyledTableCell>
              )})}     
          </TableRow>
        </TableHead>
        <TableBody>
           {[1,2,3,4].map((strategy,index)=>{ 
            return (
              <TableRow
              style={{backgroundColor:index%2===0?'#FFFFFF':'#FBF9F7'}}
              key={strategy.strategy_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell align="center">AX-1031</StyledTableCell>
                <StyledTableCell align="center">QUICK SINGLES NUMBER 02</StyledTableCell>
                <StyledTableCell align="center">₹ 2,00,000</StyledTableCell>
                <StyledTableCell style={{color:'#2CAE76'}} align="center">₹ 1,20,000 (60%)</StyledTableCell>
                <StyledTableCell align="center">₹ 1,20,000 (60%)</StyledTableCell>
                <StyledTableCell align="center">Amibroker</StyledTableCell>
                <StyledTableCell align="center">02-Apr-22</StyledTableCell>
                <StyledTableCell align="center">
                <VisibilityIcon style={{cursor:'pointer',height:'17px'}}/>
                  <EditOutlinedIcon onClick={()=>0} style={{cursor:'pointer',height:'17px'}}/>
                  <DeleteOutlineOutlinedIcon onClick={()=>0} style={{cursor:'pointer',height:'17px'}}/>
                </StyledTableCell>
              {/* <StyledTableCell align="center">{strategy.strategy_id}</StyledTableCell>
                <StyledTableCell align="center">{strategy.strategy_name}</StyledTableCell>
                <StyledTableCell align="center">{strategy.strategy_min_capital}</StyledTableCell>
                <StyledTableCell align="center">{strategy.strategy_return}</StyledTableCell>
                <StyledTableCell align="center">{strategy.strategy_drawdown}</StyledTableCell>
                <StyledTableCell align="center">{strategy.strategy_source}</StyledTableCell>
                <StyledTableCell align="center">{strategy.strategy_created_on}</StyledTableCell>
                <StyledTableCell align="center">
                <VisibilityIcon style={{cursor:'pointer'}}/>
                  <EditOutlinedIcon onClick={()=>handleEdit(strategy)} style={{cursor:'pointer'}}/>
                  <DeleteOutlineOutlinedIcon onClick={()=>handleDelete(strategy)} style={{cursor:'pointer'}}/>
                </StyledTableCell> */}
              </TableRow>
            )

          })}
        {/* {strategiesList.map((strategy,index)=>{ 
            return (
              <TableRow
              key={strategy.strategy_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <StyledTableCell align="center">{strategy.strategy_name}</StyledTableCell>
                <StyledTableCell align="center">{strategy.description}</StyledTableCell>
                <StyledTableCell align="center">{strategy.strategy_mode}</StyledTableCell>
                <StyledTableCell align="center">False</StyledTableCell>
                <StyledTableCell align="center">
                  <EditOutlinedIcon onClick={()=>handleEdit(strategy)} style={{cursor:'pointer'}}/>
                  <DeleteOutlineOutlinedIcon onClick={()=>handleDelete(strategy)} style={{cursor:'pointer'}}/>
                </StyledTableCell>
              </TableRow>
            )

          })} */}
          
        </TableBody>
       
      </Table>
    </TableContainer> 

</div>
    )
    }

    const activeClientsTable = () => {
      const clientStatusKeys = Object.keys(clientStatuses)
      return (
        <div className='approval-queue-conatiner'>
         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          
          <TableRow  >
           
            {['Strategy ID','Strategy Name','Min. Capital','Return','Drawdown','Source','Created On','Actions'].map((header)=>{
              return (
                <StyledTableCell style={{backgroundColor:'#6B6768',color:'white'}} align="center">{header}</StyledTableCell>
              )})}     
          </TableRow>
        </TableHead>
        <TableBody>
           {[1,2,3,4,6,7,8,9,10].map((strategy,index)=>{ 
            return (
              <TableRow
              style={{backgroundColor:index%2===0?'#FFFFFF':'#FBF9F7'}}
              key={strategy.strategy_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell align="center">AX-1031</StyledTableCell>
                <StyledTableCell align="center">QUICK SINGLES NUMBER 02</StyledTableCell>
                <StyledTableCell align="center">₹ 2,00,000</StyledTableCell>
                <StyledTableCell style={{color:'#2CAE76'}} align="center">₹ 1,20,000 (60%)</StyledTableCell>
                <StyledTableCell align="center">₹ 1,20,000 (60%)</StyledTableCell>
                <StyledTableCell align="center">Amibroker</StyledTableCell>
                <StyledTableCell align="center">02-Apr-22</StyledTableCell>
                <StyledTableCell align="center">
                <VisibilityIcon style={{cursor:'pointer',height:'17px'}}/>
                  <EditOutlinedIcon onClick={()=>0} style={{cursor:'pointer',height:'17px'}}/>
                  <DeleteOutlineOutlinedIcon onClick={()=>0} style={{cursor:'pointer',height:'17px'}}/>
                </StyledTableCell>
              {/* <StyledTableCell align="center">{strategy.strategy_id}</StyledTableCell>
                <StyledTableCell align="center">{strategy.strategy_name}</StyledTableCell>
                <StyledTableCell align="center">{strategy.strategy_min_capital}</StyledTableCell>
                <StyledTableCell align="center">{strategy.strategy_return}</StyledTableCell>
                <StyledTableCell align="center">{strategy.strategy_drawdown}</StyledTableCell>
                <StyledTableCell align="center">{strategy.strategy_source}</StyledTableCell>
                <StyledTableCell align="center">{strategy.strategy_created_on}</StyledTableCell>
                <StyledTableCell align="center">
                <VisibilityIcon style={{cursor:'pointer'}}/>
                  <EditOutlinedIcon onClick={()=>handleEdit(strategy)} style={{cursor:'pointer'}}/>
                  <DeleteOutlineOutlinedIcon onClick={()=>handleDelete(strategy)} style={{cursor:'pointer'}}/>
                </StyledTableCell> */}
              </TableRow>
            )

          })}
        {/* {strategiesList.map((strategy,index)=>{ 
            return (
              <TableRow
              key={strategy.strategy_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <StyledTableCell align="center">{strategy.strategy_name}</StyledTableCell>
                <StyledTableCell align="center">{strategy.description}</StyledTableCell>
                <StyledTableCell align="center">{strategy.strategy_mode}</StyledTableCell>
                <StyledTableCell align="center">False</StyledTableCell>
                <StyledTableCell align="center">
                  <EditOutlinedIcon onClick={()=>handleEdit(strategy)} style={{cursor:'pointer'}}/>
                  <DeleteOutlineOutlinedIcon onClick={()=>handleDelete(strategy)} style={{cursor:'pointer'}}/>
                </StyledTableCell>
              </TableRow>
            )

          })} */}
          
        </TableBody>
       
      </Table>
    </TableContainer> 

</div>
      )
    }

    const removedClientsTable = () => {
        return (
          <div className='approval-queue-conatiner'>
           <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            
            <TableRow  >
             
              {['Strategy ID','Strategy Name','Min. Capital','Return','Drawdown','Source','Created On','Actions'].map((header)=>{
                return (
                  <StyledTableCell style={{backgroundColor:'#6B6768',color:'white'}} align="center">{header}</StyledTableCell>
                )})}     
            </TableRow>
          </TableHead>
          <TableBody>
             {[1,2,3,4,6,7,8,9,10].map((strategy,index)=>{ 
              return (
                <TableRow
                style={{backgroundColor:index%2===0?'#FFFFFF':'#FBF9F7'}}
                key={strategy.strategy_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell align="center">AX-1031</StyledTableCell>
                  <StyledTableCell align="center">QUICK SINGLES NUMBER 02</StyledTableCell>
                  <StyledTableCell align="center">₹ 2,00,000</StyledTableCell>
                  <StyledTableCell style={{color:'#2CAE76'}} align="center">₹ 1,20,000 (60%)</StyledTableCell>
                  <StyledTableCell align="center">₹ 1,20,000 (60%)</StyledTableCell>
                  <StyledTableCell align="center">Amibroker</StyledTableCell>
                  <StyledTableCell align="center">02-Apr-22</StyledTableCell>
                  <StyledTableCell align="center">
                  <VisibilityIcon style={{cursor:'pointer',height:'17px'}}/>
                    <EditOutlinedIcon onClick={()=>0} style={{cursor:'pointer',height:'17px'}}/>
                    <DeleteOutlineOutlinedIcon onClick={()=>0} style={{cursor:'pointer',height:'17px'}}/>
                  </StyledTableCell>
                {/* <StyledTableCell align="center">{strategy.strategy_id}</StyledTableCell>
                  <StyledTableCell align="center">{strategy.strategy_name}</StyledTableCell>
                  <StyledTableCell align="center">{strategy.strategy_min_capital}</StyledTableCell>
                  <StyledTableCell align="center">{strategy.strategy_return}</StyledTableCell>
                  <StyledTableCell align="center">{strategy.strategy_drawdown}</StyledTableCell>
                  <StyledTableCell align="center">{strategy.strategy_source}</StyledTableCell>
                  <StyledTableCell align="center">{strategy.strategy_created_on}</StyledTableCell>
                  <StyledTableCell align="center">
                  <VisibilityIcon style={{cursor:'pointer'}}/>
                    <EditOutlinedIcon onClick={()=>handleEdit(strategy)} style={{cursor:'pointer'}}/>
                    <DeleteOutlineOutlinedIcon onClick={()=>handleDelete(strategy)} style={{cursor:'pointer'}}/>
                  </StyledTableCell> */}
                </TableRow>
              )
  
            })}
          {/* {strategiesList.map((strategy,index)=>{ 
              return (
                <TableRow
                key={strategy.strategy_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                  <StyledTableCell align="center">{strategy.strategy_name}</StyledTableCell>
                  <StyledTableCell align="center">{strategy.description}</StyledTableCell>
                  <StyledTableCell align="center">{strategy.strategy_mode}</StyledTableCell>
                  <StyledTableCell align="center">False</StyledTableCell>
                  <StyledTableCell align="center">
                    <EditOutlinedIcon onClick={()=>handleEdit(strategy)} style={{cursor:'pointer'}}/>
                    <DeleteOutlineOutlinedIcon onClick={()=>handleDelete(strategy)} style={{cursor:'pointer'}}/>
                  </StyledTableCell>
                </TableRow>
              )
  
            })} */}
            
          </TableBody>
         
        </Table>
      </TableContainer> 
  
  </div>
        )
    }

  return (
    <Box sx={{ display: 'flex' }}>
      <SideNav />
        {addEditSubscriberModal()}
        <div className='SubscriberManagement-page-container'>
            <Button 
            onClick={handleOpen}
            style={{"text-transform": "none",backgroundColor:'#2CAE76', fontWeight:'bold'}} 
            variant="contained" color="primary">+ Add New Subscriber</Button>
             <div className='subscriber-table-heading'>Pending Approval</div>
             {approvalQueueTable()}
             <div className='subscriber-table-heading'>Active Clients</div>
             {activeClientsTable()}
             <div className='subscriber-table-heading'>Removed Clients</div>
             {removedClientsTable()}
        </div>
       
    </Box>
  )
}
