import React from 'react'
import "./Navbar.css"

function Navbar( {cartCount}) {
  return (
    <div className='navbar'>
      <h2 className='logo'>ArN</h2>
     
      <ul className="nav-links">
    <li>
      <a href="#home">Home </a>
    </li>
     <li>Shop</li>
      <li>Cart( {cartCount})</li>
       <li>
        <a href="#login">Login</a></li>
       <li>Contact</li>
       <li>Sign-Up</li>
      </ul>
    </div>
  )
}

export default Navbar
