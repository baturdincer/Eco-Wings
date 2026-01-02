import React, { useEffect, useState } from "react";
import axios from "axios";

const emptyAirport = {
  code: "",
  name: "",
  country: "",
  city: "",
  timeZone: "",
};

const AdminAirport = () => {
  const [airports, setAirports] = useState([]);
  const [form, setForm] = useState(emptyAirport);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all airports
  const fetchAirports = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://localhost:5000/api/Airport");
      setAirports(res.data);
    } catch {
      setError("Failed to load airports.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAirports();
  }, []);

  // Form change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Add or update airport
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (
      !form.code ||
      !form.name ||
      !form.country ||
      !form.city ||
      !form.timeZone
    ) {
      setError("All fields are required!");
      return;
    }
    try {
      if (editingId) {
        // Update
        await axios.put(`https://localhost:5000/api/Airport/${editingId}`, {
          id: editingId,
          ...form,
        });
      } else {
        // Create
        await axios.post("https://localhost:5000/api/Airport", form);
      }
      setShowModal(false);
      setForm(emptyAirport);
      setEditingId(null);
      fetchAirports();
    } catch {
      setError("Operation failed.");
    }
  };

  // Edit airport
  const handleEdit = (airport) => {
    setForm({
      code: airport.code,
      name: airport.name,
      country: airport.country,
      city: airport.city,
      timeZone: airport.timeZone,
    });
    setEditingId(airport.id);
    setShowModal(true);
    setError("");
  };

  // Delete airport
  const handleDelete = async (id) => {
    if (window.confirm("Delete this airport?")) {
      try {
        await axios.delete(`https://localhost:5000/api/Airport/${id}`);
        fetchAirports();
      } catch {
        alert("Could not delete!");
      }
    }
  };

  // Open modal for new airport
  const handleAdd = () => {
    setForm(emptyAirport);
    setEditingId(null);
    setShowModal(true);
    setError("");
  };

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: "2rem" }}>
      <h1>Airport Management</h1>
      <button
        onClick={handleAdd}
        style={{
          marginBottom: 16,
          background: "#2e7d32",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: 8,
        }}
      >
        Add New Airport
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#e8f5e9" }}>
              <th>ID</th>
              <th>Code</th>
              <th>Name</th>
              <th>Country</th>
              <th>City</th>
              <th>Time Zone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {airports.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>
                  No airports found
                </td>
              </tr>
            )}
            {airports.map((airport) => (
              <tr key={airport.id}>
                <td>{airport.id}</td>
                <td>{airport.code}</td>
                <td>{airport.name}</td>
                <td>{airport.country}</td>
                <td>{airport.city}</td>
                <td>{airport.timeZone}</td>
                <td>
                  <button
                    onClick={() => handleEdit(airport)}
                    style={{ marginRight: 8 }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(airport.id)}
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
            background: "rgba(0,0,0,0.15)",
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
              maxWidth: 420,
              boxShadow: "0 8px 32px 0 rgba(46,125,50,0.15)",
            }}
          >
            <h2>{editingId ? "Edit Airport" : "Add New Airport"}</h2>
            {error && (
              <div style={{ color: "red", marginBottom: 12 }}>{error}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 12 }}>
                <label>Code:</label>
                <input
                  type="text"
                  name="code"
                  value={form.code}
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
              <div style={{ marginBottom: 12 }}>
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
              <div style={{ marginBottom: 12 }}>
                <label>City:</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
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
                <label>Time Zone:</label>
                <input
                  type="text"
                  name="timeZone"
                  value={form.timeZone}
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
                  background: "#2e7d32",
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

export default AdminAirport;
