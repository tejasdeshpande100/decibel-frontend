import React,{useEffect, useRef} from 'react'
var W3CWebSocket = require('websocket').w3cwebsocket;



export default function WSTesting() {

    const ws = useRef(null);
    const [ticks, setTicks] = React.useState({});

    useEffect(() => {
  ws.current = new W3CWebSocket('ws://127.0.0.1:8000/ws/ticks/');
        
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");

        ws.current.onmessage = (message) => {
            const data = JSON.parse(message.data);
            setTicks((ticks) => ({...ticks,...data}));
           
        };

        const wsCurrent = ws.current;

        return () => {
            wsCurrent.close();
        };
    },[])


   

    //     ws.current.onerror = function() {
    //         console.log('Connection Error');
    //     };
         
    
        // client.send(JSON.stringify({
        //     "instruments":[100,200],
        //     "type":"subscribe"
        //     }));
    
    const tick_keys = Object.keys(ticks);
  return (
    <div style={{paddingTop:'4em'}}>
        WS
        {tick_keys.map((token,index)=>(
            
            <div key={token}>{token}: {ticks[token].ltp}</div>
          
            
        ))}
    </div>
  )
}
