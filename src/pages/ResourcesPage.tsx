import React from 'react';

const ResourcesPage = () => {
  const resources = [
    { title: "2023 Global Shipping Trends", type: "Guide", description: "An overview of current shipping trends and forecasts." },
    { title: "Customs Documentation Checklist", type: "Template", description: "Essential documents for international shipping." },
    { title: "Risk Management in Logistics", type: "Whitepaper", description: "Strategies for mitigating shipping risks." },
    { title: "Shipping Regulations Update", type: "News", description: "Recent changes to international shipping regulations." }
  ];

  return (
    <div className="page-container">
      <h1>Knowledge Hub</h1>
      <div className="page-content">
        <p className="resources-intro">
          Stay informed with our latest guides, regulations, and shipping trends.
        </p>
        
        <div className="resources-filter">
          <h2>Browse Resources</h2>
          <div className="filter-buttons">
            <button className="filter-btn active">All</button>
            <button className="filter-btn">Guides</button>
            <button className="filter-btn">Templates</button>
            <button className="filter-btn">Whitepapers</button>
            <button className="filter-btn">News</button>
          </div>
        </div>

        <div className="resources-grid">
          {resources.map((resource, index) => (
            <div key={index} className="resource-card">
              <div className="resource-type">{resource.type}</div>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <a href="#" className="resource-link">Read More</a>
            </div>
          ))}
        </div>

        <div className="subscribe-section">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for the latest shipping insights and resources.</p>
          <div className="subscribe-form">
            <input type="email" placeholder="Your email address" />
            <button className="subscribe-btn">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;