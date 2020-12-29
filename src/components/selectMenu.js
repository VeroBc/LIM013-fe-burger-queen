
import React, { useState } from 'react';
import { Menu } from './menu';
import '../App.css';
// import { Button } from './button';

export const SelectMenu = (props) => {

  const [currentMenu, setCurrentMenu] = useState('almuerzo y cena');

  return (
    <div className ='Order-view'>
      <section>
        <div className ='Buttons'>
          <button className ='button' onClick={()=> setCurrentMenu('desayuno')}>Desayuno</button>
          <button className ='button' onClick={()=> setCurrentMenu('almuerzo y cena')}>Almuerzo y Cena</button>
        </div>
        <div>
          <Menu menuType={currentMenu} addOrder ={props.addOrder}/>
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