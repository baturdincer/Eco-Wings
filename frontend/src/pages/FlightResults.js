import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./flightresults.css";

const FlightResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const origin = location?.state?.origin || "";
  const destination = location?.state?.destination || "";
  const date = location?.state?.date || "";
  const adults = location?.state?.adults || 1;
  const travelClass = location?.state?.travelClass || "ECONOMY";
  const userId = localStorage.getItem("userId");

  const [flights, setFlights] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [priceLimit, setPriceLimit] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(false); // <-- YENİ

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        console.log("API'ya gönderilen parametreler:", {
          origin,
          destination,
          date,
          adults,
          travelClass,
          userId,
        });

        const res = await axios.get(
          "https://localhost:5000/api/FlightSearch/search",
          {
            params: {
              origin,
              destination,
              date,
              adults,
              travelClass,
              userId,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Giriş yaptıysan, token burada olmalı!
            },
            timeout: 120000,
          }
        );
        console.log("API cevabı:", res.data);

        res.data.forEach((flight, i) => {
          console.log(`Flight #${i}: id =`, flight.ticketId);
        });

        setFlights(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Uçuşlar alınamadı:", err);
      } finally {
        setLoading(false); // <-- YENİ
      }
    };

    if (origin && destination && date) {
      fetchFlights();
    }
  }, [origin, destination, date, adults, travelClass, userId]);

  // useEffect ile filtre ve sıralama otomatik çalışacak:
  useEffect(() => {
    let result = [...flights];

    if (priceLimit) {
      result = result.filter((f) => f.flight.price <= parseFloat(priceLimit));
    }

    if (sortOrder === "asc") {
      result.sort((a, b) => a.flight.price - b.flight.price);
    } else if (sortOrder === "desc") {
      result.sort((a, b) => b.flight.price - a.flight.price);
    }

    setFiltered(result);
  }, [priceLimit, sortOrder, flights]);

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setPriceLimit(priceLimit); // veya sadece input'un onChange'inde setPriceLimit kullanabilirsin
  };

  const handleBuy = (flight) => {
    navigate("/payment-page", {
      state: {
        flightNumber: flight.flight.flightNumber, // flight.flight.x şeklinde erişin
        departure: flight.flight.departureAirportId, // veya flight.flight.departure
        arrival: flight.flight.destinationAirportId, // veya flight.flight.destination
        price: flight.flight.price, // flight.flight.price olarak güncelleyin
        currency: "₺",
        ticketId: flight.ticketId,
        flightId: flight.flight.id,
      },
    });
  };

  if (!origin || !destination || !date) {
    navigate("/");
    return null;
  }

  return (
    <div className="results-container">
      <h1>Available Flights</h1>
      <p
        style={{
          textAlign: "center",
          fontSize: "1.2rem",
          color: "#555",
          marginBottom: "2rem",
        }}
      >
        Flights from <strong>{origin}</strong> to <strong>{destination}</strong>{" "}
        on <strong>{date}</strong>
      </p>

      <div className="filter-bar">
        <label>Max Price (₺):</label>
        <input
          type="number"
          value={priceLimit}
          onChange={(e) => setPriceLimit(e.target.value)}
        />
        <button onClick={handleFilter}>Apply Filter</button>
      </div>

      <div
        className="sort-bar"
        style={{ textAlign: "center", marginBottom: "1.5rem" }}
      >
        <button className="sort-button" onClick={() => handleSort("asc")}>
          Price: Ascending ↑
        </button>
        <button className="sort-button" onClick={() => handleSort("desc")}>
          Price: Descending ↓
        </button>
      </div>

      {filtered.length === 0 ? (
        <p style={{ textAlign: "center", fontStyle: "italic" }}>loading....</p>
      ) : (
        <div className="flight-list">
          {filtered.map((item) => (
            <div className="flight-card" key={item.ticketId}>
              <h3>
                {item.flight.departure} → {item.flight.destination}
              </h3>
              <p>Flight Number: {item.flight.flightNumber}</p>
              <p>
                Price: <strong>{item.flight.price} ₺</strong>
              </p>
              <p>Departure Time: {item.flight.departureTime}</p>
              <button onClick={() => handleBuy(item)}>Buy Ticket</button>
            </div>
          ))}
        </div>
      )}

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

export default FlightResults;
