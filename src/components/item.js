import React from 'react';
import '../App.css';

export const Item = (props) => {

  return (
    <ul 
      style={styles.container}
      className='unorderList'
      onClick={ ()=>(props.seleccionar && props.seleccionar(props.data))}
      >
      <div  className='description' style={styles.description}>{props.data.description}</div>
      <div  className='price' style={styles.price}>S/. {props.data.price}</div>
      <img src={props.data.photo} className='photoProduct' alt="Camera"></img>
    </ul>
  )
} 

let styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  description: {
    display: 'inline-block'
  },
  price: {
    display: 'inline-block',
    // marginLeft: 10
  }
}
