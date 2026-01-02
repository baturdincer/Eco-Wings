import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./adminhome.css";

const AdminHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = Number(localStorage.getItem("role"));
    const token = localStorage.getItem("token");

    // Eğer token yoksa ya da role admin değilse, engelle
    if (!token || role !== 2) {
      alert("Bu sayfaya erişim izniniz yok.");
      navigate("/"); // anasayfaya yönlendir
    }
  }, [navigate]);

  const adminPages = [
    {
      title: "User Management",
      description: "Manage users",
      icon: "👥",
      path: "/admin-user",
      color: "#1a237e",
    },
    {
      title: "Campaign Management",
      description: "Manage campaigns",
      icon: "🎯",
      path: "/admin-campaigns",
      color: "#c2185b",
    },
    {
      title: "Flight Management",
      description: "Manage flights",
      icon: "✈️",
      path: "/admin-flights",
      color: "#0277bd",
    },
    {
      title: "Airport Management",
      description: "Manage airports",
      icon: "🏢",
      path: "/admin-airport",
      color: "#2e7d32",
    },
    {
      title: "Ticket Management",
      description: "Manage tickets",
      icon: "🎫",
      path: "/admin-ticket",
      color: "#f57f17",
    },
    {
      title: "Airline Management",
      description: "Manage airlines",
      icon: "🛩️",
      path: "/admin-airline",
      color: "#6a1b9a",
    },
  ];

  return (
    <div className="admin-home-container">
      <h1>Admin Panel</h1>
      <div className="admin-grid">
        {adminPages.map((page, index) => (
          <Link
            to={page.path}
            className="admin-card"
            key={index}
            style={{ "--card-color": page.color }}
          >
            <div className="card-icon">{page.icon}</div>
            <h2>{page.title}</h2>
            <p>{page.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
