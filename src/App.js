
import "./App.css";
import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
import Categories from "./components/Categories/Categories";
import Cart from "./components/Cart/Cart";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Register from "./components/Register";


function App() {
const Navigate = useNavigate();
    
    const [cartCount, setCartcount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const[selectedProduct, setSelectedProduct]= useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(
        Boolean(sessionStorage.getItem("token"))
    );
    const [showRegister, setShowRegister] = useState(false);


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
    setSelectedProduct(product)
};
const closeDetails =()=>{
    setSelectedProduct(null);
};



if (!isLoggedIn) {
    return (
        <div className="App">
            <main className="login-page">
                {showRegister ? (
                    <Register onBackToLogin={() => setShowRegister(false)} />
                ) : (
                    <Login
                        onLoginSuccess={() => setIsLoggedIn(true)}
                        onShowRegister={() => setShowRegister(true)}
                    />
                )}
            </main>
        </div>
    );
}

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

        <Routes>
            {/* Home route — only the home-page content */}
            <Route
                path="/"
                element={
                    <>
                        <Hero />
                        <FeaturedProducts
                            addToCart={addToCart}
                            selectProduct={selectProduct}
                        />

                        {selectedProduct && (
                            <ProductDetails
                                product={selectedProduct}
                                addToCart={addToCart}
                                closeDetails={closeDetails}
                            />
                        )}

                        <Categories />

                        <Cart
                            cartItems={cartItems}
                            removeFromCart={removeFromCart}
                            increaseQuantity={increaseQuantity}
                            decreaseQuantity={decreaseQuantity}
                        />
                    </>
                }
            />

            {/* Sibling routes — direct children of <Routes> */}
            <Route
                path="/checkout"
                element={<Checkout cartItems={cartItems} />}
            />

            <Route path="*" element={<h2>Page not found</h2>} />
        </Routes>
    </div>
);
}


export default App;