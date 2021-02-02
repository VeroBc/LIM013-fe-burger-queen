import React from 'react';
import { ItemKitchen } from './itemKitchen';
import { updateStatusDelivered } from '../services/backend';
import moment from 'moment';
import 'moment/locale/es';  
import '../App.css';
moment.locale('es');

export const OrderDelivered = (props) => {

  let items =  props.orderToDeliver[props.index].items;
  let time = props.orderToDeliver[props.index].time;
  let user = props.orderToDeliver[props.index].user;
  console.log(user);
    
  const update = () => {
    const newStatus = {status: 'delivered'};
    updateStatusDelivered(props.data.id, newStatus)
  }

  return (
    <div className='orderKitchen'>
      <p className='orderTime'>Pedido: <span style={styles.block}>{moment(time).fromNow()}</span></p>
      <p className='orderWaiter'>Atendido por: <span style={styles.block}>{user.name}</span></p>
      <div className='listKitchen'>
        {items.map((items, index) => <ItemKitchen key = {'ik'+ index} data = {items} index ={index}/>)}
      </div>
      <div>
        <button className ='stateButton' onClick={ update }>Servir pedido</button>
      </div>  
    </div>
  )
}

let styles = {
  block: {
    color: 'rgb(165, 24, 24)',
  },
}