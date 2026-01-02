import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./resetpassword.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);

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

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email) {
      setError("Please enter your email address");
      setIsLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://localhost:5000/api/Auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUserId(data.userId);
        setStep(2);
      } else {
        setError(
          data.message ||
            "Failed to send password reset email. Please check the email address and try again."
        );
      }
    } catch (error) {
      setError(
        "Network error occurred. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!token || !newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://localhost:5000/api/Auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            token,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setError(
          data.message ||
            "Password reset failed. Please check your verification code and try again."
        );
      }
    } catch (error) {
      setError("An error occurred, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="resetpassword-container">
      <form
        onSubmit={step === 1 ? handleEmailSubmit : handleResetSubmit}
        className="resetpassword-form"
      >
        <h2>Reset Your Password</h2>

        {error && <div className="error-message">{error}</div>}
        {success && (
          <div className="success-message">
            Your password has been updated successfully! Redirecting to login...
          </div>
        )}

        {step === 1 ? (
          <div className="form-group step-transition">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              disabled={success || isLoading}
            />
          </div>
        ) : (
          <div className="step-transition">
            <div className="form-group">
              <label htmlFor="token">Verification Code</label>
              <input
                type="text"
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter verification code from email"
                disabled={success || isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password (min 8 characters)"
                disabled={success || isLoading}
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
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                disabled={success || isLoading}
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className={`resetpassword-button ${isLoading ? "loading" : ""}`}
          disabled={success || isLoading}
        >
          {isLoading ? (
            <span className="loading-spinner"></span>
          ) : step === 1 ? (
            "Send Verification Code"
          ) : (
            "Reset Password"
          )}
        </button>

        <div className="login-redirect">
          Remember your password?{" "}
          <button
            type="button"
            className="login-link-button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
