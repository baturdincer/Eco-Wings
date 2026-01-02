import React from "react";
import "./passengerinfo.css";

const PassengerInfo = () => {
  return (
    <div className="passenger-info">
      <h1>Accessibility Services at TicketWings</h1>
      <p>
        At TicketWings, our top priority is to meet the needs of our passengers.
        We are committed to continuously improving the services offered to our
        disabled passengers or passengers with reduced mobility so that everyone
        can have a comfortable journey with us.
      </p>

      <section>
        <h2>How to Make a Service Request?</h2>
        <p>Please submit your request during booking or well in advance via:</p>
        <ul>
          <li>ticketwings.com</li>
          <li>Customer Service Center</li>
          <li>Ticket sales offices</li>
          <li>Tour operators</li>
          <li>Travel agencies</li>
        </ul>
        <p>You will receive an e-mail once your service request is approved.</p>
        <p>
          Disabled passengers and their travel partners can reserve seats free
          of charge. For details, please contact the Customer Service Center.
        </p>
      </section>

      <section>
        <h2>Online Check-in Information</h2>
        <div className="service-cards">
          <div className="service-card">
            <h3>Check-in Requirements</h3>
            <p>Special service passengers can use online check-in only on domestic flights.</p>
            <ul>
              <li>Must be able to fasten seatbelts without assistance</li>
              <li>Must be able to use oxygen masks independently</li>
              <li>Must be able to wear life jackets without help</li>
            </ul>
          </div>
          <div className="service-card">
            <h3>Important Notes</h3>
            <ul>
              <li>Review "Passengers That Should Travel with an Accompanying Person"</li>
              <li>Introduce yourself to ground staff at the gate</li>
              <li>Cannot sit in emergency exit rows (will be reassigned if necessary)</li>
            </ul>
          </div>
        </div>
        <p>
          Window seats (A/F) can be reserved in advance depending on mobility
          restrictions.
        </p>
      </section>

      <section>
        <h2>Wheelchair Service Levels</h2>
        <p>
          Contact the Customer Service Center well in advance due to limited
          availability.
        </p>
        <div className="wheelchair-levels">
          <div className="wheelchair-level">
            <h4>WCHR</h4>
            <p>Difficulty walking long distances, no stair assistance needed.</p>
          </div>
          <div className="wheelchair-level">
            <h4>WCHS</h4>
            <p>Difficulty walking and needs stair assistance.</p>
          </div>
          <div className="wheelchair-level">
            <h4>WCHC</h4>
            <p>Cannot walk without assistance – escorted to/from seat.</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Passenger Types</h2>
        <div className="service-cards">
          <div className="service-card">
            <h3>Mobility Assistance</h3>
            <ul>
              <li>Passenger with Slight/Severe Mobility Handicap</li>
              <li>Passenger Completely Immobile</li>
            </ul>
          </div>
          <div className="service-card">
            <h3>Sensory Impairments</h3>
            <ul>
              <li><strong>BLIND:</strong> Visually impaired</li>
              <li><strong>DEAF:</strong> Hearing impaired</li>
              <li><strong>DEAF/MUTE:</strong> Hearing and speech impaired</li>
            </ul>
          </div>
          <div className="service-card">
            <h3>Other Needs</h3>
            <ul>
              <li><strong>DPNA:</strong> Mentally or developmentally disabled</li>
              <li>Passengers with medical conditions</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2>Passengers with Medical Assistance</h2>
        <ul>
          <li>Need for oxygen (must bring their own bottle)</li>
          <li>Broken limbs in plaster</li>
          <li>Medical devices (e.g., needle)</li>
          <li>Abnormal behavior or medical conditions</li>
        </ul>
        <p>These services are provided free of charge.</p>
      </section>

      <section>
        <h2>Wheelchair Transport Guidelines</h2>
        <div className="service-cards">
          <div className="service-card">
            <h3>Accepted Wheelchairs</h3>
            <ul>
              <li>Manual Wheelchairs (WCMP)</li>
              <li>Battery-Powered Dry Cell (WCBD)</li>
              <li>Lithium Battery Wheelchairs (WCLB)</li>
            </ul>
          </div>
          <div className="service-card">
            <h3>Restrictions</h3>
            <p>Electronic wheelchairs with liquid batteries are not accepted due to safety risks.</p>
            <p>Please ensure the wheelchair fits within aircraft dimensions (max 100x120cm).</p>
          </div>
        </div>
      </section>

      <p className="note">
        Note: Seats in emergency exit rows cannot be allocated to disabled
        passengers or those with reduced mobility.
      </p>

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

export default PassengerInfo;