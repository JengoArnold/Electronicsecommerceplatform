import "./Cart.css";
import React from "react";

function Cart({cartItems }) {
  const total =cartItems.reduce((sum,item)=>{
return sum +(item.price *item.quantity);
  },0);

  return (
    <div>
 <section className="cart">
<h2>Shopping Cart</h2>
{
    cartItems.map((item)=>(
<div key={item.id} className="cart-item">
<h3>{item.name}</h3>
<p>${item.price}</p>
<p>Quantity: {item.quantity}</p>
<div className="cart-total">
<p>Total:${total}</p>
</div>

</div>
    ))
}
      </section>
    </div>
  )
}

export default Cart
