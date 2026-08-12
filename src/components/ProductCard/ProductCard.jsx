import "./ProductCard.css";

import React from 'react'

function ProductCard({name ,price,rating,product,Image,addToCart}) {       
    // props desturturing 
  return (
    <div className="ProductCard">
      <img src={Image} alt="name"/>

      <h1>{name}</h1>
      <p>⭐{rating}</p>
      <p>${price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  )
}

export default ProductCard
