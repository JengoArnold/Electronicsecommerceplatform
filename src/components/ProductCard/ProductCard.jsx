import "./ProductCard.css";

import React from 'react'

function ProductCard({name ,price,rating,product,Image,addToCart,  selectProduct   }) {       
    // props desturturing 
  return (
    <div className="ProductCard">
      <img src={Image} alt={name}/>

      <h1>{name}</h1>
      <p>⭐{rating}</p>
      <p>${price}</p>
    
         <button onClick={() => addToCart(product)}>Add to Cart</button>
<button1 onClick={() => selectProduct(product)}>
    View Details
</button1>  
  
     

    </div>
  )
}

export default ProductCard
