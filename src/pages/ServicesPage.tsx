import React from 'react';

const ServicesPage = () => {
  const services = [
    "Freight Coordination & Quoting",
    "Customs Documentation Assistance",
    "Risk-Advisory for Volatile Routes",
    "Client Tracking Dashboard"
  ];

  return (
    <div className="page-container">
      <h1>Our Services</h1>
      <div className="page-content">
        <div className="services-list">
          {services.map((service, index) => (
            <div key={index} className="service-item">
              <div className="service-icon">✓</div>
              <div className="service-text">{service}</div>
            </div>
          ))}
        </div>
        <div className="service-details">
          <h2>How We Work</h2>
          <p>
            Our team of logistics experts combines industry knowledge with cutting-edge 
            technology to streamline your shipping process from quote to delivery.
          </p>
          <p>
            We handle the complexities of international shipping so you can focus on 
            your core business operations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;