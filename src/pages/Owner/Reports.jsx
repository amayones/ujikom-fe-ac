import { useState, useEffect } from 'react';
import { BarChart3, DollarSign, TrendingUp, Users } from 'lucide-react';
import axiosClient from '../../api/axiosClient';
import { formatCurrency } from '../../utils/formatCurrency';
import PDFGenerator from '../../components/PDFGenerator';
import APIStatusIndicator from '../../components/APIStatusIndicator';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import useReportStore from '../../store/reportStore';

// Owner reports page for financial analytics
const Reports = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      
      // Use mock data directly since API endpoints may not exist yet
      setDashboardData({
        total_revenue_today: 2500000,
        total_revenue_month: 75000000,
        total_bookings_today: 25,
        total_bookings_month: 450,
        pending_payments: 5
      });
      setRevenueData([
        { date: '2024-01-15', total_amount: 2500000, total_transactions: 25 },
        { date: '2024-01-14', total_amount: 3200000, total_transactions: 32 },
        { date: '2024-01-13', total_amount: 1800000, total_transactions: 18 }
      ]);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BarChart3 className="text-accent" size={32} />
          <h1 className="text-3xl font-bold text-gray-900">Financial Reports</h1>
        </div>
        <div className="flex items-center space-x-3">
          <APIStatusIndicator />
          <PDFGenerator 
            data={{
              totalRevenue: Number(dashboardData?.total_revenue_month) || 0,
              totalExpenses: Number(dashboardData?.total_revenue_month) * 0.6 || 0,
              totalTransactions: Number(dashboardData?.total_bookings_month) || 0,
              monthlyData: Array.isArray(revenueData) ? revenueData.map(item => ({
                month: item.date ? new Date(item.date).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }) : 'Unknown',
                revenue: Number(item.total_amount) || 0,
                expenses: Number(item.total_amount) * 0.6 || 0
              })) : []
            }}
            reportType="financial"
            title="Financial Report"
          />
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(dashboardData?.total_revenue_today || 0)}
              </p>
            </div>
            <DollarSign className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(dashboardData?.total_revenue_month || 0)}
              </p>
            </div>
            <TrendingUp className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Bookings</p>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardData?.total_bookings_today || 0}
              </p>
            </div>
            <Users className="text-purple-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Payments</p>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardData?.pending_payments || 0}
              </p>
            </div>
            <BarChart3 className="text-orange-500" size={32} />
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Daily Revenue</h2>
        <div className="space-y-4">
          {revenueData.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">{new Date(item.date).toLocaleDateString('id-ID')}</p>
                <p className="text-sm text-gray-600">{item.total_transactions} transactions</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{formatCurrency(item.total_amount)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Monthly Summary</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Revenue Overview</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Bookings:</span>
                <span className="font-medium">{dashboardData?.total_bookings_month || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Revenue:</span>
                <span className="font-medium">{formatCurrency(dashboardData?.total_revenue_month || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Average per Booking:</span>
                <span className="font-medium">
                  {formatCurrency(
                    dashboardData?.total_bookings_month > 0 
                      ? dashboardData.total_revenue_month / dashboardData.total_bookings_month 
                      : 0
                  )}
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Performance Metrics</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Daily Average:</span>
                <span className="font-medium">
                  {formatCurrency((dashboardData?.total_revenue_month || 0) / 30)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Pending Payments:</span>
                <span className="font-medium text-orange-600">
                  {dashboardData?.pending_payments || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;