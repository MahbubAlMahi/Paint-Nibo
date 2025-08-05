import React, { useEffect, useState } from "react";
import axios from "axios";
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = () => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      console.log("❌ No user logged in");
      return;
    }

    console.log("Fetching cart for user:", email); // Log to verify email

    axios
      .get("http://localhost:8080/api/cart", { params: { email } })
      .then((res) => {
        console.log("Cart fetched:", res.data);  // Log the response
        setCartItems(res.data);
      })
      .catch((err) => {
        console.error("❌ Error fetching cart items:", err);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const deleteCartItem = (id) => {
    axios
      .delete(`http://localhost:8080/api/cart/delete/${id}`)
      .then(() => {
        alert("🗑️ Item deleted from cart");
        fetchCart();  // Re-fetch cart after deletion
      })
      .catch((err) => console.error("❌ Error deleting item:", err));
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => {
            if (!item.product) {
              console.log("Invalid product:", item);  // Log invalid items
              return null; // Skip if product is missing
            }
            return (
              <li key={item.id} className="cart-item">
                <strong>{item.product.name}</strong> — {item.quantity} pcs — 💰{" "}
                {item.product.price * item.quantity} BDT
                <button
                  className="btn-delete"
                  onClick={() => deleteCartItem(item.id)}
                >
                  ❌ Remove
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Cart;
