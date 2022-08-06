import React from 'react'
import './itemDetails.css'

export default function ItemDetails(props) {
   
    const {option} = props
  return (
    
    
<div 
 className='item-details'>
    <div className='item-name'>{option.name}</div>
    <div className='item-exchange'>{option.exchange}</div>
</div>

  )
}
