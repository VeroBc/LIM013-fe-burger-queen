import React, { useState, useEffect, useContext } from 'react';
import { Item } from './item';
import { Order } from './order';
import { subscribeMenu, subscribeMenuHamb, getCurrentUser, saveOrder} from '../services/backend';
import '../App.css';
import {UserContext} from './userContext';

export const Menu = (props) => {

  const [menu, setMenu] = useState([]);
  const [menuCategory, setMenuCategory] = useState([]);
  const [order, setOrder] = useState([]);
  const [username, setUsername]= useState(null);
  
  const currentUser = useContext(UserContext);

  const getUserData = (dataUser) => {
    getCurrentUser(dataUser).then((userData) => {
      return setUsername(userData);
    });
  }
    
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

  const tomarPedido = () => {
    const newOrder = {items: order, time: new Date().toLocaleString(), status: 'pending', userRef: username};
    props.addOrder(newOrder); 
    saveOrder(newOrder)
    setOrder([]);
  }

  useEffect(() => getUserData(currentUser), [currentUser])
  useEffect(() => subscribeMenu(setMenu, props.menuType), [props.menuType]) 
  useEffect(() => subscribeMenuHamb(setMenuCategory, props.menuType), [props.menuType])

  return (
    <div className ='Menu' style={styles.container}>
      
      <div className='productsList' style={styles.block}>
        {menu.map((item, index) => 
          <Item key = {'m'+index} data = {item} seleccionar={selectItem}/>)}
      </div>
      <div className='productsList' style={styles.block}>
        {menuCategory.map((item, index) => 
          <Item key = {'c'+index} data = {item} seleccionar={selectItem}/>)}
      </div>
      
      <div className='orderList' style={styles.block}>
        <div><label className='atention'>Atiende:</label>{username && <p className='atentionName'>{username.name}</p>}</div>
        <div><label className='atention'>Mesa:</label>{username && <p className='atentionName'>{username.tables[0]}</p>}</div>
 
{/*         
        <div className='table'>
          <select className="customselect">
            {(Object.values(username.tables)).map((tables, key) => <option value={key}>Mesa: {tables} </option>)}
          </select>
        </div> */}

        {order.map((item, index) => 
          <Order key = {'o'+index} data = {item} borrar={()=> deleteItem(index)}/>)}

        <div className='totalPrice'>
          <div className='total'>Total</div>
          <div className='amount'>S/. {(order.reduce((ant, item) => ant + item.price, 0)).toFixed(2)}</div>
          <button className ='buttonOrder' onClick={ tomarPedido }>Tomar pedido</button>
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
    // border: 1,
    borderStyle: 'groove',
    // paddingTop: 10,
    // margin: 10
  },
}




  // const [waiters, setWaiters] = useState([]);
  // const [selectedWaiter, setSelectedWaiter] = useState([]); 
  // const [tables, setTables] = useState([]);

  // const selectWaiter = (event) => {
  //   const isSelectedWaiter = (element) => element.name === event.target.value;
  //   setSelectedWaiter(waiters[parseInt(waiters.findIndex(isSelectedWaiter))]); 
  //   console.log(waiters[parseInt(event.target.value)])
  //   console.log(waiters[parseInt(waiters.findIndex(isSelectedWaiter))]);
  // }

  // const [selectedTable, setSelectedTable] = useState([]);

  // const handleTableTypeChange = (e) => {
  //   const {name, value} = (tables[e.target.value]);
  //   console.log(({ ...selectedTable, [name]: value}))
  //   setSelectedTable({...selectedTable, [name]: value});
  // }
  // onChange={e => handleTableTypeChange(e)}
          /* <div className='table'> Mesero:
          <select
            onChange={selectWaiter}
            value={selectedWaiter}
            className='customselect'
          >
            {waiters.map((waiter, index) => <option key = {'w'+index} data = {waiter} value={waiter.name}>{waiter.name}</option>)}
          </select >
        </div> */
        /* <div className='table'>
          <select
            className="customselect"
          >
            {assigned.map((tables, key) => <option value={key}>Mesa: {tables} </option>)}
          </select >
        </div> */
// useEffect(() => setTables(assigned), [assigned])
// useEffect(() => subscribeWaiters(setWaiters), [])
// useEffect(() => subscribeTables(setTables, waiters.name), [waiters.name])
// useEffect(() => subscribeGetCurrentUser(setUsername), []) 