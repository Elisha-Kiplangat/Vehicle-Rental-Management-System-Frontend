import { useState, useEffect } from 'react';
import { Container } from '@mui/material';
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
  const [amountToPay, setAmountToPay] = useState<number>(0);

  const calculateAmount = () => {
    if (!startDate || !endDate) return 0;
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const amount = days * vehicle.rental_rate;
    setAmountToPay(amount * 100000);
  };
    useEffect(() => {
    calculateAmount();
  }, [startDate, endDate, vehicle.rental_rate]);

  const handleRentNow = async () => {
    // const amount = calculateAmount();
    //  const calculatedAmount = amount * 100000;
    // setAmountToPay(calculatedAmount);
    // console.log('Amount to be paid:', calculatedAmount);


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
        total_amount: amountToPay,
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
            amount: amountToPay,
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
    <Container>
      <div className="max-w-4xl mx-auto mt-10 mb-10">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          

          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-gray-200">
            <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{vehicle.vehicle_spec.model}</h3>
                <p className="text-sm text-gray-600">Daily Rate: <span className="font-bold text-blue-600">{vehicle.rental_rate}</span></p>
              </div>
            </div>
            <button 
                className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg hover:bg-blue-50 transition-colors duration-300 shadow-md"
                onClick={onBack}
              >
                Back
              </button>
              </div>
          </div>

          <div className="p-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Pick-up Date & Time
                </label>
                <input 
                  type="datetime-local" 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300 bg-gray-50 hover:bg-white" 
                  value={startDate ? startDate.toISOString().slice(0, 16) : ''} 
                  onChange={(e) => setStartDate(new Date(e.target.value))} 
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Return Date & Time
                </label>
                <input 
                  type="datetime-local" 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300 bg-gray-50 hover:bg-white" 
                  value={endDate ? endDate.toISOString().slice(0, 16) : ''} 
                  onChange={(e) => setEndDate(new Date(e.target.value))} 
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Total Amount
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={amountToPay}
                  readOnly
                  className="w-full px-4 py-4 border-2 border-green-200 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 font-bold text-xl text-green-700 cursor-not-allowed"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">KES</span>
              </div>
            </div>

            <div className="mb-8">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300 bg-gray-50 hover:bg-white cursor-pointer"
              >
                <option value="Credit Card">Credit Card</option>
              </select>
            </div>

            <button 
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
              onClick={handleRentNow}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Proceed to Payment
            </button>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-blue-900">Secure Payment</p>
                  <p className="text-xs text-blue-700 mt-1">Your payment information is encrypted and secure.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Checkout;
