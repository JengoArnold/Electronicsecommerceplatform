import React, { useState } from 'react';
import "./Checkout.css";

function Checkout({ cartItems }) {
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (
            !customerName.trim() ||
            !customerEmail.trim() ||
            !customerPhone.trim() ||
            !customerAddress.trim()
        ) {
            setError("Please fill in the fields.");
            return;
        }

        if (cartItems.length === 0) {
            setError("Add an item to your cart before checking out.");
            return;
        }
        setSuccess("Checkout Details Validated successfully");
    }

    return (
        <form className="checkout" onSubmit={handleSubmit}>
            <header className="checkout-header">
                <p className="checkout-eyebrow">Almost yours</p>
                <h2 id="checkout-title">Checkout</h2>
                <p>Enter your contact and delivery details to continue.</p>
            </header>

            <div className="checkout-layout">
                <section className="checkout-details" aria-labelledby="details-title">
                    <h3 id="details-title">Contact &amp; delivery</h3>
                    <div className="checkout-fields">
                        <label htmlFor="customer-name">
                            Full name
                            <input
                                id="customer-name"
                                type="text"
                                autoComplete="name"
                                placeholder="e.g. Alex Morgan"
                                value={customerName}
                                onChange={(event) => setCustomerName(event.target.value)}
                                required
                            />
                        </label>
                        <label htmlFor="customer-email">
                            Email address
                            <input
                                id="customer-email"
                                type="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                value={customerEmail}
                                onChange={(event) => setCustomerEmail(event.target.value)}
                                required
                            />
                        </label>
                        <label htmlFor="customer-phone">
                            Phone number
                            <input
                                id="customer-phone"
                                type="tel"
                                autoComplete="tel"
                                placeholder="Your phone number"
                                value={customerPhone}
                                onChange={(event) => setCustomerPhone(event.target.value)}
                                required
                            />
                        </label>
                        <label htmlFor="customer-address">
                            Delivery address
                            <input
                                id="customer-address"
                                type="text"
                                autoComplete="street-address"
                                placeholder="Street, city, and postal code"
                                value={customerAddress}
                                onChange={(event) => setCustomerAddress(event.target.value)}
                                required
                            />
                        </label>
                    </div>

                    {error && <p className="checkout-message checkout-error" role="alert">{error}</p>}
                    {success && <p className="checkout-message checkout-success" role="status">{success}</p>}
                    <button className="checkout-submit" type="submit" disabled={cartItems.length === 0}>
                        {cartItems.length === 0 ? "Your cart is empty" : "Continue to order review"}
                        {cartItems.length > 0 && <span aria-hidden="true">→</span>}
                    </button>
                    <p className="checkout-note">Your details are only used to prepare this order.</p>
                </section>

                <aside className="checkout-summary" aria-labelledby="summary-title">
                    <div className="checkout-summary-heading">
                        <h3 id="summary-title">Order summary</h3>
                        <span>{cartItems.length} {cartItems.length === 1 ? "item" : "items"}</span>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="checkout-empty">
                            <span aria-hidden="true">Bag</span>
                            <p>Your cart is waiting for something good.</p>
                        </div>
                    ) : (
                        <ul className="checkout-items">
                            {cartItems.map((item) => (
                                <li className="checkout-item" key={item.id}>
                                    {item.Image && <img src={item.Image} alt="" />}
                                    <div className="checkout-item-info">
                                        <span className="checkout-item-name">{item.name}</span>
                                        <span className="checkout-item-quantity">Qty {item.quantity}</span>
                                    </div>
                                    <span className="checkout-item-price">
                                        ${(item.price * item.quantity).toLocaleString("en-US", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="checkout-total">
                        <span>Total</span>
                        <strong>${total.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}</strong>
                    </div>
                </aside>
            </div>
        </form>
    );
}

export default Checkout;