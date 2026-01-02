import React from "react";
import { Link } from "react-router-dom";
import "./generalinfo.css";

const flightImage =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80";

const GeneralInfo = () => {
  return (
    <div className="general-info">
      <div className="info-link-container">
        <Link to="/baggage-info" className="info-link">
          🧳 Bagaj Kuralları
          <span className="link-subtext">Detaylı bilgi için tıklayınız</span>
        </Link>
        <Link to="/passenger-info" className="info-link">
          👤 Yolcu Rehberi
          <span className="link-subtext">
            Seyahat gereksinimleri & hizmetler
          </span>
        </Link>
      </div>

      <div className="general-hero">
        <h1>Your Complete Flight Guide</h1>
        <div className="hero-image">
          <img src={flightImage} alt="Airplane in sky" />
        </div>
      </div>

      <section className="info-section">
        <h2>Flight Preparation</h2>
        <div className="info-card">
          <div className="card-icon">🛫</div>
          <p>
            Check-in opens 24 hours before departure and closes 60 minutes prior
            to scheduled departure time. We recommend arriving at the airport at
            least 2 hours before your flight.
          </p>
        </div>

        <div className="warning-card">
          <div className="warning-icon">⏰</div>
          <p>
            Boarding gates close 20 minutes before departure. Late arrivals may
            result in denied boarding. Always check real-time flight updates.
          </p>
        </div>
      </section>

      <section className="info-section">
        <h2>During the Flight</h2>
        <div className="grid-card">
          <div className="grid-item">
            <div className="item-icon">📵</div>
            <h3>Electronic Devices</h3>
            <p>Mobile phones must be in airplane mode during flight</p>
          </div>

          <div className="grid-item">
            <div className="item-icon">🍱</div>
            <h3>Meal Service</h3>
            <p>Complimentary meals served on flights longer than 3 hours</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2>Special Assistance</h2>
        <div className="info-card">
          <div className="card-icon">♿</div>
          <p>
            Notify us at least 48 hours before departure for wheelchair
            assistance, medical needs, or unaccompanied minor service.
          </p>
        </div>
      </section>

      <div className="contact-note">
        <p>
          For real-time flight status or special requests, contact our 24/7
          customer support.
        </p>
      </div>
    </div>
  );
};

export default GeneralInfo;
