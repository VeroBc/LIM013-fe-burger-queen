import React from 'react';
import { OrderDelivered } from './orderDelivered';
import '../App.css';

export const Delivered = (props) => {
  return (
      <div className='kitchen'>
        {props.orderToDeliver.map((items, index) => 
          <OrderDelivered key = {'ok'+index} data = {items} index = {index} orderToDeliver={props.orderToDeliver} />)}
      </div>
  )
}