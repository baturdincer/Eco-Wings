// src/admin-panel/adminticket.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const emptyTicket = {
  passengerId: "",
  flightId: "",
  bookingDate: "",
};

const AdminTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState(emptyTicket);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // For dropdowns
  const [passengers, setPassengers] = useState([]);
  const [flights, setFlights] = useState([]);

  // Fetch all tickets
  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://localhost:5000/api/Ticket");
      setTickets(res.data);
    } catch {
      setError("Failed to load tickets.");
    }
    setLoading(false);
  };

  // Fetch passengers and flights for select inputs
  const fetchPassengersAndFlights = async () => {
    try {
      const passengersRes = await axios.get("https://localhost:5000/api/User"); // Assuming passengers are users
      setPassengers(passengersRes.data);
      const flightsRes = await axios.get("https://localhost:5000/api/Flights");
      setFlights(flightsRes.data);
    } catch {
      setError("Failed to load passengers/flights.");
    }
  };

  useEffect(() => {
    fetchTickets();
    fetchPassengersAndFlights();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Add or update ticket
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.passengerId || !form.flightId || !form.bookingDate) {
      setError("All fields are required!");
      return;
    }
    try {
      if (editingId) {
        // Update
        await axios.put(`https://localhost:5000/api/Ticket/${editingId}`, {
          id: editingId,
          ...form,
          passengerId: Number(form.passengerId),
          flightId: Number(form.flightId),
        });
      } else {
        // Create
        await axios.post("https://localhost:5000/api/Ticket", {
          ...form,
          passengerId: Number(form.passengerId),
          flightId: Number(form.flightId),
        });
      }
      setShowModal(false);
      setForm(emptyTicket);
      setEditingId(null);
      fetchTickets();
    } catch {
      setError("Operation failed.");
    }
  };

  // Edit ticket
  const handleEdit = (ticket) => {
    setForm({
      passengerId: ticket.passengerId,
      flightId: ticket.flightId,
      bookingDate: ticket.bookingDate
        ? ticket.bookingDate.split("T")[0] +
          "T" +
          ticket.bookingDate.split("T")[1].slice(0, 5)
        : "",
    });
    setEditingId(ticket.id);
    setShowModal(true);
    setError("");
  };

  // Delete ticket
  const handleDelete = async (id) => {
    if (window.confirm("Delete this ticket?")) {
      try {
        await axios.delete(`https://localhost:5000/api/Ticket/${id}`);
        fetchTickets();
      } catch {
        alert("Could not delete!");
      }
    }
  };

  // Open modal for new ticket
  const handleAdd = () => {
    setForm(emptyTicket);
    setEditingId(null);
    setShowModal(true);
    setError("");
  };

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: "2rem" }}>
      <h1>Ticket Management</h1>
      <button
        onClick={handleAdd}
        style={{
          marginBottom: 16,
          background: "#f57f17",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: 8,
        }}
      >
        Add New Ticket
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#fff8e1" }}>
              <th>ID</th>
              <th>Passenger</th>
              <th>Flight</th>
              <th>Booking Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  No tickets found
                </td>
              </tr>
            )}
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>
                  {passengers.find((p) => p.id === ticket.passengerId)?.name ||
                    ticket.passengerId}
                </td>
                <td>
                  {flights.find((f) => f.id === ticket.flightId)
                    ?.flightNumber || ticket.flightId}
                </td>
                <td>
                  {ticket.bookingDate
                    ? ticket.bookingDate.replace("T", " ").substring(0, 16)
                    : ""}
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(ticket)}
                    style={{ marginRight: 8 }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ticket.id)}
                    style={{
                      color: "white",
                      background: "#d32f2f",
                      border: "none",
                      padding: "4px 10px",
                      borderRadius: 4,
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.12)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="modal"
            style={{
              background: "white",
              padding: 32,
              borderRadius: 16,
              minWidth: 350,
              maxWidth: 430,
              boxShadow: "0 8px 32px 0 rgba(245,127,23,0.14)",
            }}
          >
            <h2>{editingId ? "Edit Ticket" : "Add New Ticket"}</h2>
            {error && (
              <div style={{ color: "red", marginBottom: 12 }}>{error}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 12 }}>
                <label>Passenger:</label>
                <select
                  name="passengerId"
                  value={form.passengerId}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: 7,
                    borderRadius: 6,
                    border: "1px solid #ddd",
                  }}
                >
                  <option value="">Select</option>
                  {passengers.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.email})
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label>Flight:</label>
                <select
                  name="flightId"
                  value={form.flightId}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: 7,
                    borderRadius: 6,
                    border: "1px solid #ddd",
                  }}
                >
                  <option value="">Select</option>
                  {flights.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.flightNumber} ({f.departureAirportId} →{" "}
                      {f.destinationAirportId})
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label>Booking Date:</label>
                <input
                  type="datetime-local"
                  name="bookingDate"
                  value={form.bookingDate}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: 7,
                    borderRadius: 6,
                    border: "1px solid #ddd",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "#f57f17",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: 8,
                }}
              >
                {editingId ? "Save" : "Add"}
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  width: "100%",
                  marginTop: 8,
                  background: "#aaa",
                  color: "white",
                  padding: "8px",
                  border: "none",
                  borderRadius: 8,
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTicket;
