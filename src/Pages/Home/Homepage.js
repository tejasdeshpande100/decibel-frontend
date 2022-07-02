import React from 'react'
import BrokerCardGrid from '../../Components/BrokerCardGrid'
import TraderOnChair from '../../images/TraderOnChair.png'
import './homepage.css'

export default function Homepage() {
  return (
    <div>
      <div className='center-text'>An easy and powerful way to automate your trading.</div>
      <div className='center-text'>Fully automated & configurable algos for Nifty & Banknifty,
Futures & Options.</div>
      <div className='trader-image-container'>
        <img className="trader-image" src={TraderOnChair} alt="Trader"/>
      </div>
      <BrokerCardGrid />
    </div>
  )
}
