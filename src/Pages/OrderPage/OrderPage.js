import React, {useState} from 'react'
import './orderPage.css'
import DraggableModal from '../../Components/DraggableModal/DraggableModal'
import Radio from '@mui/material/Radio';
import AutocompleteSearch from '../../Components/AutocompleteSearch/AutocompleteSearch'


const NSE = 'NSE'
const BSE = 'BSE'
const transaction_types = {
    BUY: 'BUY',
    SELL: 'SELL'
}

const varieties = {
    regular:{
        value:'regular',
        label:'Regular'
    },
    amo:{
        value:'amo',
        label:'AMO'
    },
    co:{
        value:'co',
        label:'Cover'
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

const veriety_keys = Object.keys(varieties)
const product_keys = Object.keys(products)

export default function OrderPage() { 
    

    const visiblity = { 
        visible: false,
        disabled: true
    }

 
      const [modalVisible, setModalVisible] = useState(visiblity);
    
      const [selectedExchange, setSelectedExchange] = useState(NSE);

      const initialOrderDetails = {
            exchange: selectedExchange,
            transaction_type:transaction_types.BUY,
            trading_symbol: '',
            variety: varieties.regular.value,
           product:products.MIS.value,
            quantity: '',
            price: '',
            triger_price: '',
            order_type: '',
            validity: 'DAY',
            validity_ttl:1,
            disclosed_quantity:0

      }

      const [orderDetails, setOrderDetails] = useState(initialOrderDetails);

      const handleChangeExchange = (event) => {
        setSelectedExchange(event.target.value);
      };
    
      const showModal = () => {
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

      const buySellTicketTitle = ()=>{

        return (
            <div>TATASTEEL : {selectedExchange}, LIVE TRADING</div>
        )
        }
 const buySellTicketBody = ()=>{
    return (
        <div>
            <div>
      <Radio
        checked={selectedExchange === NSE}
        onChange={handleChangeExchange}
        value="NSE"
        name="radio-buttons"
        inputProps={{ 'aria-label': NSE }}
      />
      NSE
      <Radio
        checked={selectedExchange === BSE}
        onChange={handleChangeExchange}
        value="BSE"
        name="radio-buttons"
        inputProps={{ 'aria-label': BSE }}
      />
      BSE
    </div>
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
                            style={orderDetails.variety===value?{borderBottom:'solid #2862ff'}:null}
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
                      
                        return (  
                            <div key={label}>
                            <Radio
                            key={value}
        checked={orderDetails.product===value}
        onChange={handleChangeProduct}
        value={value}
        name="radio-buttons"
        inputProps={{ 'aria-label': label }}
      />  
      <span className='product-label'>
                            {label}
                            </span>
                            <span className='product-grey-label'>
                            {greyLabel}
                            </span>
                            
                            </div>
                        )})
                }
            
     
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
            <button onClick={showModal}>open order modal</button>
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
