import React from 'react';
import { OrderKitchen } from './orderKitchen';
import '../App.css';

export const Kitchen = (props) => {
  return (
      <div className='kitchen'>
        {props.orderToKitchen.map((items, index) => 
          <OrderKitchen key = {'ok'+index} data = {items} index = {index} orderToKitchen={props.orderToKitchen} />)}
      </div>
  )
}