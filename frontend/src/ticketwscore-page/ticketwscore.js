import React, { useEffect, useState } from "react";
import "./ticketwscore.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const TicketWScore = () => {
  const { user } = useAuth();
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchUserFlights = async () => {
      const token = localStorage.getItem("token");
      if (!token || !user) return;

      try {
        const res = await axios.get("https://localhost:5000/api/Ticket/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFlights(res.data);
      } catch (error) {
        console.error("Kullanıcının uçuşları yüklenemedi:", error);
      }
    };

    fetchUserFlights();
  }, [user]);

  const totalScore = flights.length * 100;

  return (
    <div className="ticket-score-container">
      <div className="score-header">
        <h1>Flight Points</h1>
      </div>

      <div className="total-score-box">
        <div className="total-score">{totalScore} PTS</div>
        <div className="total-score-label">Total Earned Points</div>
      </div>

      <div className="history-card">
        <h2>Flight History</h2>
        {flights.length === 0 ? (
          <p>No flights found.</p>
        ) : (
          <div className="history-items">
            {flights.map((flight, index) => (
              <div className="history-item" key={index}>
                <div className="flight-score">+100 PTS</div>
                <div className="flight-info">
                  <div className="airline-logo">✈️</div>
                  <div className="flight-details">
                    <h3>{flight.departureAirport} → {flight.arrivalAirport}</h3>
                    <div className="flight-meta">
                      <span>{new Date(flight.bookingDate).toLocaleDateString()}</span>
                      <span>Flight ID: {flight.flightId}</span>
                      <span>{flight.duration || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketWScore;
