import { useState } from 'react';
import { Container } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'daisyui/dist/full.css';

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

  const calculateAmount = () => {
    if (!startDate || !endDate) return 0;
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return days * vehicle.rental_rate;
  };
  const handleRentNow = () => {
    const amount = calculateAmount();
    console.log('Processing rental for vehicle:', vehicle);
    console.log('Rental Period:', { startDate, endDate });
    console.log('Amount to be paid:', amount);
    console.log('Payment Method:', paymentMethod);
  };

  return (
    <Container className="bg-gray-200 p-6 mt-10 rounded-lg">
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">{vehicle.vehicle_spec.model}</h2>
          {/* <p>Fuel type: {vehicle.vehicle_spec.fuel_type}</p> */}
          {/* <p>Location: {vehicle.location}</p> */}
          <p className="mb-4">Renting rate: {vehicle.rental_rate}</p>
        </div>
        <button className="btn bg-blue-100" onClick={onBack}>
          Back
        </button>
      </div>

      
    <div className='flex flex-row  '>
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
          <option value="M-Pesa">M-Pesa</option>
          <option value="Credit Card">Credit Card</option>
          {/* <option value="Paypal">Paypal</option> */}
        </select>
      </div>

      <button className="btn btn-primary w-full" onClick={handleRentNow}>
        Pay
      </button>
    </Container>
  );
};

export default Checkout;
