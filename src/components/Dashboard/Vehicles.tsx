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
      {!selectedVehicle && <CarFilter onFilterChange={handleFilterChange} />}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 pb-8">
            {filteredVehicles?.map((vehicle: TVehicleDetails) => (
              <div
                key={vehicle.vehicle_id}
                className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl bg-white border border-gray-100 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={vehicleImages[vehicle.vehicle_spec.model] || `${Audi}`} 
                    alt={vehicle.vehicle_spec.model} 
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" 
                  />
                  
                   <div className={`absolute top-3 right-3 px-3 py-1 rounded-full font-semibold text-xs shadow-md ${
              vehicle.availability 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              {vehicle.availability ? '✓ Available' : '✗ Not Available'}
            </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{vehicle.vehicle_spec.model}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-sm font-medium">{vehicle.vehicle_spec.fuel_type || 'Unknown'}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-sm font-medium">{vehicle.vehicle_spec.seating_capacity} Seats</span>
                    </div>
                  </div>
                  
                  <button
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    onClick={() => handleViewDetails(vehicle)}
                  >
                    View Details
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
