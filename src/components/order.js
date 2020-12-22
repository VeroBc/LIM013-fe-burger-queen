import React from 'react';

export const Order = (props) => {

  let total = 0;
  for(let i =0; i < props.order.length; i++)
    total += parseInt(props.order[i].price, 10);

  return (
    <div>
      <div>Total S/. {total}:</div>
      <button>Tomar orden</button>
    </div>
  )
} 
