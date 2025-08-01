import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="page-container">
      <div className="hero-section">
        <h1>Digitally Coordinated Freight Services</h1>
        <p className="hero-subtitle">Global shipping, document handling, and risk mitigation — made simple for your business.</p>
        <Link to="/contact" className="cta-button">Get a Quote</Link>
      </div>
      <div className="page-content">
        <div className="features-section">
          <div className="feature">
            <h2>Global Reach</h2>
            <p>Connect with shipping partners worldwide through our digital platform.</p>
          </div>
          <div className="feature">
            <h2>Document Handling</h2>
            <p>Streamline customs documentation and compliance requirements.</p>
          </div>
          <div className="feature">
            <h2>Risk Mitigation</h2>
            <p>Identify and address potential shipping risks before they impact your business.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;