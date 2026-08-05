
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
import Categories from './components/Categories/Categories';
import React from 'react';
import {useState} from 'react';


function App() {

  const [cartCount,setCartcount]=useState(0);

  function addToCart(){
  setCartcount(cartCount + 1);
  };



  return (
    <div className="App">

      <Navbar cartCount={cartCount} />
    <Hero/>
    <FeaturedProducts addToCart={addToCart} />
    <Categories/>
    </div>
  );
}

export default App;
