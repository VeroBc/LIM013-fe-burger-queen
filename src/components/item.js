import React from 'react';

export const Item = (props) => {

  return (
    <li 
      style={styles.container}
      onClick={ ()=>
        (props.seleccionar && props.seleccionar(props.data)) || 
        (props.borrar && props.borrar(props.data))
      }
      >
      <div style={styles.description}>{props.data.description}:</div>
      <div style={styles.price}>S/. {props.data.price}</div>
    </li>
  )
} 

let styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'  
  },
  description: {
    display: 'inline-block'
  },
  price: {
    display: 'inline-block',
    marginLeft: 10
  }
}
