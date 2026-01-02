import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./FlightForm.css";

const EditFlight = ({ flights, setFlights }) => {
  const { id } = useParams();
  const [flight, setFlight] = useState({
    flightNumber: "",
    departure: "",
    arrival: "",
    date: "",
    price: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const flightToEdit = flights.find((f) => f.id === parseInt(id));
    if (flightToEdit) {
      setFlight(flightToEdit);
    } else {
      setError("Flight not found");
    }
  }, [id, flights]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlight((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !flight.flightNumber ||
      !flight.departure ||
      !flight.arrival ||
      !flight.date ||
      !flight.price
    ) {
      setError("Please fill in all fields");
      return;
    }

    // Update the flight in the flights array
    setFlights((prevFlights) =>
      prevFlights.map((f) =>
        f.id === parseInt(id) ? { ...flight, price: Number(flight.price) } : f
      )
    );

    // Navigate back to the flights list
    navigate("/flights");
  };

  return (
    <div className="flight-form-container">
      <h2>Edit Flight</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Flight Number</label>
          <input
            type="text"
            name="flightNumber"
            value={flight.flightNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Departure Airport</label>
          <input
            type="text"
            name="departure"
            value={flight.departure}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Arrival Airport</label>
          <input
            type="text"
            name="arrival"
            value={flight.arrival}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={flight.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price ($)</label>
          <input
            type="number"
            name="price"
            value={flight.price}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Update Flight
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/flights")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFlight;
