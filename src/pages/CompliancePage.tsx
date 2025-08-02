import React, { useState } from 'react';
import MediaCardHeader from '@/components/ui/media-card-header';
import DataTable from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import Footer from '@/components/layout/Footer';

const CompliancePage = () => {
  const [activeTab, setActiveTab] = useState('documents');

  const documents = [
    {
      id: 'DOC-2024-105',
      name: 'Commercial Invoice',
      shipment: 'SH-2024-001',
      status: 'Pending',
      required: true,
      dueDate: '2024-08-10',
      type: 'Financial'
    },
    {
      id: 'DOC-2024-106',
      name: 'Bill of Lading',
      shipment: 'SH-2024-001',
      status: 'Approved',
      required: true,
      dueDate: '2024-08-10',
      type: 'Transport'
    },
    {
      id: 'DOC-2024-107',
      name: 'Certificate of Origin',
      shipment: 'SH-2024-002',
      status: 'Pending',
      required: true,
      dueDate: '2024-08-05',
      type: 'Customs'
    },
    {
      id: 'DOC-2024-108',
      name: 'Dangerous Goods Declaration',
      shipment: 'SH-2024-002',
      status: 'Not Required',
      required: false,
      dueDate: 'N/A',
      type: 'Safety'
    },
    {
      id: 'DOC-2024-109',
      name: 'Import License',
      shipment: 'SH-2024-004',
      status: 'Pending',
      required: true,
      dueDate: '2024-08-15',
      type: 'Regulatory'
    },
    {
      id: 'DOC-2024-110',
      name: 'Insurance Certificate',
      shipment: 'SH-2024-004',
      status: 'Approved',
      required: true,
      dueDate: '2024-08-15',
      type: 'Insurance'
    },
  ];

  const regulations = [
    { region: 'European Union', name: 'EU Import Control System 2 (ICS2)', status: 'Compliant', lastUpdated: '2024-07-15' },
    { region: 'United States', name: 'Customs Trade Partnership Against Terrorism (CTPAT)', status: 'Compliant', lastUpdated: '2024-06-20' },
    { region: 'China', name: 'China Customs Advanced Manifest Rule', status: 'Review Required', lastUpdated: '2024-05-10' },
    { region: 'Global', name: 'International Maritime Dangerous Goods Code', status: 'Compliant', lastUpdated: '2024-04-05' },
  ];

  const documentColumns = [
    { key: 'id' as keyof typeof documents[0], header: 'Document ID', sortable: true },
    { key: 'name' as keyof typeof documents[0], header: 'Document Name', sortable: true },
    { key: 'shipment' as keyof typeof documents[0], header: 'Shipment', sortable: true },
    { key: 'type' as keyof typeof documents[0], header: 'Type', sortable: true },
    {
      key: 'required' as keyof typeof documents[0],
      header: 'Required',
      sortable: true,
      render: (value: boolean) => (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
          value ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {value ? 'Required' : 'Optional'}
        </span>
      )
    },
    { key: 'dueDate' as keyof typeof documents[0], header: 'Due Date', sortable: true },
    {
      key: 'status' as keyof typeof documents[0],
      header: 'Status',
      sortable: true,
      render: (value: string) => (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
          value === 'Approved' ? 'bg-green-100 text-green-800' :
          value === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
          value === 'Not Required' ? 'bg-gray-100 text-gray-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'id' as keyof typeof documents[0],
      header: 'Actions',
      render: (value: string, row: typeof documents[0]) => (
        <div className="flex space-x-2">
          {row.status === 'Approved' && (
            <Button variant="outline" size="sm">View</Button>
          )}
          {row.status === 'Pending' && (
            <Button size="sm">Upload</Button>
          )}
        </div>
      )
    },
  ];

  const regulationColumns = [
    { key: 'region' as keyof typeof regulations[0], header: 'Region', sortable: true },
    { key: 'name' as keyof typeof regulations[0], header: 'Regulation', sortable: true },
    {
      key: 'status' as keyof typeof regulations[0],
      header: 'Status',
      sortable: true,
      render: (value: string) => (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
          value === 'Compliant' ? 'bg-green-100 text-green-800' :
          value === 'Review Required' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'lastUpdated' as keyof typeof regulations[0], header: 'Last Updated', sortable: true },
    {
      key: 'region' as keyof typeof regulations[0],
      header: 'Actions',
      render: (value: string, row: typeof regulations[0]) => (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Details</Button>
          {row.status === 'Review Required' && (
            <Button size="sm">Review</Button>
          )}
        </div>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compliance Header */}
      <MediaCardHeader
        title="Regulatory Compliance"
        subtitle="Documentation Center"
        description="Manage customs documentation, regulatory compliance, and shipping requirements."
        backgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        overlayOpacity={0.6}
        className="h-20"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Compliance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-600 text-sm">📋</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Documents</p>
                <p className="text-2xl font-semibold text-yellow-600">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-sm">✅</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Approved Documents</p>
                <p className="text-2xl font-semibold text-green-600">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-sm">🌍</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Regions Compliant</p>
                <p className="text-2xl font-semibold text-blue-600">3/4</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 text-sm">⚠️</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Reviews Required</p>
                <p className="text-2xl font-semibold text-red-600">1</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('documents')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'documents'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Required Documents
              </button>
              <button
                onClick={() => setActiveTab('regulations')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'regulations'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Regulatory Compliance
              </button>
            </nav>
          </div>
        </div>

        {/* Content Sections */}
        {activeTab === 'documents' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Shipment Documents</h2>
              <div className="flex space-x-3">
                <Button variant="outline">Download Templates</Button>
                <Button>Upload Document</Button>
              </div>
            </div>

            <DataTable
              data={documents}
              columns={documentColumns}
              searchPlaceholder="Search documents by name, shipment, or type..."
              rowsPerPage={10}
            />

            {/* Document Templates */}
            <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Document Templates</h3>
              <p className="text-sm text-gray-600 mb-4">Download templates for commonly required shipping documents:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button variant="outline" className="justify-start">
                  <span className="mr-2">📄</span>
                  Commercial Invoice
                </Button>
                <Button variant="outline" className="justify-start">
                  <span className="mr-2">📋</span>
                  Bill of Lading
                </Button>
                <Button variant="outline" className="justify-start">
                  <span className="mr-2">🏷️</span>
                  Certificate of Origin
                </Button>
                <Button variant="outline" className="justify-start">
                  <span className="mr-2">⚠️</span>
                  Dangerous Goods
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'regulations' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Regulatory Compliance Status</h2>
              <Button variant="outline">Export Report</Button>
            </div>

            <DataTable
              data={regulations}
              columns={regulationColumns}
              searchPlaceholder="Search regulations by region or name..."
              rowsPerPage={10}
            />

            {/* Recent Updates */}
            <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Regulatory Updates</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">EU ICS2 Phase 3 Implementation</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        The third phase of the EU's Import Control System 2 is scheduled for implementation.
                        Updated filing requirements for ocean cargo are now available.
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">Aug 1, 2024</span>
                  </div>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">US CTPAT Program Updates</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        New security criteria for the Customs Trade Partnership Against Terrorism program.
                        Review changes to ensure continued compliance status.
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">Jul 15, 2024</span>
                  </div>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">China Customs Manifest Updates</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Updated advance manifest filing requirements for shipments to China.
                        New data elements required for customs clearance.
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">Jun 20, 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CompliancePage;