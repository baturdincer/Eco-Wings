import React, { useEffect, useState } from "react";

const FlightTracking = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // localStorage'dan userId çek
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("Kullanıcı girişi bulunamadı. Lütfen tekrar giriş yapın.");
      setLoading(false);
      return;
    }

    const fetchTickets = async () => {
      try {
        const res = await fetch(
          `https://localhost:5000/api/Ticket/user/${userId}`
        );
        if (!res.ok) throw new Error("Biletler bulunamadı.");
        const data = await res.json();
        if (!data || data.length === 0) throw new Error("No tickets found.");
        setTickets(data);
      } catch (err) {
        setError("No tickets found. !");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Ticket Tracking</h2>
        {loading && <p>loading...</p>}
        {error && <div className="error-message">{error}</div>}
        {!loading && tickets.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <h3>Your tickets:</h3>
            {tickets.map((ticket, idx) => (
              <div
                key={ticket.id || idx}
                style={{
                  background: "#f8f4ff",
                  borderRadius: "16px",
                  padding: "1.2rem",
                  boxShadow: "0 4px 12px #6a11cb22",
                  marginTop: "1rem",
                  fontSize: "1.05rem",
                }}
              >
                <p>
                  <strong>Bilet ID:</strong>{" "}
                  {ticket.ticketId || ticket.id || "-"}
                </p>
                <p>
                  <strong>Flight Number:</strong> {ticket.flightNumber || "-"}
                </p>

                <p>
                  <strong>Departure Time:</strong> {ticket.departureTime || "-"}
                </p>
                <p>
                  <strong>Estimated Arrival:</strong>{" "}
                  {ticket.estimatedArrivalTime || "-"}
                </p>
                <p>
                  <strong>From:</strong> {ticket.from || "-"}
                </p>
                <p>
                  <strong>To:</strong> {ticket.to || "-"}
                </p>

                <p>
                  <strong>Price:</strong> {ticket.price || "-"}₺
                </p>
                <p>
                  <strong>PNR Code:</strong> {ticket.pnrCode || "-"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightTracking;
