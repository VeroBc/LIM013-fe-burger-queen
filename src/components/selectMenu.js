
import React, { useState } from 'react';
import { Menu } from './menu';

export const SelectMenu = () => {

  const [currentMenu, setCurrentMenu] = useState('almuerzo y cena');

  return (
    <div className="App">
      <header className="App-header">
        <p>Estamos probando la lista de productos!!</p>
        <button onClick={()=> setCurrentMenu('desayuno')}>Desayuno</button>
        <button onClick={()=> setCurrentMenu('almuerzo y cena')}>Almuerzo y Cena</button>
        <Menu menuType={currentMenu}/>
      </header>
    </div>
  );
}
