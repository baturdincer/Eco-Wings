import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FlightForm.css";

const AddFlight = ({ flights, setFlights }) => {
  const [flight, setFlight] = useState({
    flightNumber: "",
    departure: "",
    arrival: "",
    date: "",
    price: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

    // Generate a new ID for the flight
    const newId = Math.max(...flights.map((f) => f.id), 0) + 1;

    // Create the new flight object
    const newFlight = {
      id: newId,
      ...flight,
      price: Number(flight.price),
    };

    // Update the flights state
    setFlights((prevFlights) => [...prevFlights, newFlight]);

    // Navigate back to the flights list
    navigate("/flights");
  };

  return (
    <div className="flight-form-container">
      <h2>Add New Flight</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Flight Number</label>
          <input
            type="text"
            name="flightNumber"
            value={flight.flightNumber}
            onChange={handleChange}
            placeholder="TW123"
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
            placeholder="IST"
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
            placeholder="JFK"
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
            placeholder="299"
            min="0"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Add Flight
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

export default AddFlight;
