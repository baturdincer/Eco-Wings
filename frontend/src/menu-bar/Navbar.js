import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext"; // auth context import

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth(); // user ve logout al

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          TicketWings
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>

          <li className="nav-item dropdown">
            <span className="nav-links"> ☰</span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/campaigns">Campaigns</Link>
              </li>
              <li>
                <Link to="/profile-settings">Profile Settings</Link>
              </li>
              <li>
                <Link to="/comments-rating">Comments & Rating</Link>
              </li>
              {/* <li>
                <Link to="/ticketwings-score">TicketWings Score</Link>
              </li> */}
              <li>
                <Link to="/gift-ticket">Gift Ticket</Link>
              </li>
              <li>
                <Link to="/flight-tracking">Flight Tracking</Link>
              </li>
              <li>
                <Link to="/lucky-flight">Lucky Flight</Link>
              </li>
              <li>
                <Link to="/passenger-info">Passenger Information</Link>
              </li>
              <li>
                <Link to="/baggage-info">Baggage Information</Link>
              </li>
              {user && (
                <li>
                  <button
                    onClick={logout}
                    className="nav-links"
                    style={{
                      background: "none",
                      border: "none",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </li>
        </ul>

        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          ☰
        </div>

        <ul className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/admin" onClick={toggleMobileMenu}>
              Admin Panel
            </Link>
          </li>
          <li>
            <Link to="/passenger-info" onClick={toggleMobileMenu}>
              Passenger Information
            </Link>
          </li>
          <li>
            <Link to="/baggage-info" onClick={toggleMobileMenu}>
              Baggage Information
            </Link>
          </li>
          <li>
            <Link to="/campaigns" onClick={toggleMobileMenu}>
              Campaigns
            </Link>
          </li>
          <li>
            <Link to="/profile-settings" onClick={toggleMobileMenu}>
              Profile Settings
            </Link>
          </li>
          <li>
            <Link to="/comments-rating" onClick={toggleMobileMenu}>
              Comments & Rating
            </Link>
          </li>
          <li>
            <Link to="/ticketwings-score" onClick={toggleMobileMenu}>
              TicketWings Score
            </Link>
          </li>
          <li>
            <Link to="/gift-ticket" onClick={toggleMobileMenu}>
              Gift Ticket
            </Link>
          </li>
          <li>
            <Link to="/flight-tracking" onClick={toggleMobileMenu}>
              Flight Tracking
            </Link>
          </li>
          <li>
            <Link to="/lucky-flight" onClick={toggleMobileMenu}>
              Lucky Flight
            </Link>
          </li>
          {!user ? (
            <li>
              <Link to="/login" onClick={toggleMobileMenu}>
                Login
              </Link>
            </li>
          ) : (
            <li>
              <button
                onClick={logout}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  padding: "15px 20px",
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
