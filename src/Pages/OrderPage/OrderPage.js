import React, {useState} from 'react'
import './orderPage.css'
import DraggableModal from '../../Components/DraggableModal/DraggableModal'
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import AutocompleteSearch from '../../Components/AutocompleteSearch/AutocompleteSearch'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const NSE = 'NSE'
const BSE = 'BSE'
const NFO = 'NFO'
const transaction_types = {
    BUY: 'BUY',
    SELL: 'SELL'
}

const varieties = {
    regular:{
        value:'regular',
        label:'Regular'
    },
    co:{
        value:'co',
        label:'Cover'
    },
    amo:{
        value:'amo',
        label:'AMO'
    },
    iceberg:{
        value:'iceberg',
        label:'Iceberg'
    }
}

const products={
    MIS:{
        value:'MIS',
        label:'Instraday MIS'
    },
    CNC:{
        value:'CNC',
        label:'Longterm CNC'
    },
    NRML:{
        value:'NRML',
        label:'Overnight NRML'
    }
}

const order_types={
    Price:{
        MARKET:{   
            value:'MARKET',
            label:'Market',
            value_on_button:'MKT'
        },
        LIMIT:{
            value:'LIMIT',
            label:'Limit',
            value_on_button:'LMT'
        }
    },
   Trigger_Price:{
    SL:{
        value:'SL',
        label:'SL',
        value_on_button:'SL'
    },
    SL_M:{
        value:'SL-M',
        label:'SL-M',
        value_on_button:'SL-M'
    },
   }
   
}

const validity_types = {
    DAY:{
        value:'DAY',
        label:'Day'
    },
    IOC:{
        value:'IOC',
        label:'Immediate'
},
TTL:{
    value:'TTL',
    label:'Minutes'
}
}

const ttlValues=[{value:1,label:'1 minute'},{value:2,label:'2 minutes'},{value:3,label:'3 minutes'},{value:5,label:'5 minutes'},{value:10,label:'10 minutes'},{value:15,label:'15 minutes'},{value:30,label:'30 minutes'},{value:45,label:'45 minutes'},{value:60,label:'60 minutes'},{value:90,label:'90 minutes'},{value:120,label:'120 minutes'}]

const veriety_keys = Object.keys(varieties)
const product_keys = Object.keys(products)
const order_type_price_keys = Object.keys(order_types.Price)
const order_type_trigger_keys = Object.keys(order_types.Trigger_Price)
const validity_keys = Object.keys(validity_types)

