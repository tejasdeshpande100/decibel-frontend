import React,{useState} from 'react'
// import BrokerCardGrid from '../../Components/BrokerCardGrid'
// import TraderOnChair from '../../images/TraderOnChair.png'
import Footer from '../../Components/Footer/Footer'
import Button from '@mui/material/Button';
import EastIcon from '@mui/icons-material/East';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import orders_fired from '../../images/orders_fired.png'
import portfolio from '../../images/portfolio.png'
import trade_turnover from '../../images/trade_turnover.png'
import institution from '../../images/institution.png'
import features_cloud from '../../images/features_cloud.png'
import features_execution from '../../images/features_execution.png'
import features_paper_trading from '../../images/features_paper_trading.png'
import golden_star from '../../images/golden_star.png'
import clients_iphone from '../../images/clients_iphone.png'
import pm_desktop from '../../images/pm_desktop.png'
import './homepage.css'

export default function Homepage() {

  const [featureIndex, setFeatureIndex] = useState(0);

const platformStatsCards = ()=>{
    return(
        <div className='platform-stats-cards'>
           {[
            {text:'Orders Fired', numbers:'100K', imageSrc:orders_fired},
            {text:'Portfolio/Strategies', numbers:'450', imageSrc:portfolio},
            {text:'Traded Turnover', numbers:'252 Cr.', imageSrc:trade_turnover},
            {text:'Trusted Capital', numbers:'33 Cr.', imageSrc:institution},
          ].map((doc)=>{
            return (
              <div className='platform-stats-card'>
                <div className='stats-card-image-container'>
                  <img className='stats-card-image' src={doc.imageSrc} alt='image' />
                </div>
                <div className='platform-stats-card-number'>{doc.numbers}</div>
                <div className='platform-stats-card-text'>{doc.text}</div>
            </div>
            )
           })} 
          
            </div>  
    )
}

const renderFeatures = ()=>{
  const features = [
    {
      title:'Access the platform from any device - Laptops, Mobile Phones and Tablets',
      description:'DICE enables Portfolio Managers to access the portal from any browser and device. ',
      imageSrc:features_cloud
    },
    {
      title:'Imagine beyond Reliable & Fast Execution',
      description:'Execution models designed to achieve reliability at scale. DICE offers first in industry smart execution built on quantitative models and aimed to achieve positive slippages and low latency.',
      imageSrc:features_execution
    },
    {
      title:'Assess viability of your trading strategy without risking real money.',
      description:'A powerful simulation engine that allows Portfolio Managers to execute virtual trades on LIVE Market data without deploying real money to get a realistic trading performance.',
      imageSrc:features_paper_trading
    }
  ] 
  return (
    <div className='features-div'>
      
        <div className='features-div-text'>
          <div className='features-div-text-heading'>Features</div>
          <div className='features-div-sub-heading'>
            {['Cloud Based',
              'Smart & Reliable Execution',
              'Paper Trading'
          ].map((text,index)=>{
            return(
              <div 
              style={index==featureIndex?{ color: '#FFFFFF',backgroundColor: 'black'}:{}} 
              key={text} onClick={()=>setFeatureIndex(index)} className='features-div-sub-heading-text'>
                {text}
                </div>
            )
          })}
          </div>
          <div className='feature-details'>
<div className='feature-image-container'>
<img className='feature-image' src={features[featureIndex].imageSrc} alt='image' />
</div>
<div className='feature-details-text'>
  <div className='feature-details-text-heading'>{features[featureIndex].title}</div>
  <div className='feature-details-text-sub-heading'>{features[featureIndex].description}</div>
  </div>
          </div>
          </div>
     </div>
  )
}


const clientsAndPmsCards = ()=>{

  const cards =[
    {
      heading:'For Portfolio Managers',
      subHeading:'D.I.C.E for trading management & in-depth analytics of all trading activities',
      points:[
        'Quick Set up and Integration with multiple backtesting platforms',
      'Advanced Trading Analytics of Portfolios & Strategies',
        'Hassle Free Client Onboarding & Billing'
      ],
      imageSrc:pm_desktop
    },
    {
      heading:'For Trading Clients',
      subHeading:'D.I.C.E. for transparency and consistency of returns',
      points:[
       'Constant Monitoring of client accounts',
        'Instant Access to trading and strategy performance history',
        'Advanced Trading Analytics of the account'
      ],
      imageSrc:clients_iphone
    }
  ]

  return (
    <div className='clientsAndPms-cards-container'>
      {cards.map((doc,index)=>{
        return (
          <div className='clientsAndPms-card-container'>
            <div className='clientsAndPms-card-padding'>
          <div className='clientsAndPms-card-header'>
    <div className='clientsAndPms-card-header-text'>
    <div className='clientsAndPms-card-header-heading'>{doc.heading}</div>
    <div className='clientsAndPms-card-header-subheading'>{doc.subHeading}</div>
    
    </div>
    <div className='clientsAndPms-more-button-container'>
      <button className='clientsAndPms-more-button'>
      <EastIcon/>
      </button></div>
    
    </div>
    <div className='divider'></div>
    <div className='clientsAndPms-card-points'>
      {doc.points.map((point)=>{
        return (
          <div className='clientsAndPms-card-point'>
            <div className='clientsAndPms-card-point-image-container'>
            <CheckCircleIcon style={{height:'15px', color:'#2CAE76'}}/> 
              </div>
              <div className='clientsAndPms-card-point-text'> 
             
              {point}
              </div>
              </div>
        )
      })}
          </div>
        </div>
<div style={index===0?{textAlign:'right'}:{}} className='clientsAndPms-image-container'>
  <img className='clientsAndPms-image' src={doc.imageSrc} alt='image' />
</div>
          </div>
        )
      })}
</div>
  )
}

const clientsAndPms = ()=>{
  return (
    <div className='clientsAndPms-container'>
<div className='golden-star-image-container'>
  <img className='golden-star-image' src={golden_star}  alt='image' />
  </div>
<div className='clientsAndPms-heading'>
For you and your clients
</div>
<div className='clientsAndPms-subheading'>A platform that’s loved by Portfolio Managers and Clients alike</div>
{clientsAndPmsCards()}
    </div>
  )
}

const trustUs = ()=>{
  return (
    <div className='trustUs-container'>
      <div className='trustUs-heading'>
        <div>
        Why <span style={{color:'#FFD574'}}>TRUST</span>
        </div>
       
        <div>Us?</div>
        <div className='trustUs-learn-more-btn-container'>
<Button style={{backgroundColor:'#2CAE76',color:'white', padding:'5px 35px',textTransform:'none'}}>Learn More</Button>
        </div>
</div>
      <div></div>
      </div>
      )}

  return (
    <div>
      <div className="platform-stats">
        {platformStatsCards()}
      </div>
     {renderFeatures()}
     {clientsAndPms()}
     {trustUs()}
     <Footer/>
    </div>
  )
}
