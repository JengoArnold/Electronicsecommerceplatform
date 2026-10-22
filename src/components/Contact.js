import React, { useState } from "react";
import "./Login.css";

function Contact() {
    const [message, setMessage] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        setMessage("Thanks for reaching out. Message delivery is not configured yet.");
    }

    return (
        <main className="login-page">
            <section className="login-container">
                <h2>Contact Arnold Tech Store</h2>
                <p className="contact-intro">Questions about an order? Send us a note.</p>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-field">
                        <label htmlFor="contact-name">Full Name</label>
                        <input
                            id="contact-name"
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            autoComplete="name"
                            required
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="contact-email">Email Address</label>
                        <input
                            id="contact-email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="contact-message">Message</label>
                        <textarea
                            id="contact-message"
                            name="message"
                            placeholder="How can we help?"
                            rows="5"
                            required
                        />
                    </div>

                    <button type="submit">Send Message</button>
                </form>

                {message && <p className="login-message" role="status">{message}</p>}
            </section>
        </main>
    );
}

export default Contact;
