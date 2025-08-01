import React, { useState } from 'react';

const PaymentsPage = () => {
  const [activeTab, setActiveTab] = useState('invoices');
  
  const invoices = [
    { id: 'INV-2023-105', date: '2023-10-25', amount: 2450.00, status: 'Pending', shipment: 'SH-2023-001', dueDate: '2023-11-25' },
    { id: 'INV-2023-098', date: '2023-10-18', amount: 1875.50, status: 'Pending', shipment: 'SH-2023-002', dueDate: '2023-11-18' },
    { id: 'INV-2023-087', date: '2023-10-05', amount: 3200.75, status: 'Paid', shipment: 'SH-2023-003', dueDate: '2023-11-05' },
    { id: 'INV-2023-076', date: '2023-09-20', amount: 1950.25, status: 'Paid', shipment: 'SH-2022-045', dueDate: '2023-10-20' },
  ];

  const paymentMethods = [
    { id: 1, type: 'Credit Card', last4: '4242', expiry: '05/25', default: true },
    { id: 2, type: 'Bank Account', last4: '9876', name: 'Business Checking', default: false },
  ];

  return (
    <div className="page-container">
      <h1>Billing & Payments</h1>
      <p className="payments-intro">Review invoices, download receipts, and manage your payment methods.</p>
      
      <div className="page-content">
        <div className="payments-tabs">
          <button 
            className={`tab-button ${activeTab === 'invoices' ? 'active' : ''}`}
            onClick={() => setActiveTab('invoices')}
          >
            Invoices & Payments
          </button>
          <button 
            className={`tab-button ${activeTab === 'methods' ? 'active' : ''}`}
            onClick={() => setActiveTab('methods')}
          >
            Payment Methods
          </button>
        </div>

        {activeTab === 'invoices' && (
          <div className="invoices-section">
            <div className="payment-summary">
              <div className="summary-card">
                <h3>Outstanding Balance</h3>
                <div className="amount">$4,325.50</div>
                <button className="pay-all-btn">Pay All</button>
              </div>
              <div className="summary-card">
                <h3>Paid This Month</h3>
                <div className="amount">$5,151.00</div>
                <button className="view-history-btn">View History</button>
              </div>
            </div>

            <h2>Invoices</h2>
            <div className="invoices-filter">
              <select className="filter-select">
                <option value="all">All Invoices</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
              <input type="text" placeholder="Search invoices..." className="search-input" />
            </div>

            <div className="invoices-table-container">
              <table className="invoices-table">
                <thead>
                  <tr>
                    <th>Invoice #</th>
                    <th>Date</th>
                    <th>Shipment</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice, index) => (
                    <tr key={index}>
                      <td>{invoice.id}</td>
                      <td>{invoice.date}</td>
                      <td>{invoice.shipment}</td>
                      <td>${invoice.amount.toFixed(2)}</td>
                      <td>{invoice.dueDate}</td>
                      <td>
                        <span className={`status-badge status-${invoice.status.toLowerCase()}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn view-btn">View</button>
                          <button className="action-btn download-btn">PDF</button>
                          {invoice.status === 'Pending' && (
                            <button className="action-btn pay-btn">Pay</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'methods' && (
          <div className="payment-methods-section">
            <div className="methods-header">
              <h2>Your Payment Methods</h2>
              <button className="add-method-btn">+ Add Payment Method</button>
            </div>

            <div className="payment-methods-list">
              {paymentMethods.map((method, index) => (
                <div key={index} className={`payment-method-card ${method.default ? 'default' : ''}`}>
                  <div className="payment-method-icon">
                    {method.type === 'Credit Card' ? '💳' : '🏦'}
                  </div>
                  <div className="payment-method-details">
                    <h3>{method.type}</h3>
                    <p>
                      {method.type === 'Credit Card' 
                        ? `•••• •••• •••• ${method.last4} | Expires: ${method.expiry}` 
                        : `${method.name} (•••• ${method.last4})`}
                    </p>
                    {method.default && <span className="default-badge">Default</span>}
                  </div>
                  <div className="payment-method-actions">
                    {!method.default && <button className="make-default-btn">Make Default</button>}
                    <button className="edit-btn">Edit</button>
                    <button className="remove-btn">Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="billing-address">
              <h2>Billing Address</h2>
              <div className="address-card">
                <p>
                  Global Shipping Inc.<br />
                  123 Commerce Street<br />
                  Suite 400<br />
                  New York, NY 10001<br />
                  United States
                </p>
                <button className="edit-address-btn">Edit Address</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsPage;