import React, { useState, useEffect } from 'react';

export default function CashierForm({ cashier, onSave, onCancel, loading }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    shift: 'Morning',
    status: 'Active'
  });

  useEffect(() => {
    if (cashier) {
      setFormData({
        name: cashier.name || '',
        email: cashier.email || '',
        phone: cashier.phone || '',
        shift: cashier.shift || 'Morning',
        status: cashier.status || 'Active'
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        shift: 'Morning',
        status: 'Active'
      });
    }
  }, [cashier]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-white">
          {cashier ? 'Edit Cashier' : 'Add New Cashier'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-gray-700 text-white px-4 py-2 rounded"
          />
          
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-gray-700 text-white px-4 py-2 rounded"
          />
          
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded"
          />
          
          <select
            name="shift"
            value={formData.shift}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded"
          >
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>
          
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white py-2 rounded"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}