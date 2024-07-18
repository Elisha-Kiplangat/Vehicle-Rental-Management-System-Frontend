import { useState } from 'react';
import { Container } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'daisyui/dist/full.css';
import { useCreateCheckoutSessionMutation } from '../../features/PaymentApi';
import { useAddBookingMutation } from '../../features/BookingAPI';

interface CheckoutProps {
  vehicle: {
    vehicle_id: number;
    vehicle_spec: {
      model: string;
      fuel_type: string | null; 
      seating_capacity: number;
    };
    rental_rate: number;
    availability: boolean;
  };
  onBack: () => void;
}

const Checkout = ({ vehicle, onBack }: CheckoutProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('Card');
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();
  const [createBooking] = useAddBookingMutation();

  const calculateAmount = () => {
    if (!startDate || !endDate) return 0;
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return days * vehicle.rental_rate;
  };

  const handleRentNow = async () => {
    const amount = calculateAmount();
    const amount1 = amount * 100000;
    console.log('Amount to be paid:', amount1);

    const userIdStr = localStorage.getItem('user_id');
    if (!userIdStr) {
        console.error('User ID not found in localStorage');
        return;
    }

    const user_id = parseInt(userIdStr, 10);
    if (isNaN(user_id)) {
        console.error('User ID is not a valid number');
        return;
    }

    const bookingDate = startDate ? startDate.toISOString() : '';
    const returnDate = endDate ? endDate.toISOString() : '';

    const vehicle_id_str = vehicle.vehicle_id.toString();
    console.log(vehicle_id_str, typeof vehicle_id_str)

    const bookingPayload = {
        user_id: user_id, 
        vehicle_id: vehicle.vehicle_id,
        location_id: 6, 
        booking_date: bookingDate,
        return_date: returnDate,
        total_amount: amount1,
        booking_status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };

    try {
        const bookingResponse = await createBooking(bookingPayload).unwrap();
        const bookingId = bookingResponse.booking_id; 

        if (!bookingId) {
            throw new Error('Booking ID not returned');
        }

        const paymentPayload = {
            amount: amount1,
            currency: 'kes',
            booking_id: bookingId
        };

        console.log('Payment Payload:', paymentPayload);
        const checkoutResponse = await createCheckoutSession(paymentPayload).unwrap();
        window.location.href = `${checkoutResponse.checkoutUrl}`;
    } catch (error) {
        console.error('Error creating checkout session:', error);
    }
};


  return (
    <Container className="bg-gray-200 p-6 mt-10 rounded-lg">
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">{vehicle.vehicle_spec.model}</h2>
          <p className="mb-4">Renting rate: {vehicle.rental_rate}</p>
        </div>
        <button className="btn bg-blue-100" onClick={onBack}>
          Back
        </button>
      </div>

      <div className='flex flex-row'>
        <div className="mb-4 mr-12">
          <label className="block mb-2 font-bold">Start date</label>
          <DatePicker
            selected={startDate}
            onChange={(date: any) => setStartDate(date)}
            className="input input-bordered w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">End date</label>
          <DatePicker
            selected={endDate}
            onChange={(date: any) => setEndDate(date)}
            className="input input-bordered w-full"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Amount to pay</label>
        <input
          type="text"
          value={calculateAmount()}
          readOnly
          className="input input-bordered w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Payment method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="Credit Card">Credit Card</option>
        </select>
      </div>

      <button className="btn btn-primary w-full" onClick={handleRentNow}>
        Pay
      </button>
    </Container>
  );
};

export default Checkout;
