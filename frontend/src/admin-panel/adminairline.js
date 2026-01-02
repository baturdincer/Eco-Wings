// src/admin-panel/adminairline.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const emptyAirline = {
  name: "",
  country: "",
};

const AdminAirline = () => {
  const [airlines, setAirlines] = useState([]);
  const [form, setForm] = useState(emptyAirline);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch airlines
  const fetchAirlines = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://localhost:5000/api/Airline");
      setAirlines(res.data);
    } catch {
      setError("Failed to load airlines.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAirlines();
  }, []);

  // Form input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Add or update airline
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.country) {
      setError("All fields are required!");
      return;
    }
    try {
      if (editingId) {
        // Update
        await axios.put(`https://localhost:5000/api/Airline/${editingId}`, {
          id: editingId,
          ...form,
        });
      } else {
        // Create
        await axios.post("https://localhost:5000/api/Airline", form);
      }
      setShowModal(false);
      setForm(emptyAirline);
      setEditingId(null);
      fetchAirlines();
    } catch {
      setError("Operation failed.");
    }
  };

  // Edit airline
  const handleEdit = (airline) => {
    setForm({
      name: airline.name,
      country: airline.country,
    });
    setEditingId(airline.id);
    setShowModal(true);
    setError("");
  };

  // Delete airline
  const handleDelete = async (id) => {
    if (window.confirm("Delete this airline?")) {
      try {
        await axios.delete(`https://localhost:5000/api/Airline/${id}`);
        fetchAirlines();
      } catch {
        alert("Could not delete!");
      }
    }
  };

  // Open modal for new airline
  const handleAdd = () => {
    setForm(emptyAirline);
    setEditingId(null);
    setShowModal(true);
    setError("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: "2rem" }}>
      <h1>Airline Management</h1>
      <button
        onClick={handleAdd}
        style={{
          marginBottom: 16,
          background: "#6a1b9a",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: 8,
        }}
      >
        Add New Airline
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f3e5f5" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {airlines.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  No airlines found
                </td>
              </tr>
            )}
            {airlines.map((airline) => (
              <tr key={airline.id}>
                <td>{airline.id}</td>
                <td>{airline.name}</td>
                <td>{airline.country}</td>
                <td>
                  <button
                    onClick={() => handleEdit(airline)}
                    style={{ marginRight: 8 }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(airline.id)}
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
            background: "rgba(0,0,0,0.13)",
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
              minWidth: 320,
              maxWidth: 420,
              boxShadow: "0 8px 32px 0 rgba(106,27,154,0.15)",
            }}
          >
            <h2>{editingId ? "Edit Airline" : "Add New Airline"}</h2>
            {error && (
              <div style={{ color: "red", marginBottom: 12 }}>{error}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 14 }}>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
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
              <div style={{ marginBottom: 16 }}>
                <label>Country:</label>
                <input
                  type="text"
                  name="country"
                  value={form.country}
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
                  background: "#6a1b9a",
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

export default AdminAirline;
