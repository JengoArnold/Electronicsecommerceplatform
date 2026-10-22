import React, { useState } from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';

function Navbar({ cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // 1. Move these OUTSIDE of closeMenu so the return statement can see them
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleLogout = () => {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      window.location.href = "/login"; // Sends user back to login page
  };

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
        <li><Link to="/cart" onClick={closeMenu}>🛒Cart ({cartCount})</Link></li>
        <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
      </ul>

      {/* 2. The Login/Logout section */}
      {token ? (
          <div className="user-info">
            
              <button onClick={handleLogout} className="logout-btn">
                Log Out
              </button>
          </div>
      ) : (
          <Link to="/login" className="login-link">Login</Link>
      )}
    </nav>
  )
}

export default Navbar;