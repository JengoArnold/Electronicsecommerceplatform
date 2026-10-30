import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <section className="footer-brand" aria-labelledby="footer-brand-title">
                    <Link className="footer-logo" to="/" aria-label="ArN home">
                        ArN<span>.</span>
                    </Link>
                    <h2 id="footer-brand-title">Technology for everyday life.</h2>
                    <p>Find electronics and accessories for work, play, and home.</p>
                </section>

                <nav className="footer-links" aria-label="Explore">
                    <h3>Explore</h3>
                    <Link to="/">Home</Link>
                    <Link to="/shop">Shop all</Link>
                    <Link to="/cart">Your cart</Link>
                    <Link to="/contact">Contact us</Link>
                </nav>

                <section className="footer-contact" aria-labelledby="footer-contact-title">
                    <h3 id="footer-contact-title">Get in touch</h3>
                    <a href="mailto:arnoldjaz5@gmail.com">arnoldjaz5@gmail.com</a>
                    <a href="tel:+256740969070">+256 740 969070</a>
                </section>

                <section className="footer-social" aria-labelledby="footer-social-title">
                    <h3 id="footer-social-title">Connect with us</h3>
                    <a
                        className="footer-social-link"
                        href="https://wa.me/256740969070"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Chat with us on WhatsApp"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.5-4.9a8.4 8.4 0 1 1 16-3.9Z" />
                            <path d="M8.2 7.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4 0 .5l-.5.7c-.2.2-.2.4-.1.6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5 0 .3-.2 1-.7 1.4-.5.5-1.2.7-1.8.6-.6-.1-1.4-.3-2.4-.9a9.3 9.3 0 0 1-3.2-2.8c-.8-1-1.2-2.1-1.3-2.9 0-.7.2-1.2.5-1.5Z" />
                        </svg>
                        <span>WhatsApp</span>
                    </a>
                </section>
            </div>

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} ArN Home Electronics. All rights reserved.</p>
                <Link to="/contact">Questions? Contact our team</Link>
            </div>
        </footer>
    );
}

export default Footer;