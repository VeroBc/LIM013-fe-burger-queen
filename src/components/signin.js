import React, { useState } from 'react';
import '../App.css';
import { signinUser } from '../services/auth';
import {AuthPage} from '../services/authPage';
import logo from '../img/logobqcolor.png';

export const Signin = () => {

  const [stateSignin, setStateSignin] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (event) => {
    setStateSignin((prevProps) => ({
      ...prevProps,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(stateSignin);
    console.log(stateSignin.email, stateSignin.password);
    signinUser(stateSignin.email, stateSignin.password);
  };

  return(
    <div>
      <form onSubmit={handleSubmit} action="/" method="POST" className="signUpForm">
        <img src={logo} className='imglogoForm' alt="Logo"/>
        <label className="motto">Si tienes una cuenta, inicia sesión</label>
        <div>
            <input 
              type="text"
              name="email" 
              placeholder="Correo electrónico" 
              value={stateSignin.email} 
              className="inputButton" 
              onChange={handleInputChange}
              required ></input>
            <input 
              type="password"
              name="password"
              placeholder="Contraseña"
              value={stateSignin.password}
              onChange={handleInputChange}
              className="inputButton" 
              required></input>
            <div id= "errorMessage"></div>
        </div>
        <button type="submit" className="signUpButton">Inicia sesión</button>
        <div>
          <p className="motto">O continuar con:</p>
          <AuthPage/>
        </div>
        <p className="motto">¿No tienes una cuenta?<a href="/signup" className="login" style={styles.color}>Regístrate</a></p>
      </form>
    </div>
  )
}

let styles = {
  color: {
    color: '#173083',
  },
}
