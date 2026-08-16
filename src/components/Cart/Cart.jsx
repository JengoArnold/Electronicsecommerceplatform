import "./Cart.css";
import React from "react";

function Cart({cartItems,removeFromCart,   increaseQuantity,
    decreaseQuantity            }) {

  const total =cartItems.reduce((sum,item)=>{
return sum +(item.price *item.quantity);
  },0);

  return (
    <div>
      <h2>Shopping Cart</h2>
 <section className="cart">

{
    cartItems.map((item)=>(
<div key={item.id} className="cart-item">
<h3>{item.name}</h3>
<p>${item.price}</p>
<div className="quantity-controls">

    <button onClick={() => decreaseQuantity(item.id)}>
        -
    </button>

    <span>Quantity: {item.quantity}</span>

    <button onClick={() => increaseQuantity(item.id)}>
        +
    </button>

</div>
<div className="cart-total">

<button onClick={()=>removeFromCart(item.id)}  className="remove-button">Remove</button>
</div>

</div>
    ))
}
<div className="total-cart">
  <p>Total:${total}</p>
</div>
      </section>
    </div>
  )
}

export default Cart
