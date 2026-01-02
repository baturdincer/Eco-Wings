import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      // 1. Kullanıcı giriş isteği
      const response = await axios.post(
        "https://localhost:5000/api/Auth/login",
        { email, password }
      );

      console.log("Login response:", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.id); // veya response.data.id ya da response.data.userId

      // 2. Kullanıcı listesi çekilir
      const usersResponse = await axios.get("https://localhost:5000/api/User");
      const allUsers = usersResponse.data;

      // 3. Giriş yapan kullanıcı e-postaya göre bulunur
      const currentUser = allUsers.find((u) => u.email === email);
      if (currentUser) {
        localStorage.setItem("userId", currentUser.id);
        localStorage.setItem("role", currentUser.role);
        console.log("Kullanıcı bulundu ve kaydedildi:", currentUser);

        // ✅ Role göre yönlendirme
        if (currentUser.role === 0) {
          navigate("/admin");
        } else {
          navigate("/campaigns");
        }
      } else {
        console.warn("Giriş yapan kullanıcı user listesinde bulunamadı.");
        setError("Kullanıcı bulunamadı.");
      }
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.message ||
            "Invalid email or password. Please try again."
        );
      } else {
        setError(
          "Network error occurred. Please check your connection and try again."
        );
      }
      console.error("Login hatası:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpRedirect = () => {
    navigate("/signup");
  };

  const handleForgotPassword = () => {
    navigate("/reset-password");
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login to Your Account</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <div className="forgot-password">
          <button
            type="button"
            className="forgot-password-link"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>

        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <div className="signup-redirect">
          Don't have an account?{" "}
          <button
            type="button"
            className="signup-link-button"
            onClick={handleSignUpRedirect}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
