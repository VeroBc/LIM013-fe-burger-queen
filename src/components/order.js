import '../App.css';

export const Order = props => 
    <div className='orderedList' onClick={ ()=> props.borrar && props.borrar(props.data)}>
      <div className='orderProduct'>{props.data.description}</div>
      <div className='priceProduct'>S/. {(props.data.price).toFixed(2)}</div>
      <i className="material-icons blue600">delete_outline</i>
    </div>
