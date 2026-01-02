import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./profilesettings.css";
import axios from "axios";

const ProfileSettings = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // <<== EKLENDİ
  const userId = localStorage.getItem("userId");

  const fetchProfileAndTickets = async () => {
    if (!userId) {
      console.error("userId bulunamadı.");
      setLoading(false);
      return;
    }

    try {
      const userRes = await axios.get(
        `https://localhost:5000/api/User/${userId}`
      );
      setUserData(userRes.data);

      // Kullanıcıya ait ticketlar
      const ticketRes = await axios.get(
        `https://localhost:5000/api/Ticket/user/${userId}`
      );
      setTickets(ticketRes.data);
    } catch (error) {
      console.error("Veriler yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  // Burada location.key ile dependency array'i ayarlandı
  useEffect(() => {
    setLoading(true); // Her route değişiminde loading animasyonu için
    fetchProfileAndTickets();
    // eslint-disable-next-line
  }, [location.key, userId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) return <div>loading...</div>;
  if (!userData) return <div>Kullanıcı bilgisi bulunamadı.</div>;

  return (
    <div className="profile-settings-container">
      <div className="profile-header">
        <h1>Account Settings</h1>
        <p className="profile-subtitle">
          Manage your profile and booking history
        </p>

        <button
          onClick={handleLogout}
          style={{
            marginTop: "1rem",
            padding: "0.6rem 1.2rem",
            backgroundColor: "#ff3b30",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Logout
        </button>
      </div>

      <div className="profile-content">
        {/* Kullanıcı Kartı */}
        <div className="profile-card">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {userData.name?.charAt(0).toUpperCase()}
            </div>
            <button className="avatar-upload">
              <span className="upload-icon">📷</span>
            </button>
          </div>

          <div className="profile-info">
            <h2>Personal Information</h2>
            <div className="info-group">
              <label>Full Name</label>
              <div className="info-field">{userData.name}</div>
            </div>
            <div className="info-group">
              <label>Email Address</label>
              <div className="info-field">{userData.email}</div>
            </div>
            <div className="info-group">
              <label>Phone Number</label>
              <div className="info-field">{userData.phoneNumber}</div>
            </div>
            <div className="info-group">
              <label>Date of Birth</label>
              <div className="info-field">
                {new Date(userData.dateOfBirth).toLocaleDateString()}
              </div>
            </div>
            <div className="info-group">
              <label>Gender</label>
              <div className="info-field">{userData.gender}</div>
            </div>
          </div>
        </div>

        <div className="history-card">
          <h2>Flight History</h2>
          {tickets.length === 0 ? (
            <p>Your past ticket could not be found.</p>
          ) : (
            <div className="history-items">
              {tickets.map((ticket, index) => {
                return (
                  <div className="history-item" key={index}>
                    <div className="flight-info">
                      <div className="airline-logo">✈️</div>
                      <div className="flight-details">
                        <h3>
                          {ticket.from} → {ticket.to}
                        </h3>
                        <div className="flight-meta">
                          <span>
                            Departure Time:{" "}
                            {ticket.departureTime
                              ? new Date(ticket.departureTime).toLocaleString(
                                  "tr-TR"
                                )
                              : "-"}
                          </span>
                          <span>
                            Estimated Arrival:{" "}
                            {ticket.estimatedArrivalTime
                              ? new Date(
                                  ticket.estimatedArrivalTime
                                ).toLocaleString("tr-TR")
                              : "-"}
                          </span>
                          <span>
                            Flight Number: {ticket.flightNumber || "-"}
                          </span>
                          <span>
                            Ticket Number: {ticket.ticketId || ticket.id || "-"}
                          </span>
                        </div>
                        <div className="flight-extra">
                          <span>PNR Code: {ticket.pnrCode || "-"}</span>
                          <span>
                            Payment: {ticket.isPaid ? "Ödendi" : "Bekliyor"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flight-price">
                      <span className="price">
                        {ticket.price ? `${ticket.price} ₺` : "-"}
                      </span>
                      <span className="flight-class">
                        {ticket.travelClass || "Economy"}
                      </span>
                    </div>
                    <div className="flight-actions">
                      <button
                        onClick={() =>
                          navigate("/flight-tracking", {
                            state: {
                              ticketId: ticket.ticketId || ticket.id,
                              departureTime: ticket.departureTime,
                              estimatedArrivalTime: ticket.estimatedArrivalTime,
                              from: ticket.from,
                              to: ticket.to,
                            },
                          })
                        }
                        className="action-button track"
                      >
                        details
                      </button>

                      {/* <button className="action-button view">Bileti Gör</button>
          <button className="action-button rate">Uçuşu Puanla</button> */}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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

export default ProfileSettings;
