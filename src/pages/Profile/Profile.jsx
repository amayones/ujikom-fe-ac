import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Save } from 'lucide-react';
import useAuthStore from '../../store/authStore';

// Profile page for updating user information
const Profile = () => {
  const { user, updateProfile, loading } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    password_confirmation: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        password: '',
        password_confirmation: ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password && formData.password !== formData.password_confirmation) {
      alert('Passwords do not match');
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address
    };

    if (formData.password) {
      payload.password = formData.password;
      payload.password_confirmation = formData.password_confirmation;
    }

    const result = await updateProfile(payload);
    if (result.success) {
      setFormData(prev => ({ ...prev, password: '', password_confirmation: '' }));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <div className="relative">
              <div className="absolute top-2 left-0 pl-3 pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="address"
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                placeholder="Enter your address"
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Change Password</h3>
            <p className="text-sm text-gray-600 mb-4">Leave blank if you don't want to change your password</p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center bg-accent text-primary font-semibold py-2 px-6 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                'Updating...'
              ) : (
                <>
                  <Save size={20} className="mr-2" />
                  Update Profile
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;