import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MediaCardHeader from '@/components/ui/media-card-header';
import DataTable from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import Footer from '@/components/layout/Footer';
import RealTimeTracker from '@/components/ui/real-time-tracker';
import MobileDashboard from '@/components/mobile/MobileDashboard';

const DashboardPage = () => {
  const [liveMetrics, setLiveMetrics] = useState({
    activeShipments: 12,
    pendingDocuments: 5,
    outstandingInvoices: 3,
    monthlyRevenue: 45000
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        ...prev,
        activeShipments: prev.activeShipments + (Math.random() > 0.7 ? 1 : 0),
        monthlyRevenue: prev.monthlyRevenue + Math.floor(Math.random() * 1000)
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const recentShipments = [
    {
      id: 'SH-2024-001',
      origin: 'London, UK',
      destination: 'Hamburg, DE',
      status: 'In Transit',
      eta: '2024-08-05',
      value: '$12,450'
    },
    {
      id: 'SH-2024-002',
      origin: 'Shanghai, CN',
      destination: 'Felixstowe, UK',
      status: 'Customs Clearance',
      eta: '2024-08-03',
      value: '$8,750'
    },
    {
      id: 'SH-2024-003',
      origin: 'Rotterdam, NL',
      destination: 'New York, US',
      status: 'Delivered',
      eta: '2024-07-28',
      value: '$15,200'
    },
  ];

  const shipmentColumns = [
    { key: 'id' as keyof typeof recentShipments[0], header: 'Shipment ID', sortable: true },
    { key: 'origin' as keyof typeof recentShipments[0], header: 'Origin', sortable: true },
    { key: 'destination' as keyof typeof recentShipments[0], header: 'Destination', sortable: true },
    {
      key: 'status' as keyof typeof recentShipments[0],
      header: 'Status',
      sortable: true,
      render: (value: string) => (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
          value === 'Delivered' ? 'bg-green-100 text-green-800' :
          value === 'In Transit' ? 'bg-blue-100 text-blue-800' :
          value === 'Customs Clearance' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'eta' as keyof typeof recentShipments[0], header: 'ETA', sortable: true },
    { key: 'value' as keyof typeof recentShipments[0], header: 'Value', sortable: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Dashboard */}
      <div className="md:hidden px-4 pt-4">
        <MobileDashboard />
      </div>

      {/* Desktop Dashboard */}
      <div className="hidden md:block">
        {/* Dashboard Header */}
        <MediaCardHeader
          title="Shipment Overview"
          subtitle="Dashboard"
          description="Monitor your active shipments, track documentation, and manage logistics operations."
          backgroundImage="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          overlayOpacity={0.6}
          className="h-20"
        />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Live Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 relative">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-sm">🚢</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Shipments</p>
                <p className="text-2xl font-semibold text-gray-900">{liveMetrics.activeShipments}</p>
              </div>
            </div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-600 text-sm">📋</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Documents</p>
                <p className="text-2xl font-semibold text-gray-900">{liveMetrics.pendingDocuments}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-sm">💰</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Outstanding Invoices</p>
                <p className="text-2xl font-semibold text-gray-900">{liveMetrics.outstandingInvoices}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 relative">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-sm">📊</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">This Month</p>
                <p className="text-2xl font-semibold text-gray-900">£{(liveMetrics.monthlyRevenue / 1000).toFixed(0)}K</p>
              </div>
            </div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Recent Shipments Table */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Shipments</h2>
            <Button asChild>
              <Link to="/shipments">View All Shipments</Link>
            </Button>
          </div>
          <DataTable
            data={recentShipments}
            columns={shipmentColumns}
            searchPlaceholder="Search shipments..."
            rowsPerPage={5}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/contact">
                  <span className="mr-2">📋</span>
                  New Quote
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/shipments">
                  <span className="mr-2">🚢</span>
                  Track Shipment
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/compliance">
                  <span className="mr-2">📄</span>
                  Upload Document
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/admin/carriers">
                  <span className="mr-2">🔗</span>
                  Carrier APIs
                </Link>
              </Button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Pending Actions</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">Commercial Invoice</span>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">Certificate of Origin</span>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">Payment Due</span>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Overdue</span>
              </div>
            </div>
            <Button asChild variant="link" className="w-full mt-4 p-0">
              <Link to="/compliance">View All →</Link>
            </Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="text-gray-900">SH-2024-001 cleared customs</p>
                <p className="text-gray-500 text-xs">2 hours ago</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-900">Payment received for SH-2024-003</p>
                <p className="text-gray-500 text-xs">5 hours ago</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-900">New quote request submitted</p>
                <p className="text-gray-500 text-xs">1 day ago</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Support</h3>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Need assistance with your shipments?</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/contact">Contact Support</Link>
              </Button>
              <div className="text-xs text-gray-500">
                <p>UK: +44 20 7946 0958</p>
                <p>Available 24/7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Real-Time Tracking Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Live Shipment Tracking</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RealTimeTracker shipmentId="SH-2024-001" />
            <RealTimeTracker shipmentId="SH-2024-002" />
          </div>
        </div>
      </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardPage;