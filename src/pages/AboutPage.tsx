import React from 'react';

const AboutPage = () => {
  const milestones = [
    { year: 2018, event: "Founded with a mission to simplify freight coordination" },
    { year: 2019, event: "Launched our first digital documentation platform" },
    { year: 2020, event: "Expanded services to include risk advisory" },
    { year: 2021, event: "Introduced AI-powered quote engine" },
    { year: 2022, event: "Reached 1,000+ business clients globally" },
    { year: 2023, event: "Opened regional offices in Asia and Europe" }
  ];

  return (
    <div className="page-container">
      <h1>Who We Are</h1>
      <div className="page-content">
        <div className="about-intro">
          <p className="about-mission">
            Born out of the need for simplicity in freight, we use tech to empower shippers globally.
          </p>
        </div>
        
        <div className="about-story">
          <h2>Our Story</h2>
          <p>
            FreightSync was founded by a team of logistics professionals who experienced 
            firsthand the inefficiencies and complexities of traditional freight forwarding. 
            We set out to create a solution that combines industry expertise with modern 
            technology to make shipping simpler, more transparent, and more efficient.
          </p>
          <p>
            Today, we serve businesses of all sizes across the globe, helping them navigate 
            the complexities of international shipping with confidence and ease.
          </p>
        </div>

        <div className="about-timeline">
          <h2>Our Journey</h2>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">{milestone.event}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-values">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Transparency</h3>
              <p>We believe in clear communication and visibility throughout the shipping process.</p>
            </div>
            <div className="value-card">
              <h3>Innovation</h3>
              <p>We continuously improve our technology to better serve our clients.</p>
            </div>
            <div className="value-card">
              <h3>Reliability</h3>
              <p>We deliver on our promises and prioritize consistency in our service.</p>
            </div>
            <div className="value-card">
              <h3>Expertise</h3>
              <p>We combine industry knowledge with technological solutions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;