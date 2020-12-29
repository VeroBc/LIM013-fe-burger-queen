import { db } from '../firebase' ;
import React, { useState, useEffect } from 'react';
import { Item } from './item' ;
import { Order } from './order' ;
import '../App.css';

export const Menu = (props) => {

  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState([]);

  const selectItem = (item) => {
    setOrder([...order, item]);
    // let tempArrayOfItems = Array.from(order);         // Se crea un nuevo array con los contenidos de order
    // tempArrayOfItems.push(item);                      // Ese nuevo array recibe el push
    // setOrder(tempArrayOfItems);                       // Se guarda en el estado del componente. Como cambió el estado, 
  }

  const deleteItem = (index) => {
    let tempArray = [...order];        //Equivalente: let tempArrayOfItems = Array.from(order);
    tempArray.splice(index,1);
    setOrder(tempArray);
  }

  useEffect(() => {
    db.collection('items').where("menu", "==",  props.menuType).get()
      .then((results) => {
        let menuArray =[];
        results.forEach(doc => menuArray.push(doc.data()));
        setMenu(menuArray);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [props.menuType]);

  return (
    <div className ='Menu' style={styles.container}>

      <div className='productsList' style={styles.block}>
        {menu.map((item, index) => 
          <Item key = {'m'+index} data = {item} seleccionar={selectItem}/>)}
      </div>

      <div className='orderList' style={styles.block}>
        {order.map((item, index) => 
          <Order key = {'o'+index} data = {item} borrar={()=> deleteItem(index)}/>)}

        <div className='totalPrice'>
          <div className='total'>Total</div>
          <div className='amount'>S/. {(order.reduce((ant, item, index) => ant + item.price, 0)).toFixed(2)}</div>
          <button className ='button' onClick={() => props.addOrder(order)}>Tomar pedido</button>
        </div>
      </div>

    </div>
  )
}

// es un objeto de JS que REact va a utilizar para generar el CSS
// las propiedades string tienen que ir entre comillas, los numero sin unidad de medida
// los porcentajes van entre comillas
let styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // alignItems: 'flex-start',
  },
  block: {
    // display: 'inline-block',
    border: 1,
    borderStyle: 'solid',
    // paddingTop: 10,
    // margin: 10
  },
}
