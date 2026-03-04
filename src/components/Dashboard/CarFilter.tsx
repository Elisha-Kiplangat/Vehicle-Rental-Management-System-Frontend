import { useState } from 'react';

interface CarFilterProps {
  onFilterChange: (filter: { vehicleType: string, seatingCapacity: string }) => void;
}

const CarFilter = ({ onFilterChange }: CarFilterProps) => {
  const [selectedVehicleType, setSelectedVehicleType] = useState('All');
  const [selectedSeatingCapacity, setSelectedSeatingCapacity] = useState('All');

  const handleVehicleTypeChange = (e: any) => {
    const vehicleType = e.target.value;
    setSelectedVehicleType(vehicleType);
    onFilterChange({ vehicleType, seatingCapacity: selectedSeatingCapacity });
  };

  const handleSeatingCapacityChange = (e: any) => {
    const seatingCapacity = e.target.value;
    setSelectedSeatingCapacity(seatingCapacity);
    onFilterChange({ vehicleType: selectedVehicleType, seatingCapacity });
  };

  return (
    <div className='bg-gradient-to-r from-blue-50 to-indigo-50 py-2 px-4 shadow-md border-b border-gray-200'>
      <div className='max-w-4xl mx-auto'>
        <div className='flex flex-col md:flex-row items-center justify-center gap-6'>
          
          <div className='flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 min-w-[280px]'>
            
            <div className='flex-1'>
              <label className='block text-xs font-semibold text-gray-500 mb-1' htmlFor="vehicleTypeFilter">
                Vehicle Type
              </label>
              <select 
                className='w-full bg-transparent text-gray-800 font-medium focus:outline-none cursor-pointer' 
                id="vehicleTypeFilter" 
                value={selectedVehicleType} 
                onChange={handleVehicleTypeChange}
              >
                <option value="All">All Vehicles</option>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
              </select>
            </div>
          </div>

          <div className='hidden md:block w-px h-12 bg-gray-300'></div>

          <div className='flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 min-w-[280px]'>
            <svg className='w-6 h-6 text-purple-500 flex-shrink-0' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <div className='flex-1'>
              <label className='block text-xs font-semibold text-gray-500 mb-1' htmlFor="seatingCapacityFilter">
                Seating Capacity
              </label>
              <select 
                className='w-full bg-transparent text-gray-800 font-medium focus:outline-none cursor-pointer' 
                id="seatingCapacityFilter" 
                value={selectedSeatingCapacity} 
                onChange={handleSeatingCapacityChange}
              >
                <option value="All">All Capacities</option>
                <option value="2">2 Passengers</option>
                <option value="4">4 Passengers</option>
                <option value="5">5 Passengers</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarFilter;
