import { useState, useEffect } from 'react';
import { Receipt, Calendar, Filter } from 'lucide-react';
import PDFGenerator from '../../components/PDFGenerator';
import APIStatusIndicator from '../../components/APIStatusIndicator';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import useReportStore from '../../store/reportStore';
import { formatCurrency } from '../../utils/formatCurrency';

// Owner transactions report page
const Transactions = () => {
  const { getTransactionReport } = useReportStore();
  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    const data = await getTransactionReport(dateFilter.startDate, dateFilter.endDate);
    setTransactionData(data);
    setLoading(false);
  };

  const handleDateFilterChange = (e) => {
    setDateFilter({
      ...dateFilter,
      [e.target.name]: e.target.value
    });
  };

  const applyFilter = () => {
    fetchTransactions();
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
          <Receipt className="text-accent" size={32} />
          <h1 className="text-3xl font-bold text-gray-900">Transaction Reports</h1>
        </div>
        <div className="flex items-center space-x-3">
          <APIStatusIndicator />
          <PDFGenerator 
            data={transactionData || {
              transactions: []
            }}
            reportType="transactions"
            title="Transaction Report"
          />
        </div>
      </div>

      {/* Date Filter */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar size={20} />
            <span className="font-medium">Filter by Date:</span>
          </div>
          <input
            type="date"
            name="startDate"
            value={dateFilter.startDate}
            onChange={handleDateFilterChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <span>to</span>
          <input
            type="date"
            name="endDate"
            value={dateFilter.endDate}
            onChange={handleDateFilterChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={applyFilter}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Filter size={16} className="mr-2" />
            Apply Filter
          </button>
        </div>
      </div>

      {/* Transaction Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900">
                {transactionData?.transactions?.length || 0}
              </p>
            </div>
            <Receipt className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(
                  transactionData?.transactions?.reduce((sum, t) => sum + (t.total_amount || 0), 0) || 0
                )}
              </p>
            </div>
            <Receipt className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Transaction</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(
                  transactionData?.transactions?.length > 0
                    ? transactionData.transactions.reduce((sum, t) => sum + (t.total_amount || 0), 0) / transactionData.transactions.length
                    : 0
                )}
              </p>
            </div>
            <Receipt className="text-purple-500" size={32} />
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Transaction Details</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Film
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactionData?.transactions?.length > 0 ? (
                transactionData.transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.customer_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.film_title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(transaction.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(transaction.total_amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        transaction.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : transaction.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;