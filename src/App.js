import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
import Categories from './components/Categories/Categories';
import Cart from "./components/Cart/Cart";
import React from 'react';
import { useState } from 'react';
import ProductDetails from './components/ProductDetails/ProductDetails';


function App() {

    const [cartCount, setCartcount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const[selectedProduct,setSelectectedProduct]=useState(null);


    function addToCart(product) {

        const existingProduct = cartItems.find(
            item => item.id === product.id
        );

        if (existingProduct) {
            console.log("Product already exists");
        } else {

            setCartItems([
                ...cartItems,
                {
                    ...product,
                    quantity: 1
                }
            ]);
        }

        setCartcount(cartCount + 1);
    }


function selectProduct(product){
    setSelectectedProduct(product)
};




    // REMOVE PRODUCT
    function removeFromCart(productId) {

        const updatedCart = cartItems.filter(
            item => item.id !== productId
        );

        setCartItems(updatedCart);
    }

    // INCREASE QUANTITY
    function increaseQuantity(productId) {
        const updatedCart = cartItems.map((item) => {
            if (item.id === productId) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                };
            } else {
                return item;
            }
        });
        setCartItems(updatedCart);
    }


    // DECREASE QUANTITY
    function decreaseQuantity(productId) {

        const updatedCart = cartItems.map((item) => {

            if (item.id === productId) {

                return {
                    ...item,
                    quantity: item.quantity > 1
                        ? item.quantity - 1
                        : 1
                };

            } else {

                return item;
            }

        });

        setCartItems(updatedCart);
    }


    return (
        <div className="App">

            <Navbar cartCount={cartCount} />

            <Hero />

            <FeaturedProducts
                addToCart={addToCart}
                selectProduct={selectProduct}
            />

            <Categories />

            <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
            />

        </div>
    );
}


export default App;