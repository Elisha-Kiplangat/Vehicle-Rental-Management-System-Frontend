import { useFetchBookingByIdQuery, Booking } from '../../features/BookingAPI';

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

const Bookings = () => {
  const userId = localStorage.getItem('user_id');
  const pollingInterval = 10000;
  const { data: bookings, error, isLoading } = useFetchBookingByIdQuery(Number(userId), { pollingInterval });
  const bookingsLimit = 10;

  const currentBookings = bookings
    ? [...bookings]
        .sort(
          (firstBooking, secondBooking) =>
            new Date(secondBooking.booking_date).getTime() - new Date(firstBooking.booking_date).getTime()
        )
        .slice(0, bookingsLimit)
    : [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-info"></span>
      </div>
    );
  }

  if (error) return <div>Error loading bookings</div>;

  return (
    <div className="overflow-x-auto p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Bookings</h2>
        <p className="text-sm text-gray-500">
          Showing {currentBookings.length} of {bookings?.length ?? 0}
        </p>
      </div>
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
          {currentBookings.map((booking: Booking, index: number) => (
            <tr key={booking.booking_id} className="hover">
              <th>{index + 1}</th>
              {/* <td>{booking.booking_id}</td> */}
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
              <td colSpan={6} className="text-center py-8 text-gray-500">
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
