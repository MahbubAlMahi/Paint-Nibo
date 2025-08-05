import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = ({ setUserEmail }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    axios
      .post("http://localhost:8080/api/auth/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.includes("Welcome")) {
          localStorage.setItem("userEmail", email);
          setUserEmail(email);
          alert(res.data);
          window.location.reload();
        } else {
          alert(res.data);
        }
      })
      .catch(() => alert("❌ Server error logging in!"));
  };

  return (
    <div className="login-page">
      <div className="image-section">
        <img src="/images/logimage.jpg" alt="Login Visual" className="login-image" />
      </div>
      <div className="form-container">
        <h2>🔐 Login</h2>
        <input
          className="input-field"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button className="btn-submit" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
