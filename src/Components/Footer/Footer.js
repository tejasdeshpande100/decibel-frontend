import React from 'react'
import './footer.css'
import dice_logo from '../../images/dice_logo.svg'
import dice_logo_blue from '../../images/dice_logo_blue.png'

export default function Footer(props) {

    const footerLinks = [
        {
            title:'Company',
            links:[ 
                'Donec dignissim',
               'Curabitur egestas',
                'Nam posuere',
                'Aenean facilisis'
            ]
        },
        {
            title:'Services',
            links:[ 
                'Donec dignissim',
               'Curabitur egestas',
                'Nam posuere',
                'Aenean facilisis'
            ]
        },
        {
            title:'Resources',
            links:[ 
                'Donec dignissim',
               'Curabitur egestas',
                'Nam posuere',
            ]
        }
    ]
console.log(props)
  return (
    <div className='footer-container'>
       <div className='company-details-container' >
        <div className='footer-logo-container'>
            <img  className='footer-logo' src={props.color?dice_logo_blue:dice_logo} alt='dice'/>
        </div>
        <div className='company-details'>Nam posuere accumsan porta. Integer id orci sed ante tincidunt tincidunt sit amet sed libero.</div>
        </div> 

       <div className='footer-links-container'>
              {footerLinks.map((doc)=>{
                    return (
                        <div className='footer-links'>
                            <div style={props.headingColor?{color:props.headingColor}:{}} className='footer-links-title'>{doc.title}</div>
                            {doc.links.map((link)=>{
                                return (
                                    <div className='footer-links-text'>{link}</div>
                                )
                            })}
                        </div>
                    )})}
                        
        </div> 
       <div></div> 
    </div>
  )
}
