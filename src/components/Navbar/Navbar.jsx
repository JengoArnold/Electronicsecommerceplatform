import React from 'react'
import "./Navbar.css"

function Navbar( {cartCount}) {
  return (
    <div className='navbar'>
      <h2 className='logo'>ArN</h2>
     
      <ul className="nav-links">
    <li>Home</li>
     <li>Shop</li>
      <li>Cart( {cartCount})</li>
       <li>Login</li>
       <li>Contact</li>
       <li>Sign-Up</li>
      </ul>
    </div>
  )
}

export default Navbar
