import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { email, password });
      login(res.data.token);  // Update global login state
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div style={{
      maxWidth: 600,
      margin: "64px auto",
      background: "var(--card-bg)",
      borderRadius: "18px",
      boxShadow: "0 8px 40px rgb(50 70 110 / .13)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 40px"
    }}>
      <h2 style={{
        fontSize: "2.4rem",
        fontWeight: 800,
        textAlign: "center",
        marginBottom: 38,
        letterSpacing: ".4px"
      }}>Login</h2>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "480px", display: "flex", flexDirection: "column", gap: "28px", alignItems: "center" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            background: "var(--input-bg)",
            color: "var(--text-color)",
            padding: "17px",
            fontSize: "1.15rem",
            border: "1px solid var(--input-border)",
            borderRadius: "10px"
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            background: "var(--input-bg)",
            color: "var(--text-color)",
            padding: "17px",
            fontSize: "1.15rem",
            border: "1px solid var(--input-border)",
            borderRadius: "10px"
          }}
        />
          <button type="submit"
          style={{
            width: "100%",
            padding: "17px 0",
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "white",
            background: "var(--primary-color)",
            border: "none",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgb(74 144 226 / .13)",
            marginTop: "16px",
            cursor: "pointer"
          }}>
          Login
        </button>
      </form>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <span style={{ color: "var(--text-color)" }}>Don't have an account? </span>
        <Link to="/signup" style={{ 
          color: "var(--primary-color)", 
          textDecoration: "none",
          fontWeight: "600",
          marginLeft: "4px"
        }}>
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
