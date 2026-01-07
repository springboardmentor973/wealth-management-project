import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic validation (demo purpose)
    if (email && password) {
      // Persist login state
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);

      // Redirect to protected route
      navigate("/goals");
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button style={{ marginTop: "1rem" }} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
