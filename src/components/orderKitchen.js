import React from 'react';
import { ItemKitchen } from './itemKitchen';
import { updateStatus } from '../services/backend';
import moment from 'moment';
import 'moment/locale/es';  
import '../App.css';
moment.locale('es');

export const OrderKitchen = (props) => {

  let items =  props.orderToKitchen[props.index].items;
  let time = props.orderToKitchen[props.index].time;
  let user = props.orderToKitchen[props.index].user;
  console.log(user);
    
  const update = () => {
    const newStatus = {endtime: new Date().toLocaleString(), status: 'done', wait: moment(time).fromNow()};
    updateStatus(props.data.id, newStatus)
  }

  return (
    <div className='orderKitchen'>
      <p className='orderTime'>Pedido: <span style={styles.block}>{moment(time).fromNow()}</span></p>
      <p className='orderWaiter'>Atendido por: <span style={styles.block}>{user.name}</span></p>
      <div className='listKitchen'>
        {items.map((items, index) => <ItemKitchen key = {'ik'+ index} data = {items} index ={index}/>)}
      </div>
      <div>
        <button className ='stateButton' onClick={ update }>Entregar pedido</button>
      </div>  
    </div>
  )
}

let styles = {
  block: {
    color: 'rgb(165, 24, 24)',
  },
}


// let registeredOrdersView = orderList.map((order, index) => {
//   let msg =  `nrodeOrden = ${index}, nrodeItems = ${order.items.length}, hora = ${order.time}`;
//   return <p key = {'m'+index}>{msg}</p>
// })