import React from "react";
import "./ProductDetails.css";

function ProductDetails({ product, addToCart, closeDetails }) {

  if (!product) {
    return <p>No product selected.</p>;
  }

  return (
    <div className="product-details">

      <div className="product-details-image">
        <img
          src={product.Image}
          alt={product.name}
        />
      </div>

      <div className="product-details-info">

        <h2>{product.name}</h2>

        <p className="product-details-price">
          ${product.price}
        </p>

        <p className="product-details-rating">
          ⭐ {product.rating}
        </p>

        <p className="product-details-description">
          This is a high quality {product.name} designed to give you
          excellent performance and value.
        </p>

        <button
          className="product-details-button"
          onClick={() => addToCart(product)}
        >
          Add to cart
        </button>

      </div>

      <button
        className="back-button"
        onClick={closeDetails}
      >
        Back to Products
      </button>

    </div>
  );
}

export default ProductDetails;