import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard } from 'lucide-react';
import useFilmStore from '../../store/filmStore';
import useBookingStore from '../../store/bookingStore';
import SeatSelector from '../../components/SeatSelector';
import { formatCurrency } from '../../utils/formatCurrency';

// Booking page for seat selection and confirmation
const Booking = () => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const { currentSchedule, loading, getScheduleSeats } = useFilmStore();
  const { selectedSeats, createBooking, loading: bookingLoading, clearSelectedSeats } = useBookingStore();

  useEffect(() => {
    if (scheduleId) {
      getScheduleSeats(scheduleId);
    }
    
    // Clear selected seats when component mounts
    return () => clearSelectedSeats();
  }, [scheduleId, getScheduleSeats, clearSelectedSeats]);

  const handleConfirmBooking = async () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    if (selectedSeats.length > 10) {
      alert('Maximum 10 seats can be booked at once');
      return;
    }

    if (!scheduleId) {
      alert('Invalid schedule selected');
      return;
    }

    const result = await createBooking(scheduleId, 'midtrans');
    if (result.success) {
      navigate(`/payment/${result.booking.id}`);
    }
  };

  const totalPrice = currentSchedule?.price * selectedSeats.length || 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!currentSchedule) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-900 mb-2">Schedule not found</h3>
        <button
          onClick={() => navigate('/movies')}
          className="text-accent hover:text-yellow-600"
        >
          Back to Movies
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(`/movies/${currentSchedule.film?.id}`)}
        className="flex items-center text-accent hover:text-yellow-600 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Movie Details
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Select Your Seats</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <SeatSelector 
              seats={currentSchedule.seats || []} 
              scheduleId={scheduleId} 
            />
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-3">Booking Summary</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Movie:</span>
                  <span className="font-medium">{currentSchedule.film?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Studio:</span>
                  <span className="font-medium">{currentSchedule.studio?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">
                    {new Date(currentSchedule.date).toLocaleDateString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-medium">{currentSchedule.time}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price per ticket:</span>
                  <span className="font-medium">{formatCurrency(currentSchedule.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Selected seats:</span>
                  <span className="font-medium">
                    {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span className="font-medium">{selectedSeats.length} ticket(s)</span>
                </div>
              </div>
              
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleConfirmBooking}
              disabled={selectedSeats.length === 0 || bookingLoading}
              className="w-full bg-accent text-primary font-semibold py-3 px-4 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {bookingLoading ? (
                'Processing...'
              ) : (
                <>
                  <CreditCard size={20} className="mr-2" />
                  Proceed to Payment
                </>
              )}
            </button>
            
            <p className="text-xs text-gray-600 text-center">
              By proceeding, you agree to our terms and conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;