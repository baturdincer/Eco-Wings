import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FlightList.css";

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Initialize with some sample flights
  useEffect(() => {
    const mockFlights = [
      {
        id: 1,
        flightNumber: "TW101",
        departure: "IST",
        arrival: "JFK",
        date: "2023-06-15",
        price: 299,
      },
      {
        id: 2,
        flightNumber: "TW202",
        departure: "JFK",
        arrival: "LAX",
        date: "2023-06-16",
        price: 199,
      },
      {
        id: 3,
        flightNumber: "TW303",
        departure: "LAX",
        arrival: "IST",
        date: "2023-06-17",
        price: 349,
      },
    ];
    setFlights(mockFlights);
    setLoading(false);
  }, []);

  const handleAddFlight = () => {
    navigate("/add-flight");
  };

  const handleEdit = (flightId) => {
    navigate(`/edit-flight/${flightId}`);
  };

  const handleDelete = (flightId) => {
    setFlights(flights.filter((flight) => flight.id !== flightId));
  };

  if (loading) return <div>Loading flights...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="flight-list-container">
      <h2>Available Flights</h2>
      <button className="add-flight-button" onClick={handleAddFlight}>
        Add New Flight
      </button>

      <table className="flights-table">
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Date</th>
            <th>Price ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.flightNumber}</td>
              <td>{flight.departure}</td>
              <td>{flight.arrival}</td>
              <td>{flight.date}</td>
              <td>{flight.price}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(flight.id)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(flight.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightList;
