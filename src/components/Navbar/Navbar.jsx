import React from 'react'
import "./Navbar.css"

function Navbar() {
  return (
    <div className='navbar'>
      <h2 className='logo'>Jengo Tech Store</h2>
     
      <ui className="nav-links">
    <li>Home</li>
     <li>Shop</li>
      <li>Cart</li>
       <li>Login</li>
       <li>Contact</li>
       <li>Sign-Up</li>
      </ui>
    </div>
  )
}

export default Navbar
