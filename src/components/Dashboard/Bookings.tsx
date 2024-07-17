
import { useFetchBookingByIdQuery, Booking } from '../../features/BookingAPI';

const Bookings = () => {
    const userId = localStorage.getItem('user_id');
    const pollingInterval = 10000;
    const { data: booking, error, isLoading } = useFetchBookingByIdQuery(Number(userId), { pollingInterval });
    console.log(booking)

    if (isLoading) {
   return <div className="flex justify-center items-center h-screen">
      <div className="spinner"></div> {<span className="loading loading-spinner text-info"></span>}
    </div>;
  }
  if (error) return <div>Error loading bookings</div>;
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
                        
                    {booking.map((booking: Booking) => (
                        <tr key={booking.booking_id}>
                            <td className="border px-4 py-2">{booking.booking_id}</td>
                            <td className="border px-4 py-2">{booking.vehicle_id}</td>
                            <td className="border px-4 py-2">{booking.booking_date}</td>
                            <td className="border px-4 py-2">{booking.return_date}</td>
                            <td className="border px-4 py-2">${booking.total_amount}</td>
                            <td className="border px-4 py-2">{booking.booking_status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
             
        </div>
    );
};

export default Bookings;
