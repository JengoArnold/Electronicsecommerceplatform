import "./Cart.css";
import React from "react";
import { Link } from "react-router-dom";

function Cart({ cartItems, removeFromCart, increaseQuantity, decreaseQuantity }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const formatPrice = (price) =>
    `$${price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;

  return (
    <main className="cart-page">
      <header className="cart-page-heading">
        <div>
          <p className="cart-eyebrow">Your selection</p>
          <h1>Shopping cart</h1>
        </div>
        {cartItems.length > 0 && (
          <span className="cart-item-count">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
        )}
      </header>

      {cartItems.length === 0 ? (
        <section className="empty-cart">
          <span className="empty-cart-icon" aria-hidden="true">🛒</span>
          <h2>Your cart is empty</h2>
          <p>Find something you love and it will appear here.</p>
          <Link className="cart-primary-link" to="/shop">
            Continue shopping
          </Link>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items-panel" aria-label="Items in your cart">
            <header className="cart-panel-heading">
              <h2>Items ({itemCount})</h2>
              <Link to="/shop">Continue shopping</Link>
            </header>

            <ul className="cart-items">
              {cartItems.map((item) => (
                <li className="cart-item" key={item.id}>
                  <img
                    src={item.Image || item.image || item.image_url}
                    alt={item.name}
                    className="cart-item-image"
                  />

                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p className="cart-item-unit-price">
                      {formatPrice(item.price)} each
                    </p>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="remove-button"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="cart-item-purchase">
                    <strong>{formatPrice(item.price * item.quantity)}</strong>
                    <div className="quantity-controls" aria-label={`Quantity for ${item.name}`}>
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <aside className="cart-summary" aria-label="Order summary">
            <h2>Order summary</h2>
            <div className="cart-summary-row">
              <span>Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <div className="cart-summary-row cart-delivery-row">
              <span>Delivery</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="cart-summary-total">
              <strong>Total</strong>
              <strong>{formatPrice(total)}</strong>
            </div>
            <Link className="cart-primary-link" to="/checkout">
              Proceed to checkout
            </Link>
            <p className="cart-secure-note">
              Your order total will be confirmed before payment.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}

export default Cart;
