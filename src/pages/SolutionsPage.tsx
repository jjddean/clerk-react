import React from 'react';

const SolutionsPage = () => {
  const industries = [
    { name: "Small & Medium Enterprises", description: "Tailored solutions for growing businesses with limited logistics resources." },
    { name: "Enterprise Organizations", description: "Comprehensive freight management for complex global supply chains." },
    { name: "Sensitive Exports", description: "Specialized handling for high-value, time-sensitive, or regulated goods." },
    { name: "Regional Specialists", description: "Expertise in specific trade lanes and regional shipping requirements." }
  ];

  return (
    <div className="page-container">
      <h1>Tailored Logistics Solutions</h1>
      <div className="page-content">
        <p className="solutions-intro">
          From SMEs to sensitive exports — we customize services by industry and region.
        </p>
        
        <div className="industry-solutions">
          <h2>Industry-Specific Approaches</h2>
          <div className="industry-grid">
            {industries.map((industry, index) => (
              <div key={index} className="industry-card">
                <h3>{industry.name}</h3>
                <p>{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="solution-benefits">
          <h2>Why Choose Our Solutions</h2>
          <ul className="benefits-list">
            <li>Customized pricing models based on your shipping volume and needs</li>
            <li>Dedicated account managers for enterprise clients</li>
            <li>Specialized handling protocols for sensitive shipments</li>
            <li>Regional experts to navigate local regulations and requirements</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SolutionsPage;