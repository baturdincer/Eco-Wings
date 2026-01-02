import React from "react";
import "./bagajinfo.css";

// Online bagaj görseli URL'si
const baggageImage =
  "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80";

const BagajInfo = () => {
  return (
    <div className="baggage-info">
      <div className="baggage-hero">
        <h1>Have everything with you on vacation</h1>
        <div className="hero-image">
          <img src={baggageImage} alt="Baggage handling" />
        </div>
      </div>

      <section className="info-section">
        <h2>General information</h2>
        <div className="info-card">
          <div className="card-icon">🛄</div>
          <p>
            We ask all passengers to clearly label their travel baggage with
            their name, home address, and holiday address. Should your baggage
            be lost or damaged, please report this immediately to the ground
            handling staff at the arrival hall.
          </p>
        </div>

        <div className="warning-card">
          <div className="warning-icon">⚠️</div>
          <p>
            As airlines have limited liability for checked-in baggage, important
            items should be carried in your hand baggage. In any case, it is
            advisable to take out additional luggage insurance.
          </p>
        </div>

        <div className="info-card">
          <div className="card-icon">🔓</div>
          <p>
            Your checked/hold baggage may be opened by authorities for security
            reasons. If it is locked, TicketWings shall not be held responsible
            for any damages which may occur.
          </p>
        </div>

        <div className="weight-card">
          <h3>Weight Restrictions</h3>
          <div className="weight-grid">
            <div className="weight-item">
              <div className="weight-value">≤23kg</div>
              <div className="weight-label">Standard</div>
            </div>
            <div className="weight-item">
              <div className="weight-value">23-32kg</div>
              <div className="weight-label">Heavy Baggage</div>
            </div>
            <div className="weight-item">
              <div className="weight-value"> 32kg</div>
              <div className="weight-label">Not Accepted</div>
            </div>
          </div>
          <p>
            According to European Union health and safety regulations, each
            piece of baggage can weigh up to a maximum of 32 kg. Baggage
            exceeding this weight cannot be accepted at check-in.
          </p>
        </div>
      </section>

      <section className="info-section">
        <h2>International flights</h2>

        <div className="allowance-card">
          <h3>Baggage Allowance</h3>
          <div className="allowance-grid">
            <div className="allowance-item">
              <div className="allowance-icon">🧳</div>
              <div className="allowance-details">
                <div className="allowance-amount">20-40kg</div>
                <div className="allowance-desc">
                  Per passenger (depends on fare)
                </div>
              </div>
            </div>
            <div className="allowance-item">
              <div className="allowance-icon">👶</div>
              <div className="allowance-details">
                <div className="allowance-amount">20kg</div>
                <div className="allowance-desc">Infants under 2 years</div>
              </div>
            </div>
          </div>
          <p className="note">
            Pushchairs/buggies, travel cots, and child car seats are stowed in
            the hold with no additional charge.
          </p>
        </div>

        <div className="fees-card">
          <h3>Excess Baggage Fees</h3>
          <div className="fees-grid">
            <div className="fees-item">
              <div className="fees-type">Weight Excess</div>
              <div className="fees-amount">From €10/kg</div>
            </div>
            <div className="fees-item">
              <div className="fees-type">Size Excess</div>
              <div className="fees-amount">€45 flat fee</div>
            </div>
          </div>
          <p>
            One piece of baggage may not exceed the outer dimensions of 158 cm
            (length + width + height). The TicketLight fare does not include any
            luggage. Guests can book luggage to their fare to best suit their
            individual needs.
          </p>
        </div>

        <div className="prohibited-card">
          <h3>Prohibited Items</h3>
          <div className="prohibited-grid">
            <div className="prohibited-item">
              <div className="prohibited-icon">🔥</div>
              <div>Flammable items</div>
            </div>
            <div className="prohibited-item">
              <div className="prohibited-icon">✂️</div>
              <div>Sharp objects</div>
            </div>
            <div className="prohibited-item">
              <div className="prohibited-icon">💧</div>
              <div>Liquids over 100ml</div>
            </div>
            <div className="prohibited-item">
              <div className="prohibited-icon">🔋</div>
              <div>Spare lithium batteries</div>
            </div>
          </div>
        </div>
      </section>

      <div className="contact-note">
        <p>
          For any questions regarding baggage policies, please contact our
          customer service or check our FAQ section.
        </p>
      </div>
    </div>
  );
};

export default BagajInfo;
