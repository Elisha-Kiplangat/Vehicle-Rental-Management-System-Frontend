import { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useFetchVehicleDetailsQuery, useDeleteVehicleMutation, TVehicleDetails } from '../../features/VehiclesAPI';
import AddVehicle from '../AddVehicle';
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
  
};

const VehiclesData = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<TVehicleDetails | null>(null);
  const { searchQuery } = useOutletContext<{ searchQuery: string }>();
  const pollingInterval = 1000;
  const { data: vehicles, error, isLoading } = useFetchVehicleDetailsQuery({ pollingInterval });
  const [deleteVehicle] = useDeleteVehicleMutation();

  const handleButtonClick = () => {
    setShowForm((prevShowForm) => !prevShowForm);
    setSelectedVehicle(null); 
  };

  const handleEdit = (vehicle: TVehicleDetails) => {
    setSelectedVehicle(vehicle);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteVehicle(id).unwrap();
      console.log('Vehicle deleted successfully');
    } catch (error) {
      console.error('Failed to delete vehicle: ', error);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedVehicle(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
        <span className="loading loading-spinner text-info"></span>
      </div>
    );
  }
  
  if (error) return <div>Error loading vehicles</div>;

  const filteredVehicles = (vehicles ?? []).filter((vehicle: TVehicleDetails) =>
    vehicle.vehicle_spec.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="py-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <Typography variant="h4" gutterBottom className="!mb-0">
          Vehicles
        </Typography>
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-500">Showing {filteredVehicles.length} vehicle(s)</p>
          <Button variant="contained" color="primary" onClick={handleButtonClick}>
            {showForm ? 'Close Form' : 'Add Vehicle'}
          </Button>
        </div>
      </div>

      {showForm && <AddVehicle vehicleToEdit={selectedVehicle} onClose={handleCloseForm} />}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredVehicles.map((vehicle: TVehicleDetails) => (
          <div
            key={vehicle.vehicle_id}
            className="rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative group bg-gradient-to-br from-gray-50 to-gray-100 p-4">
              <img
                src={vehicleImages[vehicle.vehicle_spec.model] || `${Audi}`}
                alt={vehicle.vehicle_spec.model}
                className="w-full h-56 rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className={`absolute top-7 right-7 px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
                  vehicle.availability ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
              >
                {vehicle.availability ? 'Available' : 'Unavailable'}
              </div>
            </div>

            <div className="p-5">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-3">
                  {vehicle.vehicle_spec.vehicle_type}
                </span>
                <h2 className="text-2xl font-bold text-gray-800">{vehicle.vehicle_spec.model}</h2>
              </div>

              <div className="space-y-2 mb-5 text-sm text-gray-700">
                <p><span className="font-semibold text-gray-900">Vehicle ID:</span> {vehicle.vehicle_id}</p>
                <p><span className="font-semibold text-gray-900">Fuel Type:</span> {vehicle.vehicle_spec.fuel_type || 'Unknown'}</p>
                <p><span className="font-semibold text-gray-900">Seating:</span> {vehicle.vehicle_spec.seating_capacity} passengers</p>
              </div>

              <div className="mb-5 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200">
                <p className="text-xs text-blue-700 font-medium">Rental Rate</p>
                <p className="text-2xl text-blue-900 font-bold">{vehicle.rental_rate}<span className="text-sm font-normal text-gray-600">/day</span></p>
              </div>

              <div className="flex gap-3">
                <button 
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => handleEdit(vehicle)}
                >
                  Edit
                </button>
                <button 
                  className="flex-1 bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => handleDelete(vehicle.vehicle_id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredVehicles.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-gray-300 py-14 text-center text-gray-500 bg-white">
            No vehicles match your search.
          </div>
        )}
      </div>
    </Container>
  );
};


export default VehiclesData;
