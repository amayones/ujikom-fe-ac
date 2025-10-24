import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Eye } from 'lucide-react';
import useBookingStore from '../../store/bookingStore';
import InvoiceModal from '../../components/InvoiceModal';
import { formatCurrency } from '../../utils/formatCurrency';

// History page for viewing user's booking history
const History = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const { getBookings, loading } = useBookingStore();

  useEffect(() => {
    const fetchBookings = async () => {
      const result = await getBookings();
      setBookings(result || []);
    };
    
    fetchBookings();
  }, [getBookings]);

  const handleViewInvoice = (booking) => {
    setSelectedBooking(booking);
    setShowInvoice(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Booking History</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="mx-auto text-gray-400 mb-4" size={64} />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-600">You haven't made any bookings yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{booking.schedule?.film?.title}</h3>
                  <p className="text-gray-600">Booking Code: {booking.booking_code}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
                  {booking.status?.toUpperCase()}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    <span>{booking.schedule?.studio?.name}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    <span>{new Date(booking.schedule?.date).toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-2" />
                    <span>{booking.schedule?.time}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p><span className="font-medium">Seats:</span> {booking.seats?.join(', ')}</p>
                  <p><span className="font-medium">Total:</span> {formatCurrency(booking.total_price)}</p>
                  <p><span className="font-medium">Payment:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-sm ${
                      booking.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.payment_status?.toUpperCase()}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleViewInvoice(booking)}
                  className="flex items-center bg-accent text-primary px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
                >
                  <Eye size={16} className="mr-2" />
                  View Invoice
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <InvoiceModal
        isOpen={showInvoice}
        onClose={() => setShowInvoice(false)}
        booking={selectedBooking}
      />
    </div>
  );
};

export default History;