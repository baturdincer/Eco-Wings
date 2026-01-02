import React, { useState } from "react";
import axios from "axios";
import "./luckyflight.css";
import { useNavigate } from "react-router-dom";

const LuckyFlight = () => {
  const [origin, setOrigin] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userId = Number(localStorage.getItem("userId")); // Otomatik userId çekiliyor.

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!origin) {
      alert("Lütfen kalkış yeri girin.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        `https://localhost:5000/api/LuckyFlight/search`,
        {
          params: { origin, userId },
        }
      );

      const data = Array.isArray(res.data) ? res.data : [res.data];
      setResults(data);
    } catch (err) {
      console.error("Flights could not be retrieved:", err);
      setError("Uçuşlar alınamadı. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = (flight) => {
    navigate("/payment-page", { state: flight }); // ödeme sayfasına yönlendir
  };

  return (
    <div className="luckyflight-container">
      <h1>Lucky Flight Search</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter origin (e.g. Istanbul)"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="flight-results">
        {results.length > 0
          ? results.map((flight, index) => (
              <div key={index} className="flight-card">
                <h3>
                  {flight.departure} → {flight.arrival}
                </h3>
                <p>
                  <strong>Airline:</strong> {flight.carrier}
                </p>
                <p>
                  <strong>Flight Number:</strong> {flight.flightNumber}
                </p>
                <p>
                  <strong>Departure:</strong> {flight.departureTime}
                </p>
                <p>
                  <strong>Arrival:</strong> {flight.arrivalTime}
                </p>
                <p>
                  <strong>Date:</strong> {flight.date}
                </p>
                <p>
                  <strong>Class:</strong> {flight.travelClass || "Economy"}
                </p>
                <p>
                  <strong>Price:</strong> {flight.price} {flight.currency}
                </p>

                <button
                  className="buy-button"
                  onClick={() => handlePurchase(flight)}
                >
                  Buy Tickets
                </button>
              </div>
            ))
          : !loading && <p>No results yet. Search.</p>}
      </div>
    </div>
  );
};

export default LuckyFlight;
