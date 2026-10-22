import React from 'react'
import "./Hero.css"
import electronicsImage from "../../assets/images/electronics.jpg";
import electronicsVideo from "../../assets/Videos/electronics.mp4";
function Hero() {
  return (
    <section className='hero' id='home'>
 <video autoPlay loop muted playsInline className="hero-video">
        <source src={electronicsVideo} type="video/mp4" />
        {/* Add a fallback text for unsupported browsers */}
        Your browser does not support the video tag.
      </video>

      <div className='hero-content'> 
      <h1>Welcome to ArN Home Electronics Store</h1>
       

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
