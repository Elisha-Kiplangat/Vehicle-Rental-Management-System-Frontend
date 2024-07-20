import { useState } from 'react';
import { useFetchBookingByIdQuery, Booking } from '../../features/BookingAPI';

const Bookings = () => {
  const userId = localStorage.getItem('user_id');
  const pollingInterval = 10000;
  const { data: bookings, error, isLoading } = useFetchBookingByIdQuery(Number(userId), { pollingInterval });
  const [currentPage, setCurrentPage] = useState(0);
  const bookingsPerPage = 10;

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const offset = currentPage * bookingsPerPage;
  const currentBookings = bookings ? bookings.slice(offset, offset + bookingsPerPage) : [];
  const pageCount = bookings ? Math.ceil(bookings.length / bookingsPerPage) : 0;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-info"></span>
      </div>
    );
  }

  if (error) return <div>Error loading bookings</div>;

  return (
    <div className="overflow-x-auto p-4">
      <table className="table w-full">
        <thead className='bg-gray-200'>
          <tr>
            <th></th>
            {/* <th>Booking ID</th> */}
            <th>Vehicle Name</th>
            <th>Booking Date</th>
            <th>Return Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentBookings.map((booking: Booking, index: any) => (
            <tr key={booking.booking_id} className="hover">
              <th>{offset + index + 1}</th>
              {/* <td>{booking.booking_id}</td> */}
              <td>{booking.vehicle_id}</td>
              <td>{booking.booking_date}</td>
              <td>{booking.return_date}</td>
              <td>${booking.total_amount}</td>
              <td
                className={`${
                  booking.booking_status === 'Succeeded'
                    ? 'text-green-600'
                    : booking.booking_status === 'pending'
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`}
              >
                {booking.booking_status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <div className="btn-group">
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              className={`btn mx-1 ${index === currentPage ? 'btn-active' : ''}`}
              onClick={() => handlePageClick(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
