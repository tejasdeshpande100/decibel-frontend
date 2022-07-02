import * as React from 'react';
import './index.css'
import AngelOnePng from '../../images/broker-angel.png'



export default function BrokerCardGrid() {
    const brokers = ["Zerodha", "Upstocks", "IIFL","AngelOne"]
  return (
    <>
        <div className="broker-card-grid">
            {brokers.map((broker) => {
                return (
                    <div className='card' >
                        <div className='image-container'>
                        <img className='broker-image' src={AngelOnePng} alt="Angel Broking Logo"/>
                        </div>
                    </div>
                    // <div className='card' ></div>
                )
            })}
           
            </div>
  </>   
  );
}
