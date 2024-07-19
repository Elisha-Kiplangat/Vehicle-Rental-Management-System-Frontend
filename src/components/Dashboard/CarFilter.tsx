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
    <div className='flex justify-center'>
      <label className='mr-4' htmlFor="vehicleTypeFilter">Filter by model:</label>
      <select className='bg-blue-100 rounded-sm mr-10' id="vehicleTypeFilter" value={selectedVehicleType} onChange={handleVehicleTypeChange}>
        <option value="All">All</option>
        <option value="Car">Car</option>
        <option value="Bike">Bike</option>
        {/* <option value="Model 3">Model 3</option> */}
      </select>

      <label className='mr-4' htmlFor="seatingCapacityFilter">Filter by seating capacity:</label>
      <select className='bg-blue-100 rounded-sm' id="seatingCapacityFilter" value={selectedSeatingCapacity} onChange={handleSeatingCapacityChange}>
        <option value="All">All</option>
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
  );
};

export default CarFilter;
