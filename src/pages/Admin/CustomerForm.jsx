import React, { useState, useEffect } from 'react';

export default function CustomerForm({ customer, onSave, onCancel, loading }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer'
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || '',
        email: customer.email || '',
        password: '',
        role: customer.role || 'customer'
      });
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'customer'
      });
    }
  }, [customer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = { ...formData };
    if (!submitData.password && customer) {
      delete submitData.password;
    }
    onSave(submitData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-white">
          {customer ? 'Edit Customer' : 'Add New Customer'}
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
            type="password"
            name="password"
            placeholder={customer ? "New Password (leave blank to keep current)" : "Password"}
            value={formData.password}
            onChange={handleChange}
            required={!customer}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded"
          />
          
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded"
          >
            <option value="customer">Customer</option>
            <option value="cashier">Cashier</option>
            <option value="admin">Admin</option>
            <option value="owner">Owner</option>
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