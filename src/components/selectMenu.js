import React, { useState, useEffect } from 'react';
import { Menu } from './menu';
import { Delivered } from './delivered';
import { subscribeDelivery } from '../services/backend'; 
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faHamburger } from '@fortawesome/free-solid-svg-icons'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import { faGlassWhiskey } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'

export const SelectMenu = (props) => {

  const [currentMenu, setCurrentMenu] = useState('almuerzo y cena');
  const [menuView, setMenuView] = useState('orderView');
  const [deliveryList, setDeliveryList] = useState([]);

  const selectMenuView = () => 
  setMenuView( menuView === 'deliveredView' ? 'orderView' : 'deliveredView');

  useEffect(() => subscribeDelivery(setDeliveryList), []) 
 
  return (
    <div>
      <section >
        <div className='subheader'>
          <h1 className='filters'>
            <FontAwesomeIcon className ='icon' onClick={()=> setCurrentMenu('desayuno')} icon={faCoffee} />
            <FontAwesomeIcon className ='icon' onClick={()=> setCurrentMenu('almuerzo y cena')} icon={faUtensils} />
            <FontAwesomeIcon className ='icon' onClick={()=> setCurrentMenu('hamburguesas')} icon={faHamburger} />
            <FontAwesomeIcon className ='icon' onClick={()=> setCurrentMenu('bebidas')} icon={faGlassWhiskey} />
          </h1>
          <h1 className='notifications' onClick={selectMenuView}>{ menuView === 'deliveredView' ? <div><FontAwesomeIcon className ='icon' icon={faBell}/></div> : <div><FontAwesomeIcon className ='icon' icon={faBell}/> <div className ='quantity'>{deliveryList.length}</div> </div>}</h1>
        </div>
        <div>
        { menuView === 'orderView' &&
          <Menu menuType={currentMenu} addOrder ={props.addOrder}/>
        }

        { menuView === 'deliveredView' &&
          <Delivered orderToDeliver={deliveryList}/>
        }
          
        </div>
      </section>
    </div>
  );
}



// const buttonArray = [
//   {
//       id: 1,
//       title: 'desayuno',
//       isDefault: true,
//   },
//   {
//       id: 2,
//       title: 'almuerzo y cena',
//       isDefault: false,
//   }
// ];
// const [defaultBtn] = buttonArray.some(buttonMenu => buttonMenu.isDefault === true);
// const [activeButton, setActiveButton] = useState(defaultBtn ? defaultBtn.title : null);

// const handleButtonClick = e => {
//   console.log(e.currentTarget.value);
//  };

// <div>
// {buttonArray.map((item, index ) => (
//     <Button
//         key = {'b'+ index}
//         data = {item}
//         variant = "dark mt-3 mr-3 "
//         className = {item.title === currentMenu ? 'is_active' : ''}// Compare the button's id to what we have in state to determine which should be active
//         size = "sm"
//         name = {item.title}
//         value = {item.title} // Set the value of the button as the button's id
//         seleccionar = {handleButtonClick}
//     />
// ))}
// </div>