

interface Booking {
  booking_id: number;
  vehicle_name: string;
  booking_date: string;
  return_date: string;
  amount: number;
  status: string;
}

const bookingsData: Booking[] = [
  {
    booking_id: 1,
    vehicle_name: 'Toyota Camry',
    booking_date: '2024-07-10',
    return_date: '2024-07-15',
    amount: 500,
    status: 'Confirmed',
  },
  {
    booking_id: 2,
    vehicle_name: 'Honda Civic',
    booking_date: '2024-07-05',
    return_date: '2024-07-08',
    amount: 400,
    status: 'Pending',
  },
  // Add more bookings as needed
];

const Bookings = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
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
          {bookingsData.map((booking) => (
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
  );
};

export default Bookings;
