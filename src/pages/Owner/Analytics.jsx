import { TrendingUp, Users, DollarSign, Film } from 'lucide-react';
import PDFGenerator from '../../components/PDFGenerator';
import APIStatusIndicator from '../../components/APIStatusIndicator';
import useReportStore from '../../store/reportStore';
import { useEffect, useState } from 'react';

// Owner analytics page
const Analytics = () => {
  const { getSummaryReport } = useReportStore();
  const [summaryData, setSummaryData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSummaryReport();
      setSummaryData(data);
    };
    fetchData();
  }, [getSummaryReport]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <div className="flex items-center space-x-3">
          <APIStatusIndicator />
          <PDFGenerator 
            data={summaryData || {
              activeFilms: 0,
              totalCustomers: 0,
              monthlyRevenue: 0,
              occupancyRate: 0,
              customerSatisfaction: 0,
              topFilms: []
            }}
            reportType="summary"
            title="Business Analytics Summary"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-semibold text-gray-900">1,234</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">$45,678</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Film className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Films</p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Growth Rate</p>
              <p className="text-2xl font-semibold text-gray-900">+12.5%</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Performance Metrics</h2>
        <div className="text-center py-8 text-gray-500">
          <TrendingUp size={48} className="mx-auto mb-4" />
          <p>Advanced analytics charts will be implemented here</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;