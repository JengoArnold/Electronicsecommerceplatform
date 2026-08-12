import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
import Categories from './components/Categories/Categories';
import Cart from "./components/Cart/Cart";
import React from 'react';
import {useState} from 'react';


function App() {

  const [cartCount,setCartcount]=useState(0);
  const [cartItems,setCartItems]=useState([]);

  function addToCart(product){
const existingProduct =cartItems.find(item=>item.id===product.id);

if (existingProduct){
  console.log("Product already exits");
}else{
  setCartItems([...cartItems,{...product,quantity:1}]);
}

  setCartcount(cartCount + 1);

  };
  
  return (
    <div className="App">

      <Navbar cartCount={cartCount} />
    <Hero/>
    <FeaturedProducts addToCart={addToCart} />
    <Categories/>
    <Cart cartItems={cartItems} />
    </div>
  );
}

export default App;
