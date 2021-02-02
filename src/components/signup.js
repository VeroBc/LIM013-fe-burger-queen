import React, { useState } from 'react';
import '../App.css';
import { createUser } from '../services/auth';
import {AuthPage} from '../services/authPage';
import logo from '../img/logobqcolor.png';

export const Signup = () => {

  const [stateSignup, setStateSignup] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (event) => {
    setStateSignup((prevProps) => ({
      ...prevProps,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(stateSignup);
    console.log(stateSignup.email, stateSignup.password);
    createUser(stateSignup.email, stateSignup.password);
  };

  return(
    <div>
      <form onSubmit={handleSubmit} action="/" method="POST" className="signUpForm">
        <img src={logo} className='imglogoForm' alt="Logo"/>
        <label className="motto">Formulario de registro de personal</label>
        <div>
            <input 
              type="text"
              name="email" 
              placeholder="Correo electrónico" 
              value={stateSignup.email} 
              className="inputButton" 
              onChange={handleInputChange}
              required ></input>
            <input 
              type="password"
              name="password"
              placeholder="Contraseña"
              value={stateSignup.password}
              onChange={handleInputChange}
              className="inputButton" 
              required></input>
            <div id= "errorMessage"></div>
        </div>
        <button type="submit" className="signUpButton">Regístrate</button>
        <div>
          <p className="motto">O continuar con:</p>
          <AuthPage/>
        </div>
        <p className="motto">¿Tienes una cuenta?<a href="/signin" className="login" style={styles.color}>Inicia sesión</a></p>
      </form>
    </div>
  )
}

let styles = {
  color: {
    color: '#173083',
  },
}



