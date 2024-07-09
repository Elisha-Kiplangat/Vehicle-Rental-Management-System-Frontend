import { useState } from 'react';

interface CarFilterProps {
  onFilterChange: (filter: { vehicleType: string, location: string }) => void;
}

const CarFilter = ({ onFilterChange }: CarFilterProps) => {
  const [selectedVehicleType, setSelectedVehicleType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const handleVehicleTypeChange = (e: any) => {
    const vehicleType = e.target.value;
    setSelectedVehicleType(vehicleType);
    onFilterChange({ vehicleType, location: selectedLocation });
  };

  const handleLocationChange = (e: any) => {
    const location = e.target.value;
    setSelectedLocation(location);
    onFilterChange({ vehicleType: selectedVehicleType, location });
  };

  return (
    <div className='flex justify-center'>
      <label className='mr-4' htmlFor="vehicleTypeFilter">Filter by type:</label>
      <select className='bg-blue-100 rounded-sm mr-10' id="vehicleTypeFilter" value={selectedVehicleType} onChange={handleVehicleTypeChange}>
        <option value="All">All</option>
        <option value="Car">Car</option>
        <option value="Bike">Bike</option>
        <option value="Truck">Truck</option>
      </select>

      <label className='mr-4' htmlFor="locationFilter">Filter by location:</label>
      <select className='bg-blue-100 rounded-sm' id="locationFilter" value={selectedLocation} onChange={handleLocationChange}>
        <option value="All">All</option>
        <option value="Kirinyaga">Kirinyaga</option>
        <option value="Nairobi">Nairobi</option>
        <option value="Mombasa">Mombasa</option>
      </select>
    </div>
  );
};

export default CarFilter;

