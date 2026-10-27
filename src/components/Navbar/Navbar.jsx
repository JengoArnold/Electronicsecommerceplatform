import React, { useState } from 'react';
import "./Navbar.css";
import { Link, NavLink, useNavigate } from 'react-router-dom';

function Navbar({ cartCount, searchTerm, onSearchChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // 1. Move these OUTSIDE of closeMenu so the return statement can see them
  const token = sessionStorage.getItem("token");

  const handleLogout = () => {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      window.location.href = "/login"; // Sends user back to login page
  };

  function closeMenu() {
    setMenuOpen(false);
  }

  function submitSearch(event) {
    event.preventDefault();
    navigate("/shop");
    closeMenu();
  }

  return (
    <nav className="navbar" aria-label="Main navigation">
      <Link className="logo" to="/" onClick={closeMenu} aria-label="ArN home">
        <span>ArN</span>
      </Link>

      <form className="nav-search" role="search" onSubmit={submitSearch}>
        <input
          type="search"
          aria-label="Search products"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        <button type="submit" aria-label="Submit product search">
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="8.5" cy="8.5" r="5.5" />
            <path d="m13 13 4 4" />
          </svg>
          <span>Search</span>
        </button>
      </form>

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
        <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
        <li><NavLink to="/shop" onClick={closeMenu}>Shop</NavLink></li>
        <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
      </ul>

      <div className="nav-actions">
        {token ? (
          <div className="user-info">
            <button onClick={handleLogout} className="logout-btn" aria-label="Log out">
              <span className="account-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="3.5" />
                  <path d="M5 20c.6-3.5 3.2-5.5 7-5.5s6.4 2 7 5.5" />
                </svg>
              </span>
              <span>Log out</span>
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-link" onClick={closeMenu}>
            <span className="account-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5 20c.6-3.5 3.2-5.5 7-5.5s6.4 2 7 5.5" />
              </svg>
            </span>
            <span>Account</span>
          </Link>
        )}
        <Link to="/cart" className="cart-link" onClick={closeMenu}>
          <span className="cart-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 1.9-1.4L22 8H6" />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
          </span>
          <span>Cart</span>
          <span className="cart-count" aria-label={`${cartCount} items`}>{cartCount}</span>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar;