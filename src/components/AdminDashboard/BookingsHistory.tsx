import { Container, Typography } from '@mui/material';
import { useFetchBookingsQuery, Booking } from '../../features/BookingAPI';
import { useState } from 'react';

const formatLocalDateTime = (dateValue: string) => {
  const parsedDate = new Date(dateValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return dateValue;
  }

  return parsedDate.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const BookingsHistory = () => {
  const pollingInterval = 10000;
  const { data: bookingsData, error, isLoading } = useFetchBookingsQuery({pollingInterval});
  const [currentPage, setCurrentPage] = useState(0);
  const bookingsPerPage = 10;

  const sortedBookings = bookingsData
    ? [...bookingsData].sort(
        (firstBooking, secondBooking) =>
          new Date(secondBooking.booking_date).getTime() - new Date(firstBooking.booking_date).getTime()
      )
    : [];

  const pageCount = Math.ceil(sortedBookings.length / bookingsPerPage);
  const safeCurrentPage = Math.min(currentPage, Math.max(pageCount - 1, 0));
  const offset = safeCurrentPage * bookingsPerPage;
  const currentBookings = sortedBookings.slice(offset, offset + bookingsPerPage);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-info"></span>
      </div>
    );
  }

  if (error) return <div>Error loading bookings</div>;

  return (
    <Container className="py-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <Typography variant="h4" gutterBottom className="!mb-0">
          Bookings History
        </Typography>
        <p className="text-sm text-gray-500">Total bookings: {sortedBookings.length}</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-md">
        <table className="table w-full">
          <thead className="bg-gray-200">
            <tr>
              <th></th>
              <th>Booking ID</th>
              <th>Vehicle ID</th>
              <th>Booking Date</th>
              <th>Return Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((booking: Booking, index: number) => (
              <tr key={booking.booking_id} className="hover">
                <th>{offset + index + 1}</th>
                <td>{booking.booking_id}</td>
                <td>{booking.vehicle_id}</td>
                <td>{formatLocalDateTime(booking.booking_date)}</td>
                <td>{formatLocalDateTime(booking.return_date)}</td>
                <td>Ksh{booking.total_amount}</td>
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

            {currentBookings.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pageCount > 1 && (
        <div className="flex justify-center mt-4">
          <div className="btn-group">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                className={`btn mx-1 ${index === safeCurrentPage ? 'btn-active' : ''}`}
                onClick={() => handlePageClick(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default BookingsHistory;
