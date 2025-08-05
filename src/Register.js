import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // New state for username

  const handleRegister = () => {
    axios
      .post("http://localhost:8080/api/auth/register", {
        email,
        password,
        username,  // Send the username along with email and password
      })
      .then((res) => alert(res.data))
      .catch(() => alert("❌ Server error registering!"));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📝 Register</h2>
      <input 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      /><br /><br />
      <input 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      /><br /><br />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      /><br /><br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
