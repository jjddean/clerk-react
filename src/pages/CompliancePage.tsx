import React, { useState } from 'react';

const CompliancePage = () => {
  const [activeTab, setActiveTab] = useState('documents');
  
  const documents = [
    { id: 'DOC-2023-105', name: 'Commercial Invoice', shipment: 'SH-2023-001', status: 'Pending', required: true, dueDate: '2023-11-10' },
    { id: 'DOC-2023-106', name: 'Packing List', shipment: 'SH-2023-001', status: 'Approved', required: true, dueDate: '2023-11-10' },
    { id: 'DOC-2023-107', name: 'Certificate of Origin', shipment: 'SH-2023-002', status: 'Pending', required: true, dueDate: '2023-11-05' },
    { id: 'DOC-2023-108', name: 'Dangerous Goods Declaration', shipment: 'SH-2023-002', status: 'Not Required', required: false, dueDate: 'N/A' },
    { id: 'DOC-2023-109', name: 'Import License', shipment: 'SH-2023-004', status: 'Pending', required: true, dueDate: '2023-11-15' },
    { id: 'DOC-2023-110', name: 'Insurance Certificate', shipment: 'SH-2023-004', status: 'Approved', required: true, dueDate: '2023-11-15' },
  ];

  const regulations = [
    { region: 'European Union', name: 'EU Import Control System 2 (ICS2)', status: 'Compliant', lastUpdated: '2023-10-15' },
    { region: 'United States', name: 'Customs Trade Partnership Against Terrorism (CTPAT)', status: 'Compliant', lastUpdated: '2023-09-20' },
    { region: 'China', name: 'China Customs Advanced Manifest Rule', status: 'Review Required', lastUpdated: '2023-08-10' },
    { region: 'Global', name: 'International Maritime Dangerous Goods Code', status: 'Compliant', lastUpdated: '2023-07-05' },
  ];

  return (
    <div className="page-container">
      <h1>Compliance Center</h1>
      <p className="compliance-intro">Track customs filings, export declarations, and region-specific forms.</p>
      
      <div className="page-content">
        <div className="compliance-tabs">
          <button 
            className={`tab-button ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            Required Documents
          </button>
          <button 
            className={`tab-button ${activeTab === 'regulations' ? 'active' : ''}`}
            onClick={() => setActiveTab('regulations')}
          >
            Regulatory Compliance
          </button>
        </div>

        {activeTab === 'documents' && (
          <div className="documents-section">
            <div className="documents-header">
              <h2>Shipment Documents</h2>
              <div className="document-actions">
                <button className="upload-doc-btn">+ Upload Document</button>
                <select className="filter-select">
                  <option value="all">All Shipments</option>
                  <option value="SH-2023-001">SH-2023-001</option>
                  <option value="SH-2023-002">SH-2023-002</option>
                  <option value="SH-2023-004">SH-2023-004</option>
                </select>
              </div>
            </div>

            <div className="documents-table-container">
              <table className="documents-table">
                <thead>
                  <tr>
                    <th>Document ID</th>
                    <th>Document Name</th>
                    <th>Shipment</th>
                    <th>Required</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc, index) => (
                    <tr key={index}>
                      <td>{doc.id}</td>
                      <td>{doc.name}</td>
                      <td>{doc.shipment}</td>
                      <td>{doc.required ? 'Yes' : 'No'}</td>
                      <td>{doc.dueDate}</td>
                      <td>
                        <span className={`status-badge status-${doc.status.toLowerCase().replace(' ', '-')}`}>
                          {doc.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          {doc.status === 'Approved' && (
                            <button className="action-btn view-btn">View</button>
                          )}
                          {doc.status === 'Pending' && (
                            <button className="action-btn upload-btn">Upload</button>
                          )}
                          <button className="action-btn info-btn">Info</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="document-templates">
              <h3>Document Templates</h3>
              <p>Download templates for commonly required shipping documents:</p>
              <div className="template-buttons">
                <button className="template-btn">Commercial Invoice</button>
                <button className="template-btn">Packing List</button>
                <button className="template-btn">Certificate of Origin</button>
                <button className="template-btn">Dangerous Goods Declaration</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'regulations' && (
          <div className="regulations-section">
            <div className="regulations-header">
              <h2>Regulatory Compliance Status</h2>
              <div className="region-filter">
                <label>Filter by Region:</label>
                <select className="filter-select">
                  <option value="all">All Regions</option>
                  <option value="European Union">European Union</option>
                  <option value="United States">United States</option>
                  <option value="China">China</option>
                  <option value="Global">Global</option>
                </select>
              </div>
            </div>

            <div className="regulations-table-container">
              <table className="regulations-table">
                <thead>
                  <tr>
                    <th>Region</th>
                    <th>Regulation</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {regulations.map((reg, index) => (
                    <tr key={index}>
                      <td>{reg.region}</td>
                      <td>{reg.name}</td>
                      <td>
                        <span className={`status-badge status-${reg.status.toLowerCase().replace(' ', '-')}`}>
                          {reg.status}
                        </span>
                      </td>
                      <td>{reg.lastUpdated}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn details-btn">Details</button>
                          {reg.status === 'Review Required' && (
                            <button className="action-btn review-btn">Review</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="compliance-updates">
              <h3>Recent Regulatory Updates</h3>
              <div className="updates-list">
                <div className="update-item">
                  <div className="update-date">November 1, 2023</div>
                  <div className="update-content">
                    <h4>EU ICS2 Phase 2 Implementation</h4>
                    <p>The second phase of the EU's Import Control System 2 is now in effect for all air cargo. Updated filing requirements are available in the documentation section.</p>
                  </div>
                </div>
                <div className="update-item">
                  <div className="update-date">October 15, 2023</div>
                  <div className="update-content">
                    <h4>US CTPAT Program Updates</h4>
                    <p>New security criteria for the Customs Trade Partnership Against Terrorism program have been announced. Review the changes to ensure continued compliance.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompliancePage;