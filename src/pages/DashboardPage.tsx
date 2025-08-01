import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const recentShipments = [
    { id: 'SH-2023-001', origin: 'New York', destination: 'London', status: 'In Transit' },
    { id: 'SH-2023-002', origin: 'Shanghai', destination: 'Los Angeles', status: 'Customs Clearance' },
    { id: 'SH-2023-003', origin: 'Hamburg', destination: 'Dubai', status: 'Delivered' },
  ];

  const pendingDocuments = [
    { name: 'Commercial Invoice', shipment: 'SH-2023-001', status: 'Pending' },
    { name: 'Certificate of Origin', shipment: 'SH-2023-002', status: 'Pending' },
  ];

  return (
    <div className="page-container">
      <h1>Welcome to Your Dashboard</h1>
      <p className="dashboard-intro">Manage shipments, track documents, and message your coordinator.</p>
      
      <div className="page-content">
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>Recent Shipments</h2>
            <div className="shipment-list">
              {recentShipments.map((shipment, index) => (
                <div key={index} className="shipment-item">
                  <div className="shipment-id">{shipment.id}</div>
                  <div className="shipment-route">{shipment.origin} → {shipment.destination}</div>
                  <div className={`shipment-status status-${shipment.status.toLowerCase().replace(' ', '-')}`}>
                    {shipment.status}
                  </div>
                </div>
              ))}
            </div>
            <Link to="/shipments" className="dashboard-link">View All Shipments</Link>
          </div>

          <div className="dashboard-card">
            <h2>Pending Documents</h2>
            {pendingDocuments.length > 0 ? (
              <div className="document-list">
                {pendingDocuments.map((doc, index) => (
                  <div key={index} className="document-item">
                    <div className="document-name">{doc.name}</div>
                    <div className="document-shipment">For: {doc.shipment}</div>
                    <div className="document-status">{doc.status}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-items">No pending documents</p>
            )}
            <Link to="/compliance" className="dashboard-link">View All Documents</Link>
          </div>

          <div className="dashboard-card">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <Link to="/shipments" className="action-button">New Shipment</Link>
              <Link to="/payments" className="action-button">Make Payment</Link>
              <Link to="/reports" className="action-button">Generate Report</Link>
              <Link to="/compliance" className="action-button">Upload Document</Link>
            </div>
          </div>

          <div className="dashboard-card">
            <h2>Account Summary</h2>
            <div className="account-summary">
              <div className="summary-item">
                <div className="summary-label">Active Shipments</div>
                <div className="summary-value">5</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Pending Invoices</div>
                <div className="summary-value">2</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Documents Requiring Action</div>
                <div className="summary-value">3</div>
              </div>
            </div>
            <Link to="/account" className="dashboard-link">Account Settings</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;