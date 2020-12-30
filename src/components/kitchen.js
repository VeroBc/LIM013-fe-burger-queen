import React from 'react';
import { OrderKitchen } from './orderKitchen';
import '../App.css';

export const Kitchen = (props) => {

  let items =  props.orderToKitchen[props.index].items;

  return (
    <div className='orderKitchen'>
      {items.map((items, index) => 
        <OrderKitchen key = {'k'+ index} data = {items} index ={index}/>)}
      <div>
        <button className ='button'>Estado</button>
      </div>  
    </div>
  )
} 


// let registeredOrdersView = orderList.map((order, index) => {
//   let msg =  `nrodeOrden = ${index}, nrodeItems = ${order.items.length}, hora = ${order.time}`;
//   return <p key = {'m'+index}>{msg}</p>
// })
