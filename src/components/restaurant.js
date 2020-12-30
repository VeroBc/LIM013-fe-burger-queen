import React, { useState } from 'react';
import { SelectMenu } from './selectMenu';
import { Kitchen } from './kitchen';
import '../App.css';

export const Restaurant = () => {

  const [view, setView] = useState('menu');
  const [orderList, setOrderList] = useState([]);

  const addOrder = order =>  {
    setOrderList([...orderList, {items: order, time: new Date()}]);
  }

  return (
    <div>
      <div className ='Buttons'>
          <button className ='button' onClick={()=> setView('menu')}>Menu</button>
          <button className ='button' onClick={()=> setView('kitchen')}>Kitchen</button>
      </div>
      <SelectMenu view={view} addOrder={addOrder} />
     
      <div className='kitchen'>
        {orderList.map((order, index) => 
      <Kitchen key = {'k'+index} data = {order} index = {index} orderToKitchen={orderList}/>)}
      </div>

    </div>
  )
}
