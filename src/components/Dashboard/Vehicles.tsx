import { useState } from 'react';
import { Container } from '@mui/material';
import CarFilter from './CarFilter';
import VehicleDetails from './VehicleDetails'; 
import image from '../../assets/Audi.jpeg';

interface Tvehicles {
  id: number;
  name: string;
  type: string;
  color: string;
  location: string;
  image?: string;
  description?: string; 
}

const Vehicles = () => {
  const [filter, setFilter] = useState({ vehicleType: 'All', location: 'All' });
  const [selectedVehicle, setSelectedVehicle] = useState<Tvehicles | null>(null);

  const vehicles: Tvehicles[] = [
    {
      id: 1,
      name: 'Car',
      type: '4 wheeler',
      color: 'red',
      location: 'Nairobi',
      image: `${image}`,
      description: 'This is a personal renting vehicle. it is a Five sitter vehicle'
    },
    {
      id: 2,
      name: 'Bike',
      type: '2 wheeler',
      color: 'black',
      location: 'Kirinyaga',
      image: `${image}`,
      description: 'This is a personal renting vehicle. it is a Five sitter vehicle'
    },
    {
      id: 3,
      name: 'Truck',
      type: '6 wheeler',
      color: 'blue',
      location: 'Mombasa',
      image: `${image}`,
      description: 'This is a personal renting vehicle. it is a Five sitter vehicle'
    },
  ];

  const handleFilterChange = (newFilter: { vehicleType: string; location: string }) => {
    setFilter(newFilter);
  };

  const handleViewDetails = (vehicle: Tvehicles) => {
    setSelectedVehicle(vehicle);
  };

  const handleRentNow = (vehicle: Tvehicles) => {
    console.log('Renting vehicle:', vehicle);
  };

  const handleBackToList = () => {
    setSelectedVehicle(null);
  };

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      (filter.vehicleType === 'All' || vehicle.name === filter.vehicleType) &&
      (filter.location === 'All' || vehicle.location === filter.location)
  );

  return (
    <>
      <CarFilter onFilterChange={handleFilterChange} />
      <Container>
        {selectedVehicle ? (
          <VehicleDetails
            vehicle={selectedVehicle}
            onRent={handleRentNow}
            onBack={handleBackToList}
          />
        ) : 
        (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="max-w-sm rounded-lg overflow-hidden shadow-md bg-white border border-gray-200 p-4"
              >
                <img src={vehicle.image} alt={vehicle.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{vehicle.name}</h3>
                  <p className="text-gray-700 mb-1">{vehicle.type}</p>
                  {/* <p className="text-gray-700 mb-1">{vehicle.color}</p>
                  <p className="text-gray-700 mb-4">{vehicle.location}</p> */}
                  <button
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleViewDetails(vehicle)}
                  >
                    View Car Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

export default Vehicles;
