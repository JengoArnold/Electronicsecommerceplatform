import React, { useState } from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';

function Navbar({ cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="navbar" aria-label="Main navigation">
      <h2 className="logo">ArN</h2>

      <button
        className={`nav-menu-toggle${menuOpen ? " is-open" : ""}`}
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </button>

      <ul
        className={`nav-links${menuOpen ? " is-open" : ""}`}
        id="primary-navigation"
      >
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/shop" onClick={closeMenu}>Shop</Link></li>
        <li><Link to="/cart" onClick={closeMenu}>Cart ({cartCount})</Link></li>
        <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar
