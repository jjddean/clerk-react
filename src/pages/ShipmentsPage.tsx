import React, { useState } from 'react';

const ShipmentsPage = () => {
  const [activeTab, setActiveTab] = useState('active');
  
  const shipments = {
    active: [
      { id: 'SH-2023-001', origin: 'New York', destination: 'London', status: 'In Transit', eta: '2023-11-15', carrier: 'OceanFreight Ltd' },
      { id: 'SH-2023-002', origin: 'Shanghai', destination: 'Los Angeles', status: 'Customs Clearance', eta: '2023-11-10', carrier: 'AsiaExpress Shipping' },
      { id: 'SH-2023-004', origin: 'Rotterdam', destination: 'Singapore', status: 'Loading', eta: '2023-11-20', carrier: 'EuroAsia Lines' },
      { id: 'SH-2023-005', origin: 'Miami', destination: 'Rio de Janeiro', status: 'Booking Confirmed', eta: '2023-11-25', carrier: 'Americas Shipping Co' },
    ],
    completed: [
      { id: 'SH-2023-003', origin: 'Hamburg', destination: 'Dubai', status: 'Delivered', eta: '2023-10-30', carrier: 'MidEast Carriers' },
      { id: 'SH-2022-045', origin: 'Tokyo', destination: 'Sydney', status: 'Delivered', eta: '2022-12-15', carrier: 'PacificRoute Shipping' },
      { id: 'SH-2022-032', origin: 'Vancouver', destination: 'Hong Kong', status: 'Delivered', eta: '2022-11-05', carrier: 'TransPacific Lines' },
    ]
  };

  return (
    <div className="page-container">
      <h1>Your Shipments</h1>
      <p className="shipments-intro">View active and past shipments, with real-time updates.</p>
      
      <div className="page-content">
        <div className="shipments-tabs">
          <button 
            className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Active Shipments
          </button>
          <button 
            className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed Shipments
          </button>
        </div>

        <div className="shipments-controls">
          <div className="search-filter">
            <input type="text" placeholder="Search shipments..." className="search-input" />
            <select className="filter-select">
              <option value="">All Carriers</option>
              <option value="OceanFreight Ltd">OceanFreight Ltd</option>
              <option value="AsiaExpress Shipping">AsiaExpress Shipping</option>
              <option value="EuroAsia Lines">EuroAsia Lines</option>
              <option value="Americas Shipping Co">Americas Shipping Co</option>
              <option value="MidEast Carriers">MidEast Carriers</option>
            </select>
          </div>
          <button className="new-shipment-btn">+ New Shipment</button>
        </div>

        <div className="shipments-table-container">
          <table className="shipments-table">
            <thead>
              <tr>
                <th>Shipment ID</th>
                <th>Route</th>
                <th>Carrier</th>
                <th>Status</th>
                <th>ETA</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shipments[activeTab as keyof typeof shipments].map((shipment, index) => (
                <tr key={index}>
                  <td>{shipment.id}</td>
                  <td>{shipment.origin} → {shipment.destination}</td>
                  <td>{shipment.carrier}</td>
                  <td>
                    <span className={`status-badge status-${shipment.status.toLowerCase().replace(' ', '-')}`}>
                      {shipment.status}
                    </span>
                  </td>
                  <td>{shipment.eta}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn view-btn">View</button>
                      {activeTab === 'active' && (
                        <button className="action-btn track-btn">Track</button>
                      )}
                      {activeTab === 'completed' && (
                        <button className="action-btn docs-btn">Docs</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {activeTab === 'active' && (
          <div className="shipment-map-container">
            <h2>Shipment Tracking Map</h2>
            <div className="shipment-map-placeholder">
              <p>Interactive map showing current shipment locations would appear here.</p>
              <p>Select a shipment to view detailed tracking information.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShipmentsPage;