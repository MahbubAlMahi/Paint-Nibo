import React, { useState } from "react";
import ProductList from "./ProductList";
import Cart from "./Cart";
import Login from "./Login";
import Register from "./Register";
import './App.css'; 

function App() {
  const [view, setView] = useState("products");
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    setView("login");
    alert("Logged out successfully!");
  };

  return (
    <div className="App">
      <div className="header">
        <button className="btn" onClick={() => setView("products")}>🛍️ Products</button>
        <button className="btn" onClick={() => setView("cart")}>🛒 Cart</button>
        {!userEmail && <button className="btn" onClick={() => setView("login")}>🔐 Login</button>}
        {!userEmail && <button className="btn" onClick={() => setView("register")}>📝 Register</button>}
        {userEmail && (
          <>
            <span className="welcome-text">👋 Welcome, {userEmail}</span>
            <button className="btn-logout" onClick={handleLogout}>🚪 Logout</button>
          </>
        )}
      </div>

      {view === "products" && <ProductList />}
      {view === "cart" && <Cart />}
      {view === "login" && <Login setUserEmail={setUserEmail} />}
      {view === "register" && <Register />}
    </div>
  );
}

export default App;
