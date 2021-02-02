import '../App.css';
import { BrowserRouter as Link } from "react-router-dom";
import logo from '../img/logobq.png';
import hamb from '../img/hamb.jpg';
import fruits from '../img/fruits.jpg';

export const Home = () => {
  return(
    <div>
      <nav className='navbar'>
        <img src={logo} className='imglogo' alt="Logo"/>
        <a href="/signup" className='signup'><Link to="/signup">Regístrate</Link></a>
        <a href="/signin" className='signin'><Link to="/signin">Inicia sesión</Link></a>
      </nav>
      <div className='homeSection'>
        <p className='desayuno'>Desayunos</p>
        <img className='imgFruits' src={fruits} alt="fruits"/>
        <p className='almuerzoYcena'>Almuerzos</p>
        <img className='imgHamb' src={hamb} alt="hamb"/>
      </div>
    </div>
  )
}
