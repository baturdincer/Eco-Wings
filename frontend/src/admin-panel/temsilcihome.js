import React from 'react';
import { Link } from 'react-router-dom';
import './temsilcihome.css';

const TemsilciHome = () => {
  const temsilciPages = [
    {
      title: 'Ticket Management',
      description: 'Manage tickets',
      icon: '🎫',
      path: '/admin-ticket',
      color: '#f57f17'
    },
    {
      title: 'Airline Management',
      description: 'Manage airlines',
      icon: '🛩️',
      path: '/admin-airline',
      color: '#6a1b9a'
    }
  ];

  return (
    <div className="temsilci-home-container">
      <h1>Company Representative Panel</h1>
      <div className="temsilci-grid">
        {temsilciPages.map((page, index) => (
          <Link to={page.path} className="temsilci-card" key={index} style={{ '--card-color': page.color }}>
            <div className="card-icon">{page.icon}</div>
            <h2>{page.title}</h2>
            <p>{page.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TemsilciHome; 