export default function OrderPage() { 
    

    const visiblity = { 
        visible: false,
        disabled: true
    }

 
      const [modalVisible, setModalVisible] = useState(visiblity);
    

      const initialOrderDetails = {
            exchange: '',
            transaction_type:transaction_types.BUY,
            trading_symbol: '',
            variety: varieties.regular.value,
           product:products.MIS.value,
            quantity: '',
            price: '',
            triger_price: '',
            order_type: order_types.Price.LIMIT.value,
            validity: 'DAY',
            validity_ttl:1,
            disclosed_quantity:0

      }

      const [orderDetails, setOrderDetails] = useState(initialOrderDetails);
      const [showOptions, setShowOptions] = useState(false);

      const handleChangeExchange = (event) => {
        setOrderDetails({...orderDetails,exchange:event.target.value});
      };
    
      const showModal = (option) => {
        console.log(option)
        setOrderDetails({...orderDetails,trading_symbol:option.tradingsymbol, exchange:option.exchange})
        setModalVisible({...modalVisible,
          visible: true
      });
      };
    
      const handleOk = e => {
        console.log(e);
        setModalVisible({...modalVisible,
          visible: false
        });
      };
    
     const handleCancel = e => {
        console.log(e);
        setModalVisible({...modalVisible,
          visible: false
        });
      };

      const handleChangeProduct = (event) => {
        setOrderDetails({...orderDetails,
            product: event.target.value
        });
        };

        const handleChangeTtl = (event) => {
            setOrderDetails({...orderDetails,validity_ttl:event.target.value});
          };

      const buySellTicketTitle = ()=>{

        return (
            <div>{orderDetails.trading_symbol} : {orderDetails.exchange}, LIVE TRADING</div>
        )
        }
 const buySellTicketBody = ()=>{
    return (
        <div>
            {(orderDetails.exchange===NSE ||
            orderDetails.exchange===BSE) &&
            <div>
      <Radio
      size='small'
        checked={orderDetails.exchange === NSE}
        onChange={handleChangeExchange}
        value={NSE}
        name="radio-buttons"
        inputProps={{ 'aria-label': NSE }}
      />
      {NSE}
      <Radio
      size='small'
        checked={orderDetails.exchange  === BSE}
        onChange={handleChangeExchange}
        value={BSE}
        name="radio-buttons"
        inputProps={{ 'aria-label': BSE }}
      />
      {BSE}
    </div>}
    {orderDetails.exchange===NFO &&
    <>
    <Radio
    size='small'
      checked={orderDetails.exchange  === NFO}
      onChange={handleChangeExchange}
      value={NFO}
      name="radio-buttons"
      inputProps={{ 'aria-label': NFO }}
    />
    {NFO}
    </>
    }
            <div className='buy-sell-toggle'>
               
                <div 
                 className='sell-toggle'
                 onClick={()=>setOrderDetails({...orderDetails,transaction_type:transaction_types.SELL})}
                style={
                    orderDetails.transaction_type===transaction_types.SELL?
                    null:{backgroundColor:'#f1f3fa', color:'#c1c8d7'}} 
               
                >
                    <div >
                        SELL
                        </div>
                        <div>
                            107.35
                            </div>
                </div>
                <div
                onClick={()=>setOrderDetails({...orderDetails,transaction_type:transaction_types.BUY})}
                style={
                    orderDetails.transaction_type===transaction_types.BUY?
                    null:{backgroundColor:'#f1f3fa', color:'#c1c8d7'}} 
                className='buy-toggle'>
                <div  >
                        BUY
                        </div>
                        <div>
                            107.35
                            </div>
                </div>
            </div>

            <div className='varieties'>
                    {veriety_keys.map((variety)=>{
                        const label = varieties[variety].label
                        const value = varieties[variety].value
                       
                        return (    
                            <div 
                            key={label}
                            onClick={()=>setOrderDetails({...orderDetails,variety:value})}
                            style={orderDetails.variety===value?{borderBottom:'solid #2862ff'}:{borderBottom:'solid #eee'}}
                            className='variety'
                           
                           >
                                {label}
                                </div>
                        )})}
                </div>
                <div className='products'>
                   
                {product_keys.map((product)=>{
                        const label = products[product].label.split(' ')[0]
                        const greyLabel = products[product].label.split(' ')[1]
                        const value = products[product].value

                        const conditions = (orderDetails.exchange===NFO && value===products.CNC.value) || (orderDetails.exchange!==NFO && value===products.NRML.value)
                      if(conditions){
                        return (
                            <div></div>
                        )
                      }else{
                        return (  
                            <div key={label}>
                            <Radio
                            size="small"
                            key={value}
        checked={orderDetails.product===value}
        onChange={handleChangeProduct}
        value={value}
        name="radio-buttons"
        inputProps={{ 'aria-label': label }}
      />  
      <span className='product-label'>
                            {label + ' '}
                            </span>
                            <span className='product-grey-label'>
                            {greyLabel}
                            </span>
                            
                            </div>
                        )
                      }
})
                }
            
     
    </div>

    <div className='inputs-container'>
        <div className='input-container'>
    <TextField
          id="outlined-quantity"
          size="small"
          label="Qty."
          defaultValue={1}
          InputProps={{ inputProps: { min: 1 } }}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        </div>
        <div className='input-container'>
        <TextField
          id="outlined-price"
          disabled={orderDetails.order_type
            ===order_types.Price.MARKET.value
            ||orderDetails.order_type
        ===order_types.Trigger_Price.SL_M.value}
          size="small"
          label="Price"
          defaultValue={0}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        </div>
        <div className='input-container'>
        <TextField
          id="outlined-trigger-price"

          defaultValue={0}
          size="small"
          disabled={orderDetails.order_type
            ===order_types.Price.MARKET.value
            ||orderDetails.order_type
        ===order_types.Price.LIMIT.value}
          label="Trigger Price"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        </div> 
        </div>
        <div className='order-types-section'>
<div className='empty-div-for-layout'>

</div>
<div className='order-types-price'>
    {order_type_price_keys.map((order_type)=>{
        const label = order_types.Price[order_type].label
        const value = order_types.Price[order_type].value
        return (
            <div key={label}>
            <Radio
            size='small'
            key={value}
        checked={orderDetails.order_type===value}
        onChange={()=>setOrderDetails({...orderDetails,order_type:value})}
        value={value}
        name="radio-buttons"
        inputProps={{ 'aria-label': label }}
      />  
      <span className='product-label'>
                            {label}
                            </span>
                            </div>
        )
    })}
</div>
<div className='order-types-trigger'>
{order_type_trigger_keys.map((order_type)=>{
        const label = order_types.Trigger_Price[order_type].label
        const value = order_types.Trigger_Price[order_type].value
        return (
            <div key={label}>
            <Radio
            size="small"
            key={value}
        checked={orderDetails.order_type===value}
        onChange={()=>setOrderDetails({...orderDetails,order_type:value})}
        value={value}
        name="radio-buttons"
        inputProps={{ 'aria-label': label }}
      />  
      <span className='product-label'>
                            {label}
                            </span>
                            </div>
        )
    })}
</div>

        </div>
<div
onClick={()=>setShowOptions(!showOptions)}
className='hide-show-toggle'>
    {showOptions? <>More Options</>:<>Hide Options
     {/* <KeyboardArrowUpIcon /> */}
     </>}
    </div>
        <div style={showOptions?{display:'none'}:{'border-top': 'solid #eee'}} className='inputs-container'>
        <div className='input-container'>
   Validity
        </div>
        <div className='input-container'>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          disabled={orderDetails.validity
            !==validity_types.TTL.value}
          size='small'
          value={orderDetails.validity_ttl}
          label="Minutes"
          onChange={handleChangeTtl}
        >
            {ttlValues.map((ttl)=>{
                return (
                    <MenuItem value={ttl.value}>{ttl.label}</MenuItem>
                )
            })}
         
        </Select>
        </div>
        <div className='input-container'>
        <TextField
          id="disclosed-qty"
          disabled={orderDetails.variety
            ===varieties.co.value
        || orderDetails.variety
    ===varieties.iceberg.value} 
          InputProps={{ inputProps: { min: 0 } }}
          defaultValue={0}
          size="small"
          label="Disclosed Qty"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        </div> 
        </div>
        <div style={showOptions?{display:'none'}:{}}>
            {validity_keys.map((validity)=>{
                const label = validity_types[validity].label
                const value = validity_types[validity].value
                return (
                    <div key={label}>
                    <Radio
                    size="small"
                    key={value}
        checked={orderDetails.validity===value}
        onChange={()=>setOrderDetails({...orderDetails,validity:value})}
        value={value}
        name="radio-buttons"
        inputProps={{ 'aria-label': label }}
      />  
      <span className='product-label'>
                            {label}
                            </span>
                            </div>
                )})
            }
        </div>
        
        <div>
            <button 
            style={
                orderDetails.transaction_type===transaction_types.SELL?
                {backgroundColor:'#f23645', color:'white'}:null
            }
            className='buy-sell-button' >
               {orderDetails.transaction_type} {orderDetails.quantity} {orderDetails.trading_symbol} : {orderDetails.exchange} {orderDetails.order_type}
            </button>
            </div>


        </div>
    )
 }

  return (
    <div className='order-page-container'>
        <div className='instruments-section'>
            <AutocompleteSearch
            showModal={showModal}
            />
       
        </div>
        <div className='orders-section'> <div>
            {/* <button onClick={showModal}>open order modal</button> */}
            <DraggableModal
           showModal={showModal}
           handleOk={handleOk}
           modalVisible={modalVisible}
           handleCancel={handleCancel}
           setModalVisible={setModalVisible}
            buySellTicketBody = {buySellTicketBody}
            buySellTicketTitle={buySellTicketTitle}
            />

            </div>
         
            </div>
       </div>
  )
}
