import { useState } from 'react';
import { Container } from '@mui/material';
import CarFilter from './CarFilter';
import VehicleDetails from './VehicleDetails'; 
import Checkout from './Checkout';
import { useFetchVehicleDetailsQuery, TVehicleDetails } from '../../features/VehiclesAPI';
import { useOutletContext } from 'react-router-dom';
import Audi from '../../assets/Audi.jpeg'
import Mazda from '../../assets/Mazda.jpg'
import Benz from '../../assets/Benz.jpg'
import bike1 from '../../assets/bike1.jpg'
import bike2 from '../../assets/bike1.jpg'
import bike3 from '../../assets/bike3.jpg'
import Cybertruck from '../../assets/Cybertruck.jpg'
import isuzu from '../../assets/isuzu.jpg'
import IsuzuPickup from '../../assets/isuzu-pickup.jpg'
import pickup from '../../assets/pickup.jpg'
import Canter from '../../assets/canter.jpg'
import forrdPickup from '../../assets/forrd-pickup.jpg'
import Porsche from '../../assets/porsche.jpg'
import Fielder from '../../assets/Fielder.jpg'
import Vitz from '../../assets/Vitz.jpg'
import Purosangue from '../../assets/Purosangue.jpg'
import TX from '../../assets/TX.jpg'
import V8 from '../../assets/V8.jpg'
import Skyline from '../../assets/Skyline.jpg'
import Impreza from '../../assets/Impreza.jpg'
import CX5 from '../../assets/CX5.jpg'

const vehicleImages: { [key: string]: string } = {
  'Audi': `${Audi}`,
  'Honda': `${bike1}`,
  'Tvs': `${bike2}`,
  'Yamaha': `${bike3}`,
  'Mercedes': `${Benz}`,
  'Cybertruck': `${Cybertruck}`,
  'Honda c3': `${bike2}`,
  'Mazda': `${Mazda}`,
  'Isuzu': `${isuzu}`,
  'Isuzu-pickup': `${IsuzuPickup}`,
  'Toyota-pickup': `${pickup}`,
  'Canter': `${Canter}`,
  'Ford': `${forrdPickup}`,
  'Fielder': `${Fielder}`,
  'Porsche': `${Porsche}`,
  'Vitz': `${Vitz}`,
  'Purosangue': `${Purosangue}`,
  'TX': `${TX}`,
  'V8': `${V8}`,
  'Skyline': `${Skyline}`,
  'Impreza': `${Impreza}`,
  'CX5': `${CX5}`,
}

const Vehicles = () => {
  const [filter, setFilter] = useState({ vehicleType: 'All', seatingCapacity: 'All' });
  const [selectedVehicle, setSelectedVehicle] = useState<TVehicleDetails | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const { searchQuery } = useOutletContext<{ searchQuery: string }>();

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
      (filter.seatingCapacity === 'All' || vehicle.vehicle_spec.seating_capacity === parseInt(filter.seatingCapacity)) &&
      (vehicle.vehicle_spec.model.toLowerCase().includes(searchQuery.toLowerCase()) || vehicle.vehicle_spec.fuel_type?.toLowerCase().includes(searchQuery.toLowerCase()))
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
                <img src={vehicleImages[vehicle.vehicle_spec.model] || `${Audi}`} alt={vehicle.vehicle_spec.model} className="w-full h-48 object-cover" />
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
