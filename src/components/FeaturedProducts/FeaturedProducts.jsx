import "./FeaturedProducts.css";
import ProductCard from "../ProductCard/ProductCard";
import desk from "../../assets/images/desk.jpg";
import fridges from "../../assets/images/fridges.jpg";
import gamingPC from "../../assets/images/gamingPC.jpg";
import iphones from "../../assets/images/iphones.jpg";


import React from 'react'

function FeaturedProducts({addToCart}) {
    const Products=[
        { 
        id:1,
        name:"Gaming laptops",
        price:200,
        rating:4.5,
        Image:gamingPC,
        },
         { 
        id:2,
        name:"iphones",
        price:200,
        rating:4.0,
        Image:iphones
        },
        
 { 
        id:3,
        name:"DeskTops",
        price:200,
        rating:4.2,
        Image:desk,
        },
 { 
        id:4,
        name:"Fridges",
        price:200,
        rating:4.5,
        Image:fridges
        },
    ]



  return (
    <div className="Featured-Products">
      <h2>FeaturedProducts </h2>
     <div className="Product-grid">
{
Products.map((item)=>(

    <ProductCard 
    key={item.id}
    name={item.name}
    price={item.price}
    rating={item.rating}
    Image={item.Image}
    addToCart={addToCart}
    product={item}
    />

))
}

     </div>
        
      </div>
    
  );
}

export default FeaturedProducts
