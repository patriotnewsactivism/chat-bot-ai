import React from 'react';

const WhiteLabelDashboardSimple = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          White Label Reseller Dashboard
        </h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome to the Reseller Program</h2>
          <p className="text-gray-600 mb-4">
            Manage your white-label chatbot business with our comprehensive reseller dashboard.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900">Total Clients</h3>
              <p className="text-2xl font-bold text-blue-600">24</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900">Monthly Revenue</h3>
              <p className="text-2xl font-bold text-green-600">$4,800</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900">Active Bots</h3>
              <p className="text-2xl font-bold text-purple-600">67</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add New Client
              </button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                View Reports
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Manage Billing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhiteLabelDashboardSimple;