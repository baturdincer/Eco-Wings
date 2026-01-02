import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);
  const [airports, setAirports] = useState([]);
  const [searchTerm, setSearchTerm] = useState({ from: "", to: "" });
  const fromRef = useRef(null);
  const toRef = useRef(null);

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departureDate: null,
    adults: 1,
    travelClass: "ECONOMY",
  });

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80",
      city: "Paris",
      description: "City of Love and Lights",
    },
    {
      image:
        "https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1998&q=80",
      city: "Istanbul",
      description: "Where East Meets West",
    },
    {
      image:
        "https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      city: "Tokyo",
      description: "Futuristic Metropolis",
    },
    {
      image:
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      city: "New York",
      description: "The City That Never Sleeps",
    },
    {
      image:
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1996&q=80",
      city: "Rome",
      description: "Eternal City",
    },
    {
      image:
        "https://images.unsplash.com/photo-1517154421773-0529f29ea451?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      city: "Barcelona",
      description: "Art and Architecture",
    },
    {
      image:
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80",
      city: "Dubai",
      description: "Desert Oasis",
    },
    {
      image:
        "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      city: "Sydney",
      description: "Harbor City",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromRef.current && !fromRef.current.contains(event.target)) {
        setFromDropdownOpen(false);
      }
      if (toRef.current && !toRef.current.contains(event.target)) {
        setToDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const res = await axios.get("https://localhost:5000/api/Airport");
        setAirports(res.data);
      } catch (error) {
        console.error("Havalimanları yüklenemedi:", error);
      }
    };
    fetchAirports();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const fromCode = formData.from.match(/\(([^)]+)\)/)?.[1];
    const toCode = formData.to.match(/\(([^)]+)\)/)?.[1];

    if (!fromCode || !toCode || !formData.departureDate) {
      alert("Lütfen tüm alanları eksiksiz doldurun.");
      return;
    }

    navigate("/flight-results", {
      state: {
        origin: fromCode,
        destination: toCode,
        date: formData.departureDate.toISOString().split("T")[0],
        adults: formData.adults,
        travelClass: formData.travelClass,
      },
    });
  };

  const handleCitySelect = (type, airport) => {
    const value = `${airport.city} (${airport.code})`;
    setFormData((prev) => ({ ...prev, [type]: value }));
    setSearchTerm((prev) => ({ ...prev, [type]: value }));
    if (type === "from") setFromDropdownOpen(false);
    else setToDropdownOpen(false);
  };

  const filteredCities = (type) => {
    return airports.filter(
      (airport) =>
        airport.city.toLowerCase().includes(searchTerm[type].toLowerCase()) ||
        airport.code.toLowerCase().includes(searchTerm[type].toLowerCase())
    );
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="slideshow-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? "active" : ""}`}
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            />
          ))}
        </div>

        <div className="home-header-content">
          <h1>Welcome to TicketWings!</h1>
          <p className="home-subtitle">
            Discover {slides[currentSlide].city} –{" "}
            {slides[currentSlide].description}
          </p>

          <div className="flight-search-form">
            <form onSubmit={handleSubmit}>
              <div className="search-container">
                <div className="search-input-group">
                  <div className="input-wrapper" ref={fromRef}>
                    <label>From</label>
                    <input
                      type="text"
                      value={searchTerm.from}
                      onChange={(e) => {
                        setSearchTerm((prev) => ({
                          ...prev,
                          from: e.target.value,
                        }));
                        setFormData((prev) => ({
                          ...prev,
                          from: e.target.value,
                        }));
                        setFromDropdownOpen(true);
                      }}
                      placeholder="City or airport"
                      required
                    />
                    {fromDropdownOpen && (
                      <div className="city-dropdown">
                        {filteredCities("from").map((airport) => (
                          <div
                            key={airport.id}
                            className="city-option"
                            onClick={() => handleCitySelect("from", airport)}
                          >
                            <div className="city-main">
                              <span className="city-name">{airport.name}</span>
                              <span className="city-code">{airport.code}</span>
                            </div>
                            <div className="city-sub">
                              {airport.city}, {airport.country}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="input-wrapper" ref={toRef}>
                    <label>To</label>
                    <input
                      type="text"
                      value={searchTerm.to}
                      onChange={(e) => {
                        setSearchTerm((prev) => ({
                          ...prev,
                          to: e.target.value,
                        }));
                        setFormData((prev) => ({
                          ...prev,
                          to: e.target.value,
                        }));
                        setToDropdownOpen(true);
                      }}
                      placeholder="City or airport"
                      required
                    />
                    {toDropdownOpen && (
                      <div className="city-dropdown">
                        {filteredCities("to").map((airport) => (
                          <div
                            key={airport.id}
                            className="city-option"
                            onClick={() => handleCitySelect("to", airport)}
                          >
                            <div className="city-main">
                              <span className="city-name">{airport.name}</span>
                              <span className="city-code">{airport.code}</span>
                            </div>
                            <div className="city-sub">
                              {airport.city}, {airport.country}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="input-wrapper">
                    <label>Departure</label>
                    <DatePicker
                      selected={formData.departureDate}
                      onChange={(date) =>
                        setFormData((prev) => ({
                          ...prev,
                          departureDate: date,
                        }))
                      }
                      dateFormat="yyyy-MM-dd"
                      minDate={new Date()}
                      className="date-picker-input"
                      placeholderText="Select date"
                      required
                    />
                  </div>

                  <div className="input-wrapper">
                    <label>Adults</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.adults}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          adults: parseInt(e.target.value),
                        }))
                      }
                    />
                  </div>

                  <div className="input-wrapper">
                    <label>Travel Class</label>
                    <select
                      value={formData.travelClass}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          travelClass: e.target.value,
                        }))
                      }
                    >
                      <option value="ECONOMY">Economy</option>
                      <option value="PREMIUM_ECONOMY">Premium Economy</option>
                      <option value="BUSINESS">Business</option>
                      <option value="FIRST">First Class</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="search-button">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="top-actions">
        <div className="top-card">
          <div className="top-icon">🔐</div>
          <h3>Login!</h3>
          <p>Secure login. Smooth takeoff.</p>
          <button className="home-button" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>

        <div className="top-card">
          <div className="top-icon">✈️</div>
          <h3>Get Started</h3>
          <p>Join thousands of travelers soaring with TicketWings!</p>
          <button
            className="home-button secondary"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>

        <div className="top-card">
          <div className="top-icon">✨</div>
          <h3>Learn</h3>
          <p>Learn about flights</p>
          <button
            className="home-button outline"
            onClick={() => navigate("/general-info")}
          >
            Explore
          </button>
        </div>
      </div>

      <section className="features-section">
        <h2>Why Choose TicketWings?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌟</div>
            <h3>Best Price Guarantee</h3>
            <p>
              Find the best deals with our price match promise. If you find a
              lower price elsewhere, we'll match it!
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Secure Booking</h3>
            <p>
              Book with confidence using our secure payment system and get
              instant confirmation.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Smart Search</h3>
            <p>
              Our intelligent search algorithm finds the perfect flights
              matching your preferences.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎁</div>
            <h3>Rewards Program</h3>
            <p>
              Earn points with every booking and unlock exclusive benefits and
              discounts.
            </p>
          </div>
        </div>
      </section>

      <section className="destinations-section">
        <h2>Popular Destinations</h2>
        <div className="destinations-grid">
          <div className="destination-card paris">
            <div className="destination-content">
              <h3>Paris</h3>
            </div>
          </div>
          <div className="destination-card istanbul">
            <div className="destination-content">
              <h3>Istanbul</h3>
            </div>
          </div>
          <div className="destination-card newyork">
            <div className="destination-content">
              <h3>New York</h3>
            </div>
          </div>
          <div className="destination-card tokyo">
            <div className="destination-content">
              <h3>Tokyo</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="app-section">
        <div className="app-content">
          <div className="app-text">
            <h2>Download Our Mobile App</h2>
            <p>
              Get exclusive mobile-only deals and manage your bookings on the
              go!
            </p>
            <div className="app-buttons">
              <button className="app-button">
                <span className="app-icon">🍎</span>
                Download on App Store
              </button>
              <button className="app-button">
                <span className="app-icon">🤖</span>
                Get it on Google Play
              </button>
            </div>
          </div>
          <div className="app-image">📱</div>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay Updated with TicketWings</h2>
          <p>
            Subscribe to our newsletter and never miss out on exclusive deals!
          </p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About TicketWings</h3>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Press Center</li>
              <li>Travel Blog</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Help</h3>
            <ul>
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Booking Guide</li>
              <li>Travel Insurance</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Legal</h3>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
              <li>Security</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <span>📘 Facebook</span>
              <span>📸 Instagram</span>
              <span>🐦 Twitter</span>
              <span>💼 LinkedIn</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} TicketWings. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
