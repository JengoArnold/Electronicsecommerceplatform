import React, { useState } from 'react';

function Checkout() {
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [error,setError] = useState("");
    const [success,setSuccess] = useState("")

    function handleSubmit(event){
        event.preventDefault();

        setError("");
        setSuccess("");

        if (
            !customerName.trim() ||
            !customerEmail.trim() ||
            !customerPhone.trim() ||
            !customerAddress.trim()
        ){
            setError("Please fill in the fields.");
            return; 
        }
        setSuccess("Checkout Details Validated successfully");
    }
    

    return (
        <form className="checkout" onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Enter your details to place your order.</p>

            <input
                type="text"
                placeholder="Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
            />
            <input
                type="tel"
                placeholder="Phone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
            />
            <input
                type="text"
                placeholder="Address"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
            />

{error && <p className='form-error'>{error}</p>}
{success && <p className='form-success'>{success}</p>}
<button type='Submit'>Continue to order review</button>
        </form>
    );
}

export default Checkout;