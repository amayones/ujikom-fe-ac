import { X, Download } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

// Invoice modal component for displaying booking details
const InvoiceModal = ({ isOpen, onClose, booking }) => {
  if (!isOpen || !booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Invoice</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="text-center border-b pb-4">
            <h3 className="text-lg font-semibold">Absolute Cinema</h3>
            <p className="text-sm text-gray-600">Movie Ticket Invoice</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Booking Code:</span>
              <span>{booking.booking_code}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Movie:</span>
              <span>{booking.schedule?.film?.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Studio:</span>
              <span>{booking.schedule?.studio?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Date:</span>
              <span>{new Date(booking.schedule?.date).toLocaleDateString('id-ID')}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Time:</span>
              <span>{booking.schedule?.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Seats:</span>
              <span>{booking.seats?.join(', ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Quantity:</span>
              <span>{booking.seats?.length} tickets</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount:</span>
              <span>{formatCurrency(booking.total_price)}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-medium">Payment Status:</span>
              <span className={`px-2 py-1 rounded text-sm ${
                booking.payment_status === 'paid' 
                  ? 'bg-green-100 text-green-800' 
                  : booking.payment_status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {booking.payment_status?.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 border-t pt-4">
            <p>Thank you for choosing Absolute Cinema!</p>
            <p>Please show this invoice at the cinema entrance.</p>
          </div>

          <button
            onClick={handlePrint}
            className="w-full bg-accent text-primary font-semibold py-2 px-4 rounded hover:bg-yellow-600 transition-colors flex items-center justify-center"
          >
            <Download size={20} className="mr-2" />
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;