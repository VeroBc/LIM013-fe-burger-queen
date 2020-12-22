import { db } from '../firebase' ;
import React, { useState, useEffect } from 'react';
import { Item } from './item' ;
import { Order } from './order' ;

export const Menu = (props) => {

  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState([]);

  const selectItem = (item) => {
    setOrder([...order, item]);

  }

  const deleteItem = (index) => {
    let tempArray = [...order];
    tempArray.splice(index,1);
    setOrder(tempArray);
  }

  useEffect(() => {
        db.collection('items').where("menu", "==",  props.menuType).get()
        .then((querySnapshot) => {
          let menuArray =[];
          querySnapshot.forEach(doc => menuArray.push(doc.data()));
          setMenu(menuArray);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
  }, [props.menuType]);

  return (
    <div style={styles.container}>

      <div style={styles.block}>
        {menu.map((item, index) => 
          <Item key = {'m'+index} data = {item} seleccionar={selectItem}/>)}
      </div>

      <div style={styles.block}>
        {order.map((item, index) => 
          <Item key = {'o'+index} data = {item} borrar={()=> deleteItem(index)}/>)}
          <Order order={order}/>
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
    alignItems: 'flex-start',
  },
  block: {
    display: 'inline-block',
    border: 1,
    borderStyle: 'solid',
    padding: 10,
    margin: 10
  },
}
