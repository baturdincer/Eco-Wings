import React, { useState } from "react";
import axios from "axios";
import "./signup.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordPlain, setPasswordPlain] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPasswordPlain(password);

    // Simple password strength calculation
    let strength = 0;
    if (password.length > 0) strength += 20;
    if (password.length >= 8) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;

    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 40) return "#ff4757";
    if (passwordStrength < 80) return "#ffa502";
    return "#2ed573";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !passwordPlain ||
      !confirmPassword ||
      !dateOfBirth ||
      !gender ||
      !phoneNumber
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (passwordPlain !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (passwordStrength < 60) {
      setError("Password is too weak. Please use a stronger password.");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:5000/api/Auth/register",
        {
          name,
          email,
          passwordPlain,
          dateOfBirth,
          gender,
          phoneNumber,
        },
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      alert("Registration successful! You can now log in.");
      console.log("API Response:", response.data);

      // Reset form
      setName("");
      setEmail("");
      setPasswordPlain("");
      setConfirmPassword("");
      setDateOfBirth("");
      setGender("");
      setPhoneNumber("");
      setError("");
      setPasswordStrength(0);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Registration failed");
      } else {
        setError("Network error. Please try again.");
      }
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Create Your Account</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="passwordPlain">Password</label>
          <input
            type="password"
            id="passwordPlain"
            value={passwordPlain}
            onChange={handlePasswordChange}
            placeholder="Create a strong password"
          />
          <div className="password-strength">
            <div
              className="password-strength-bar"
              style={{
                width: `${passwordStrength}%`,
                backgroundColor: getPasswordStrengthColor(),
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="form-footer">
          <div className="terms-checkbox">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to the <a href="/terms">Terms</a> and{" "}
              <a href="/privacy">Privacy Policy</a>
            </label>
          </div>
        </div>

        <button type="submit" className="signup-button">
          Create Account
        </button>

        <div className="login-redirect">
          Already have an account?{" "}
          <a href="/login" className="login-link-button">
            Log in
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
