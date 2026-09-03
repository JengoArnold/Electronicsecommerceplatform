import React from 'react'
import "./Hero.css"
import electronicsImage from "../../assets/images/electronics.jpg";

function Hero() {
  return (
    <section className='hero'>
      <div className='hero-content'> 
      <h1>Welcome to Arnold Electronics Store</h1>
       

      <p>
        Discover quality electronics, accessories, and gadgets at affordable prices.
      </p>

     <button>View products</button>
 <button>Explore Deals</button>
  </div>

<div className='hero-image'>
<img src={electronicsImage} alt="product" />
 </div>


    </section>
  )
}
export default Hero;
