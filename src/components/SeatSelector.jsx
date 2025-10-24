import { useState, useEffect } from 'react';
import useBookingStore from '../store/bookingStore';

const SeatSelector = ({ seats = [] }) => {
  const { selectedSeats, toggleSeat } = useBookingStore();
  const [seatLayout, setSeatLayout] = useState([]);

  useEffect(() => {
    const rows = ['A', 'B', 'C', 'D', 'E'];
    const layout = [];
    
    rows.forEach(row => {
      const rowSeats = [];
      for (let col = 1; col <= 10; col++) {
        const seatNumber = `${row}${col}`;
        const seatData = seats.find(s => s.seat_number === seatNumber);
        rowSeats.push({
          number: seatNumber,
          isBooked: seatData?.is_booked || false,
          isAvailable: seatData?.is_available !== false
        });
      }
      layout.push(rowSeats);
    });
    
    setSeatLayout(layout);
  }, [seats]);

  const getSeatClass = (seat) => {
    const baseClass = "w-8 h-8 m-1 rounded-t-lg border-2 cursor-pointer transition-colors text-xs flex items-center justify-center font-semibold";
    
    if (seat.isBooked) {
      return `${baseClass} bg-red-500 border-red-600 text-white cursor-not-allowed`;
    }
    
    if (selectedSeats.includes(seat.number)) {
      return `${baseClass} bg-accent border-yellow-600 text-primary`;
    }
    
    if (seat.isAvailable) {
      return `${baseClass} bg-gray-200 border-gray-300 hover:bg-gray-300`;
    }
    
    return `${baseClass} bg-gray-400 border-gray-500 cursor-not-allowed`;
  };

  const handleSeatClick = (seat) => {
    if (!seat.isBooked && seat.isAvailable) {
      const { selectedSeats } = useBookingStore.getState();
      
      if (!selectedSeats.includes(seat.number) && selectedSeats.length >= 10) {
        alert('Maximum 10 seats can be selected at once');
        return;
      }
      
      toggleSeat(seat.number);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-center mb-6">
        <div className="bg-gray-800 text-white py-2 px-8 rounded-lg inline-block mb-4">
          SCREEN
        </div>
      </div>

      <div className="flex flex-col items-center space-y-2">
        {seatLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center">
            <span className="w-6 text-center font-semibold mr-2">
              {String.fromCharCode(65 + rowIndex)}
            </span>
            <div className="flex">
              {row.slice(0, 5).map((seat) => (
                <button
                  key={seat.number}
                  className={getSeatClass(seat)}
                  onClick={() => handleSeatClick(seat)}
                  disabled={seat.isBooked || !seat.isAvailable}
                  title={`Seat ${seat.number} - ${seat.isBooked ? 'Booked' : seat.isAvailable ? 'Available' : 'Unavailable'}`}
                >
                  {seat.number.slice(-1)}
                </button>
              ))}
            </div>
            <div className="w-8"></div>
            <div className="flex">
              {row.slice(5).map((seat) => (
                <button
                  key={seat.number}
                  className={getSeatClass(seat)}
                  onClick={() => handleSeatClick(seat)}
                  disabled={seat.isBooked || !seat.isAvailable}
                  title={`Seat ${seat.number} - ${seat.isBooked ? 'Booked' : seat.isAvailable ? 'Available' : 'Unavailable'}`}
                >
                  {seat.number.slice(-1)}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-6 mt-6 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-200 border-2 border-gray-300 rounded-t mr-2"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-accent border-2 border-yellow-600 rounded-t mr-2"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 border-2 border-red-600 rounded-t mr-2"></div>
          <span>Booked</span>
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p className="font-semibold">Selected Seats: {selectedSeats.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default SeatSelector;