import { Container, Typography, Button } from '@mui/material';
import { useFetchBookingsQuery } from '../../features/BookingAPI';
// import { useDispatch } from 'react-redux';
import {Booking} from '../../features/BookingAPI'

const BookingsHistory = () => {
  const { data: bookingsData, error, isLoading } = useFetchBookingsQuery();
  // const dispatch = useDispatch();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading bookings</div>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Bookings
      </Typography>
      <Button variant="contained" color="primary">Add Booking</Button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded my-6">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Booking ID</th>
              <th className="border px-4 py-2">Vehicle Name</th>
              <th className="border px-4 py-2">Booking Date</th>
              <th className="border px-4 py-2">Return Date</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookingsData?.map((booking: Booking) => (
              <tr key={booking.booking_id}>
                <td className="border px-4 py-2">{booking.booking_id}</td>
                <td className="border px-4 py-2">{booking.vehicle_name}</td>
                <td className="border px-4 py-2">{booking.booking_date}</td>
                <td className="border px-4 py-2">{booking.return_date}</td>
                <td className="border px-4 py-2">${booking.amount}</td>
                <td className="border px-4 py-2">{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default BookingsHistory;
