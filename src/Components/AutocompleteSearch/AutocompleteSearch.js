import {useState} from 'react'
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { instruments } from './instrumentsData';
import './autocompleteSearch.css';

const transaction_types = {
  BUY: 'BUY',
  SELL: 'SELL'
}

const segments={
  INDICES:'INDICES',
  NSE:'NSE',
  BSE:'BSE',
  NFO:'NFO',
}
const Label = styled('label')({
  display: 'block',
});

const Input = styled('input')(({ theme }) => ({
  width: 350,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.getContrastText(theme.palette.background.paper),
  borderTop:'none',
  borderLeft:'none',
  borderRight:'none',
  borderBottom: '1px solid rgba(0,0,0,.25)',
  outline:'none'
}));

const Listbox = styled('ul')(({ theme }) => ({
  width: 350,
  marginTop: 20,
  padding: 0,
  zIndex: 1,
  position: 'absolute',
  listStyle: 'none',
  backgroundColor: theme.palette.background.paper,
  overflow: 'auto',
  maxHeight: 800,
  border: '1px solid rgba(0,0,0,.25)',
  [`& li.${autocompleteClasses.focused}`]: {
    backgroundColor: '#4a8df6',
    color: 'white',
    cursor: 'pointer',
  },
  '& li:active': {
    backgroundColor: '#2977f5',
    color: 'white',
  },
}));

export default function AutocompleteSearch(props) {

   const { showModal,addToWatchlist} = props

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: instruments,
    getOptionLabel: (option) =>{
    
        return option.tradingsymbol
    },
    onChange: (event, value) => {
        console.log(event,value)
      },
      
  });

  const openOption=(option, transaction_type) => {
    option.transaction_type = transaction_type
    showModal(option)
  }




  return (
    <div className='autocomplete-container'>
      <div {...getRootProps()}>
        {/* <Label {...getInputLabelProps()}>useAutocomplete</Label> */}
        <Input  {...getInputProps()} />
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox  {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li   {...getOptionProps({ option, index })}>
                <div className='list-item'>
                    <div className='item-symbol'> {option.tradingsymbol}</div>
                    
               
               {/* <ItemDetails className='trial' option={option} /> */}
               <div>
               <div 
 className='item-details'>
    <div className='item-name'>{option.name}</div>
    <div className='item-exchange'>{option.exchange}</div>
</div>
<div className='action-buttons'>
                    {option.segment!==segments.INDICES&&<button className='small-action-button' onClick={()=>openOption(option,transaction_types.BUY)}>B</button>}
                    {option.segment!==segments.INDICES&&<button className='small-action-button sell-button-color' onClick={()=>openOption(option, transaction_types.SELL)}>S</button>}
                    {<button className='small-action-button add-to-watchlist-button' onClick={()=>addToWatchlist(option)}>+</button>}
                </div>
                </div>
                </div>

            </li>
          ))}
        </Listbox>
      ) : null}
    </div>
  );
}
