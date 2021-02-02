import React, { useState, useEffect } from 'react';
import { SelectMenu } from './selectMenu';
import { Kitchen } from './kitchen';
import { subscribeOrder } from '../services/backend';
// import {UserContext} from './userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { signOut } from '../services/auth';
import logo from '../img/logobq.png'
// import imgDefault from '../img/userDefault.png';
import '../App.css';

export const Restaurant = () => {

  const [actualView, setActualView] = useState('menuView');
  const [orderList, setOrderList] = useState([]);

  // const currentUser = useContext(UserContext);

  const addOrder = () =>  {
    setOrderList(orderList);
  }

  const selectActualView = () => 
    setActualView( actualView === 'menuView' ? 'kitchenView' : 'menuView');

  useEffect(() => subscribeOrder(setOrderList), []) 

  return (
    <div>
      <div className='header'>
        <img src={logo} className='imglogo' alt="Logo"/>
        {/* <div >{currentUser && <p className='currentuser'>{currentUser.displayName}</p>}</div> */}
       
        <FontAwesomeIcon className='signOutIcon' onClick={()=> signOut()} icon={faSignOutAlt} />
        <div className='changeview' onClick={selectActualView}> { actualView === 'menuView' ? 'Ir a Cocina' : 'Ir a Menu'}</div>
    </div>

      { actualView === 'menuView' &&
        <SelectMenu addOrder={addOrder} />
      }

      { actualView === 'kitchenView' &&
        <Kitchen orderToKitchen={orderList} />
      }

    </div>
  )
}


