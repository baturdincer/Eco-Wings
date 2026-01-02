// src/admin-panel/adminflights.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const emptyFlight = {
  flightNumber: "",
  departureAirportId: "",
  destinationAirportId: "",
  departureTime: "",
  estimatedArrivalTime: "",
  price: "",
  airlineId: "",
};

const AdminFlights = () => {
  const [flights, setFlights] = useState([]);
  const [form, setForm] = useState(emptyFlight);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [airports, setAirports] = useState([]);
  const [airlines, setAirlines] = useState([]);

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://localhost:5000/api/Flights");
      setFlights(res.data);
    } catch {
      setError("Failed to load flights.");
    }
    setLoading(false);
  };

  const fetchAirportsAndAirlines = async () => {
    try {
      const airportRes = await axios.get("https://localhost:5000/api/Airport");
      setAirports(airportRes.data);
      const airlineRes = await axios.get("https://localhost:5000/api/Airline");
      setAirlines(airlineRes.data);
    } catch {
      setError("Failed to load airports/airlines.");
    }
  };

  useEffect(() => {
    fetchFlights();
    fetchAirportsAndAirlines();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (
      !form.flightNumber ||
      !form.departureAirportId ||
      !form.destinationAirportId ||
      !form.departureTime ||
      !form.estimatedArrivalTime ||
      !form.price ||
      !form.airlineId
    ) {
      setError("All fields are required!");
      return;
    }

    try {
      if (editingId) {
        // UPDATE
        await axios.put(`https://localhost:5000/api/Flights/${editingId}`, {
          id: editingId,
          ...form,
          price: Number(form.price),
          departureAirportId: Number(form.departureAirportId),
          destinationAirportId: Number(form.destinationAirportId),
          airlineId: Number(form.airlineId),
        });
      } else {
        // CREATE
        await axios.post("https://localhost:5000/api/Flights", {
          ...form,
          price: Number(form.price),
          departureAirportId: Number(form.departureAirportId),
          destinationAirportId: Number(form.destinationAirportId),
          airlineId: Number(form.airlineId),
        });
      }
      setShowModal(false);
      setForm(emptyFlight);
      setEditingId(null);
      fetchFlights();
    } catch {
      setError("Operation failed.");
    }
  };

  const handleEdit = (flight) => {
    setForm({
      flightNumber: flight.flightNumber,
      departureAirportId: flight.departureAirportId,
      destinationAirportId: flight.destinationAirportId,
      departureTime: flight.departureTime
        ? flight.departureTime.split("T")[0] +
          "T" +
          flight.departureTime.split("T")[1].slice(0, 5)
        : "",
      estimatedArrivalTime: flight.estimatedArrivalTime
        ? flight.estimatedArrivalTime.split("T")[0] +
          "T" +
          flight.estimatedArrivalTime.split("T")[1].slice(0, 5)
        : "",
      price: flight.price,
      airlineId: flight.airlineId,
    });
    setEditingId(flight.id);
    setShowModal(true);
    setError("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this flight?")) {
      try {
        await axios.delete(`https://localhost:5000/api/Flights/${id}`);
        fetchFlights();
      } catch {
        alert("Could not delete!");
      }
    }
  };

  const handleAdd = () => {
    setForm(emptyFlight);
    setEditingId(null);
    setShowModal(true);
    setError("");
  };

  return (
    <div style={{ maxWidth: 1100, margin: "auto", padding: "2rem" }}>
      <h1>Flight Management</h1>
      <button
        onClick={handleAdd}
        style={{
          marginBottom: 16,
          background: "#0277bd",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: 8,
        }}
      >
        Add New Flight
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f3fafd" }}>
              <th>ID</th>
              <th>Flight No</th>
              <th>Departure Airport</th>
              <th>Arrival Airport</th>
              <th>Departure Time</th>
              <th>Estimated Arrival</th>
              <th>Price</th>
              <th>Airline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.length === 0 && (
              <tr>
                <td colSpan={9} style={{ textAlign: "center" }}>
                  No flights found
                </td>
              </tr>
            )}
            {flights.map((flight) => (
              <tr key={flight.id}>
                <td>{flight.id}</td>
                <td>{flight.flightNumber}</td>
                <td>
                  {airports.find((a) => a.id === flight.departureAirportId)
                    ?.name || flight.departureAirportId}
                </td>
                <td>
                  {airports.find((a) => a.id === flight.destinationAirportId)
                    ?.name || flight.destinationAirportId}
                </td>
                <td>
                  {flight.departureTime
                    ? flight.departureTime.replace("T", " ").substring(0, 16)
                    : ""}
                </td>
                <td>
                  {flight.estimatedArrivalTime
                    ? flight.estimatedArrivalTime
                        .replace("T", " ")
                        .substring(0, 16)
                    : ""}
                </td>
                <td>{flight.price} ₺</td>
                <td>
                  {airlines.find((al) => al.id === flight.airlineId)?.name ||
                    flight.airlineId}
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(flight)}
                    style={{ marginRight: 8 }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(flight.id)}
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
            background: "rgba(0,0,0,0.18)",
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
              minWidth: 400,
              maxWidth: 440,
              boxShadow: "0 8px 32px 0 rgba(2,119,189,0.12)",
            }}
          >
            <h2>{editingId ? "Edit Flight" : "Add New Flight"}</h2>
            {error && (
              <div style={{ color: "red", marginBottom: 12 }}>{error}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 12 }}>
                <label>Flight Number:</label>
                <input
                  type="text"
                  name="flightNumber"
                  value={form.flightNumber}
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
              <div style={{ marginBottom: 12 }}>
                <label>Departure Airport:</label>
                <select
                  name="departureAirportId"
                  value={form.departureAirportId}
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
                  {airports.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.code})
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label>Arrival Airport:</label>
                <select
                  name="destinationAirportId"
                  value={form.destinationAirportId}
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
                  {airports.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.code})
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label>Departure Time:</label>
                <input
                  type="datetime-local"
                  name="departureTime"
                  value={form.departureTime}
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
              <div style={{ marginBottom: 12 }}>
                <label>Estimated Arrival Time:</label>
                <input
                  type="datetime-local"
                  name="estimatedArrivalTime"
                  value={form.estimatedArrivalTime}
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
              <div style={{ marginBottom: 12 }}>
                <label>Price (₺):</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  min="0"
                  style={{
                    width: "100%",
                    padding: 7,
                    borderRadius: 6,
                    border: "1px solid #ddd",
                  }}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label>Airline:</label>
                <select
                  name="airlineId"
                  value={form.airlineId}
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
                  {airlines.map((al) => (
                    <option key={al.id} value={al.id}>
                      {al.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "#0277bd",
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

export default AdminFlights;
