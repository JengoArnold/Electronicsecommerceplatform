import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
import Categories from "./components/Categories/Categories";
import Cart from "./components/Cart/Cart";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Register from "./components/Register";
import Contact from "./components/Contact";
import ChatBot from "./components/ChatBot/ChatBot";

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(
        Boolean(sessionStorage.getItem("token"))
    );
    const [showRegister, setShowRegister] = useState(false);

    // Derived state: this automatically stays in sync with cartItems!
    const cartCount = cartItems.length;

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
    }

    function selectProduct(product) {
        setSelectedProduct(product);
    }

    function closeDetails() {
        setSelectedProduct(null);
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
                    quantity: item.quantity > 1 ? item.quantity - 1 : 1
                };
            } else {
                return item;
            }
        });
        setCartItems(updatedCart);
    }

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

    return (
        <div className="App">
            <Navbar cartCount={cartCount} />

            <Routes>
                {/* HOME ROUTE */}
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
                        </>
                    }
                />

                {/* SHOP ROUTE */}
                <Route
                    path="/shop"
                    element={
                        <div style={{ padding: "20px" }}>
                            <h1>Shop All Products</h1>
                            <FeaturedProducts
                                addToCart={addToCart}
                                selectProduct={selectProduct}
                            />
                        </div>
                    }
                />

                {/* CART ROUTE */}
                <Route
                    path="/cart"
                    element={
                        <div style={{ padding: "20px" }}>
                            <h1>Your Cart</h1>
                            <Cart
                                cartItems={cartItems}
                                removeFromCart={removeFromCart}
                                increaseQuantity={increaseQuantity}
                                decreaseQuantity={decreaseQuantity}
                            />
                        </div>
                    }
                />

                {/* CHECKOUT ROUTE */}
                <Route
                    path="/checkout"
                    element={<Checkout cartItems={cartItems} />}
                />

                {/* CONTACT ROUTE */}
                <Route
                    path="/contact"
                    element={<Contact />}
                />

                {/* 404 CATCH-ALL ROUTE */}
                <Route path="*" element={<h2 style={{ textAlign: "center", padding: "50px" }}>Page not found</h2>} />
            </Routes>
                   <ChatBot />
        </div>
    );
}

export default App;