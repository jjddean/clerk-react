import React, { useState } from 'react';

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const recentReports = [
    { id: 'RPT-2023-042', name: 'Monthly Shipping Summary', date: '2023-10-31', type: 'Automated' },
    { id: 'RPT-2023-041', name: 'Route Cost Analysis', date: '2023-10-25', type: 'Custom' },
    { id: 'RPT-2023-040', name: 'Carrier Performance', date: '2023-10-20', type: 'Automated' },
    { id: 'RPT-2023-039', name: 'Documentation Compliance', date: '2023-10-15', type: 'Custom' },
  ];

  // Mock data for charts
  const monthlyShipments = [
    { month: 'Jun', count: 12 },
    { month: 'Jul', count: 19 },
    { month: 'Aug', count: 15 },
    { month: 'Sep', count: 22 },
    { month: 'Oct', count: 28 },
    { month: 'Nov', count: 10 },
  ];

  const carrierDistribution = [
    { carrier: 'OceanFreight Ltd', percentage: 35 },
    { carrier: 'AsiaExpress Shipping', percentage: 25 },
    { carrier: 'EuroAsia Lines', percentage: 20 },
    { carrier: 'Americas Shipping Co', percentage: 15 },
    { carrier: 'Others', percentage: 5 },
  ];

  return (
    <div className="page-container">
      <h1>Analytics & Reports</h1>
      <p className="reports-intro">See trends, shipping KPIs, and service usage metrics.</p>
      
      <div className="page-content">
        <div className="reports-tabs">
          <button 
            className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Analytics Dashboard
          </button>
          <button 
            className={`tab-button ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            Reports Library
          </button>
          <button 
            className={`tab-button ${activeTab === 'custom' ? 'active' : ''}`}
            onClick={() => setActiveTab('custom')}
          >
            Custom Reports
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="analytics-dashboard">
            <div className="kpi-cards">
              <div className="kpi-card">
                <h3>Total Shipments</h3>
                <div className="kpi-value">106</div>
                <div className="kpi-trend positive">↑ 12% from last month</div>
              </div>
              <div className="kpi-card">
                <h3>On-Time Delivery</h3>
                <div className="kpi-value">94%</div>
                <div className="kpi-trend positive">↑ 3% from last month</div>
              </div>
              <div className="kpi-card">
                <h3>Avg. Transit Time</h3>
                <div className="kpi-value">18 days</div>
                <div className="kpi-trend negative">↑ 2 days from last month</div>
              </div>
              <div className="kpi-card">
                <h3>Document Compliance</h3>
                <div className="kpi-value">98%</div>
                <div className="kpi-trend positive">↑ 1% from last month</div>
              </div>
            </div>

            <div className="chart-grid">
              <div className="chart-card">
                <h3>Monthly Shipments</h3>
                <div className="chart-container">
                  <div className="bar-chart">
                    {monthlyShipments.map((data, index) => (
                      <div key={index} className="chart-bar-container">
                        <div 
                          className="chart-bar" 
                          style={{ height: `${data.count * 3}px` }}
                          title={`${data.month}: ${data.count} shipments`}
                        ></div>
                        <div className="chart-label">{data.month}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="chart-card">
                <h3>Carrier Distribution</h3>
                <div className="chart-container">
                  <div className="pie-chart-placeholder">
                    {/* In a real app, this would be a proper pie chart */}
                    <div className="pie-chart-legend">
                      {carrierDistribution.map((data, index) => (
                        <div key={index} className="legend-item">
                          <div className={`legend-color color-${index + 1}`}></div>
                          <div className="legend-label">{data.carrier}</div>
                          <div className="legend-value">{data.percentage}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="chart-card">
                <h3>Shipping Routes</h3>
                <div className="chart-container">
                  <div className="map-placeholder">
                    <p>Interactive shipping routes map would appear here</p>
                  </div>
                </div>
              </div>

              <div className="chart-card">
                <h3>Cost Analysis</h3>
                <div className="chart-container">
                  <div className="line-chart-placeholder">
                    <p>Cost trend analysis chart would appear here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="reports-library">
            <div className="reports-header">
              <h2>Available Reports</h2>
              <div className="reports-filter">
                <input type="text" placeholder="Search reports..." className="search-input" />
                <select className="filter-select">
                  <option value="all">All Types</option>
                  <option value="automated">Automated</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>

            <div className="reports-table-container">
              <table className="reports-table">
                <thead>
                  <tr>
                    <th>Report ID</th>
                    <th>Report Name</th>
                    <th>Generated Date</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReports.map((report, index) => (
                    <tr key={index}>
                      <td>{report.id}</td>
                      <td>{report.name}</td>
                      <td>{report.date}</td>
                      <td>{report.type}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn view-btn">View</button>
                          <button className="action-btn download-btn">Download</button>
                          <button className="action-btn share-btn">Share</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="scheduled-reports">
              <h3>Scheduled Reports</h3>
              <div className="scheduled-reports-list">
                <div className="scheduled-report-item">
                  <div className="report-name">Monthly Shipping Summary</div>
                  <div className="report-schedule">Monthly (Last day)</div>
                  <div className="report-recipients">3 recipients</div>
                  <div className="report-actions">
                    <button className="edit-schedule-btn">Edit</button>
                  </div>
                </div>
                <div className="scheduled-report-item">
                  <div className="report-name">Weekly Performance Metrics</div>
                  <div className="report-schedule">Weekly (Monday)</div>
                  <div className="report-recipients">2 recipients</div>
                  <div className="report-actions">
                    <button className="edit-schedule-btn">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'custom' && (
          <div className="custom-reports">
            <div className="custom-reports-header">
              <h2>Create Custom Report</h2>
            </div>

            <div className="report-builder">
              <div className="builder-section">
                <h3>1. Select Report Type</h3>
                <div className="report-type-options">
                  <div className="report-type-option selected">
                    <div className="option-icon">📊</div>
                    <div className="option-label">Shipment Analysis</div>
                  </div>
                  <div className="report-type-option">
                    <div className="option-icon">💰</div>
                    <div className="option-label">Cost Report</div>
                  </div>
                  <div className="report-type-option">
                    <div className="option-icon">🚢</div>
                    <div className="option-label">Carrier Performance</div>
                  </div>
                  <div className="report-type-option">
                    <div className="option-icon">📝</div>
                    <div className="option-label">Documentation</div>
                  </div>
                </div>
              </div>

              <div className="builder-section">
                <h3>2. Select Data Range</h3>
                <div className="date-range-selector">
                  <div className="date-input-group">
                    <label>From:</label>
                    <input type="date" className="date-input" />
                  </div>
                  <div className="date-input-group">
                    <label>To:</label>
                    <input type="date" className="date-input" />
                  </div>
                </div>
              </div>

              <div className="builder-section">
                <h3>3. Select Metrics</h3>
                <div className="metrics-selector">
                  <div className="metric-checkbox">
                    <input type="checkbox" id="metric1" checked />
                    <label htmlFor="metric1">Shipment Volume</label>
                  </div>
                  <div className="metric-checkbox">
                    <input type="checkbox" id="metric2" checked />
                    <label htmlFor="metric2">Transit Time</label>
                  </div>
                  <div className="metric-checkbox">
                    <input type="checkbox" id="metric3" />
                    <label htmlFor="metric3">Cost per Shipment</label>
                  </div>
                  <div className="metric-checkbox">
                    <input type="checkbox" id="metric4" checked />
                    <label htmlFor="metric4">On-Time Performance</label>
                  </div>
                  <div className="metric-checkbox">
                    <input type="checkbox" id="metric5" />
                    <label htmlFor="metric5">Documentation Compliance</label>
                  </div>
                </div>
              </div>

              <div className="builder-section">
                <h3>4. Grouping & Filters</h3>
                <div className="grouping-selector">
                  <div className="select-group">
                    <label>Group By:</label>
                    <select className="group-select">
                      <option value="month">Month</option>
                      <option value="carrier">Carrier</option>
                      <option value="route">Route</option>
                      <option value="shipment_type">Shipment Type</option>
                    </select>
                  </div>
                  <div className="select-group">
                    <label>Filter By Carrier:</label>
                    <select className="filter-select">
                      <option value="all">All Carriers</option>
                      <option value="OceanFreight Ltd">OceanFreight Ltd</option>
                      <option value="AsiaExpress Shipping">AsiaExpress Shipping</option>
                      <option value="EuroAsia Lines">EuroAsia Lines</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="builder-actions">
                <button className="preview-report-btn">Preview Report</button>
                <button className="generate-report-btn">Generate Report</button>
                <button className="save-template-btn">Save as Template</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;