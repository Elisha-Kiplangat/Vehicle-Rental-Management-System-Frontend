import { useState } from 'react';
import { Container } from '@mui/material';
import image from '../../assets/Audi.jpeg';
import CarFilter from './CarFilter';
import VehicleDetails from './VehicleDetails'; 
import Checkout from './Checkout';
import { useFetchVehicleDetailsQuery, TVehicleDetails } from '../../features/VehiclesAPI';

const Vehicles = () => {
  const [filter, setFilter] = useState({ vehicleType: 'All', seatingCapacity: 'All' });
  const [selectedVehicle, setSelectedVehicle] = useState<TVehicleDetails | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const { data: vehicles, error, isLoading } = useFetchVehicleDetailsQuery({ pollingInterval: 3000, skipPollingIfUnfocused: true });

  if (isLoading) {
   return <div className="flex justify-center items-center h-screen">
      <div className="spinner"></div> {<span className="loading loading-spinner text-info"></span>}
    </div>;
  }
  if (error) return <div>Error loading vehicles</div>;

  const handleFilterChange = (newFilter: { vehicleType: string; seatingCapacity: string }) => {
    setFilter(newFilter);
  };

  const handleViewDetails = (vehicle: TVehicleDetails) => {
    setSelectedVehicle(vehicle);
    setIsCheckingOut(false);
  };

  const handleRentNow = (vehicle: TVehicleDetails) => {
    setSelectedVehicle(vehicle);
    setIsCheckingOut(true);
  };

  const handleBackToList = () => {
    setSelectedVehicle(null);
    setIsCheckingOut(false);
  };

  const filteredVehicles = vehicles?.filter(
    (vehicle: TVehicleDetails) =>
      (filter.vehicleType === 'All' || vehicle.vehicle_spec.vehicle_type === filter.vehicleType) &&
      (filter.seatingCapacity === 'All' || vehicle.vehicle_spec.seating_capacity === parseInt(filter.seatingCapacity))
  );

  return (
    <>
      <CarFilter onFilterChange={handleFilterChange} />
      <Container>
        {selectedVehicle && isCheckingOut ? (
          <Checkout vehicle={selectedVehicle} onBack={handleBackToList} />
        ) : selectedVehicle ? (
          <VehicleDetails
            vehicle={selectedVehicle}
            onRent={handleRentNow}
            onBack={handleBackToList}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
            {filteredVehicles?.map((vehicle: TVehicleDetails) => (
              <div
                key={vehicle.vehicle_id}
                className="max-w-sm rounded-lg overflow-hidden shadow-md bg-white border border-gray-200 p-4"
              >
                <img src={ `${image}`} alt={vehicle.vehicle_spec.model} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{vehicle.vehicle_spec.model}</h3>
                  <p className="text-gray-700 mb-1">{vehicle.vehicle_spec.fuel_type || 'Unknown'}</p>
                  <p className="text-gray-700 mb-4">Seats: {vehicle.vehicle_spec.seating_capacity}</p>
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
