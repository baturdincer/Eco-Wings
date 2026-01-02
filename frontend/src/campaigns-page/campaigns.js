import React, { useState, useEffect } from "react";
import axios from "axios";
import "./campaigns.css";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Kampanya görselleri
  const campaignImages = [
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2137&q=80",
    "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  ];

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get("https://localhost:5000/api/Coupon");
      setCampaigns(response.data); //    setCampaigns(response.data.filter(c => c.receiverUserId === null));

      setLoading(false);
    } catch (error) {
      console.error("Error loading campaigns:", error);
      setError("Failed to load campaigns. Please try again later.");
      setLoading(false);
    }
  };

  const getRandomImage = (id) => {
    return campaignImages[id % campaignImages.length];
  };

  if (loading) {
    return (
      <div className="campaigns-container">
        <div className="loading">Loading campaigns...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="campaigns-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="campaigns-container">
      <div className="campaigns-header">
        <h1>Exclusive Flight Campaigns</h1>
        <p className="campaigns-subtitle">
          Limited-time offers on your favorite destinations. Book now and save
          big!
        </p>
      </div>

      <div className="campaign-list">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="campaign-card">
            <div
              className="campaign-image"
              style={{ backgroundImage: `url(${getRandomImage(campaign.id)})` }}
            >
              <div className="discount-badge">{campaign.discountRate}% OFF</div>
            </div>
            <div className="campaign-content">
              <div className="airline-info">
                <h3>Special Offer</h3>
                <div className="price-comparison">
                  <span className="discount-rate">
                    {campaign.discountRate}% Discount
                  </span>
                </div>
              </div>

              <div className="campaign-details">
                <div className="detail-item">
                  <span className="detail-label">Valid Until</span>
                  <span className="detail-value">
                    {new Date(campaign.expiryDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="campaign-code-container">
                <p>Use promo code:</p>
                <div className="campaign-code">
                  <span>{campaign.code}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="newsletter-cta">
        <h2>Want More Deals?</h2>
        <p>
          Subscribe to our newsletter and be the first to know about exclusive
          offers!
        </p>
        <div className="newsletter-form">
          <input type="email" placeholder="Enter your email address" />
          <button type="submit">Subscribe</button>
        </div>
      </div>
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

export default Campaigns;
