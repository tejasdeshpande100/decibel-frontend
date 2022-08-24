import React from 'react'
import './banner.css'

export default function Banner() {
  return (
    <div className='banner-container'>
        <div className='index-price-banner'>
            <div>NIFTY</div>
            <div>17000  <span>+0.8%</span></div>
        </div>
        <div className='index-price-banner'>
        <div >BANKNIFTY</div>
            <div>36000  <span>+0.8%</span></div>
        </div>
        <div className='banner-info-div'>
            x x x x x x x x   x x x x x x x x   x x x x x x x x  x x x x x x x x   x x x x x x x x   x x x x x x x x 
            x x x x x x x x   x x x x x x x x   x x x x x x x x  x x x x x x x x   x x x x x x x x   x x x x x x x x 
            x x x x x x x x   x x x x x x x x   x x x x x x x x  x x x x x x x x   x x x x x x x x   x x x x x x x x  
            x x x x x x x x   x x x x x x x x   x x x x x x x x  x x x x x x x x   x x x x x x x x   x x x x x x x x 
            x x x x x x x x   x x x x x x x x   x x x x x x x x 
        </div>
    </div>
  )
}
