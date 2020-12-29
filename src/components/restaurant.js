import React, { useState } from 'react';
import { SelectMenu } from './selectMenu';
import { Kitchen } from './kitchen';
import '../App.css';

export const Restaurant = () => {

  const [view, setView] = useState('menu');
  const [orderList, setOrderList] = useState([]);

  const addOrder = order =>  {
    // console.log(order);
    setOrderList([...orderList, {items: order, time: new Date()}]);
  }

  let registeredOrdersView = orderList.map((order, index) => {
    let msg =  `nrodeOrden = ${index}, nrodeItems = ${order.items.length}, hora = ${order.time}`;
    return <p key = {'m'+index}>{msg}</p>
  })

  return (
    <div>
      <div className ='Buttons'>
          <button className ='button' onClick={()=> setView('menu')}>Menu</button>
          <button className ='button' onClick={()=> setView('kitchen')}>Kitchen</button>
      </div>
      <SelectMenu view={view} addOrder={addOrder} />
      {/* <Kitchen orderToKitchen={orderList}/> */}

      <div className='orderList'>
        {orderList.map((order, index) => 
      <Kitchen key = {'k'+index} data = {order} orderToKitchen={orderList}/>)}
      </div>

    </div>
  )
}
