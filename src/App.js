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
import Footer from "./components/Footer/Footer";

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [productSearchTerm, setProductSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(
        Boolean(sessionStorage.getItem("token"))
    );
    const [showRegister, setShowRegister] = useState(false);

    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    function addToCart(product) {
        setCartItems(previousItems => {
            const existingProduct = previousItems.find(item => item.id === product.id);

            if (existingProduct) {
                return previousItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...previousItems, { ...product, quantity: 1 }];
        });
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
                <Footer />
            </div>
        );
    }

    return (
        <div className="App">
            <Navbar
                cartCount={cartCount}
                searchTerm={productSearchTerm}
                onSearchChange={setProductSearchTerm}
            />

            <Routes>
                {/* HOME ROUTE */}
                <Route
                    path="/"
                    element={
                        <>
                            <Hero />
                            <div className="page-background">
                                <FeaturedProducts
                                    addToCart={addToCart}
                                    selectProduct={selectProduct}
                                    searchTerm={productSearchTerm}
                                    onSearchChange={setProductSearchTerm}
                                />

                                {selectedProduct && (
                                    <ProductDetails
                                        product={selectedProduct}
                                        addToCart={addToCart}
                                        closeDetails={closeDetails}
                                    />
                                )}

                                <Categories />
                            </div>
                        </>
                    }
                />

                {/* SHOP ROUTE */}
                <Route
                    path="/shop"
                    element={
                        <div className="page-background shop-page">
                            <h1>Shop All Products</h1>
                            <FeaturedProducts
                                addToCart={addToCart}
                                selectProduct={selectProduct}
                                searchTerm={productSearchTerm}
                                onSearchChange={setProductSearchTerm}
                            />
                        </div>
                    }
                />

                {/* CART ROUTE */}
                <Route
                    path="/cart"
                    element={
                        <div className="page-background">
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
                    element={
                        <div className="page-background">
                            <Checkout cartItems={cartItems} />
                        </div>
                    }
                />

                {/* CONTACT ROUTE */}
                <Route
                    path="/contact"
                    element={
                        <div className="page-background">
                            <Contact />
                        </div>
                    }
                />

                {/* 404 CATCH-ALL ROUTE */}
                <Route
                    path="*"
                    element={
                        <div className="page-background">
                            <h2 style={{ textAlign: "center", padding: "50px" }}>Page not found</h2>
                        </div>
                    }
                />
            </Routes>
            <Footer />
            <ChatBot />
        </div>
    );
}

export default App;