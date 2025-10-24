import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, XCircle, Clock } from 'lucide-react';
import useBookingStore from '../../store/bookingStore';
import useTransactionStore from '../../store/transactionStore';
import { formatCurrency } from '../../utils/formatCurrency';

// Dummy payment page - ready for Midtrans Snap integration
const PaymentDummy = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [transaction, setTransaction] = useState(null);
  const { currentBooking } = useBookingStore();
  const { createTransaction, updatePaymentStatus, loading } = useTransactionStore();

  useEffect(() => {
    // Create transaction when component mounts
    const initTransaction = async () => {
      if (!bookingId) {
        navigate('/movies');
        return;
      }
      
      const result = await createTransaction(bookingId);
      if (result.success) {
        setTransaction(result.transaction);
      } else {
        // If transaction creation fails, redirect to movies
        setTimeout(() => navigate('/movies'), 3000);
      }
    };
    
    initTransaction();
  }, [bookingId, createTransaction, navigate]);

  // Simulate payment process
  const handlePayment = async (status) => {
    setPaymentStatus('processing');
    
    // Simulate API delay
    setTimeout(async () => {
      if (transaction) {
        await updatePaymentStatus(transaction.id, status);
      }
      setPaymentStatus(status);
    }, 2000);
  };

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'paid':
        return <CheckCircle className="text-green-500" size={64} />;
      case 'failed':
        return <XCircle className="text-red-500" size={64} />;
      case 'processing':
        return <Clock className="text-yellow-500" size={64} />;
      default:
        return <CreditCard className="text-blue-500" size={64} />;
    }
  };

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case 'paid':
        return 'Payment Successful!';
      case 'failed':
        return 'Payment Failed';
      case 'processing':
        return 'Processing Payment...';
      default:
        return 'Complete Your Payment';
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          {getStatusIcon()}
          <h1 className="text-2xl font-bold mt-4 mb-2">{getStatusMessage()}</h1>
          
          {paymentStatus === 'pending' && (
            <p className="text-gray-600">
              Choose a payment method to complete your booking
            </p>
          )}
        </div>

        {transaction && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-3">Payment Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Order ID:</span>
                <span className="font-medium">{transaction.order_id}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-medium">{formatCurrency(transaction.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className={`font-medium ${
                  paymentStatus === 'paid' ? 'text-green-600' :
                  paymentStatus === 'failed' ? 'text-red-600' :
                  paymentStatus === 'processing' ? 'text-yellow-600' :
                  'text-blue-600'
                }`}>
                  {paymentStatus.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        )}

        {paymentStatus === 'pending' && (
          <div className="space-y-3">
            <button
              onClick={() => handlePayment('paid')}
              disabled={loading}
              className="w-full bg-green-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              Simulate Successful Payment
            </button>
            
            <button
              onClick={() => handlePayment('failed')}
              disabled={loading}
              className="w-full bg-red-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              Simulate Failed Payment
            </button>
            
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-2">
                This is a dummy payment page for testing purposes
              </p>
              <p className="text-xs text-gray-500">
                In production, this will integrate with Midtrans Snap
              </p>
            </div>
          </div>
        )}

        {paymentStatus === 'processing' && (
          <div className="text-center">
            <div className="spinner mx-auto mb-4"></div>
            <p className="text-gray-600">Please wait while we process your payment...</p>
          </div>
        )}

        {(paymentStatus === 'paid' || paymentStatus === 'failed') && (
          <div className="space-y-3">
            {paymentStatus === 'paid' && (
              <button
                onClick={() => navigate('/history')}
                className="w-full bg-accent text-primary font-semibold py-3 px-4 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                View Booking History
              </button>
            )}
            
            <button
              onClick={() => navigate('/movies')}
              className="w-full bg-gray-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back to Movies
            </button>
          </div>
        )}
      </div>

      {/* Midtrans Integration Instructions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">Midtrans Integration Guide:</h4>
        <ol className="text-sm text-blue-800 space-y-1">
          <li>1. Replace dummy transaction with real Midtrans API call</li>
          <li>2. Use snap_token from backend response</li>
          <li>3. Load Midtrans Snap script: snap.pay(snap_token)</li>
          <li>4. Handle callback for payment status updates</li>
        </ol>
      </div>
    </div>
  );
};

export default PaymentDummy;