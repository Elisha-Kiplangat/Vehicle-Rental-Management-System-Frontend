import { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useFetchVehicleDetailsQuery, useDeleteVehicleMutation, TVehicleDetails } from '../../features/VehiclesAPI';
import AddVehicle from '../AddVehicle';
import image from '../../assets/Audi.jpeg';
import { useOutletContext } from 'react-router-dom';

const VehiclesData = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<TVehicleDetails | null>(null);
  const { searchQuery } = useOutletContext<{ searchQuery: string }>();
  const pollingInterval = 1000;
  const { data: vehicles, error, isLoading } = useFetchVehicleDetailsQuery({ pollingInterval });
  const [deleteVehicle] = useDeleteVehicleMutation();

  const handleButtonClick = () => {
    setShowForm((prevShowForm) => !prevShowForm);
    setSelectedVehicle(null); // Clear selection when adding a new vehicle
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

  const filteredVehicles = vehicles.filter((vehicle: TVehicleDetails) =>
    vehicle.vehicle_spec.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Vehicles
      </Typography>
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        {showForm ? 'Close Form' : 'Add Vehicle'}
      </Button>
      {showForm && <AddVehicle vehicleToEdit={selectedVehicle} onClose={handleCloseForm} />}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {filteredVehicles.map((vehicle: TVehicleDetails) => (
          <div
            key={vehicle.vehicle_id}
            className="max-w-sm rounded-lg overflow-hidden shadow-md bg-white border border-gray-200 p-4"
          >
            <img src={image} alt={vehicle.vehicle_spec.model} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">{vehicle.vehicle_spec.model}</h2>
              <p className="text-gray-700 mb-1">Vehicle ID: {vehicle.vehicle_id}</p>
              <p className="text-gray-700 mb-1">Rental Rate: ${vehicle.rental_rate}</p>
              <p className="text-gray-700 mb-1">Fuel Type: {vehicle.vehicle_spec.fuel_type}</p>
              <p className="text-gray-700 mb-1">Seating Capacity: {vehicle.vehicle_spec.seating_capacity}</p>
              <p className="text-gray-700 mb-4">Availability: {vehicle.availability ? 'Yes' : 'No'}</p>
              <div className="flex flex-row">
                <button 
                  className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-4 mr-5 rounded"
                  onClick={() => handleEdit(vehicle)}
                >
                  Edit
                </button>
                <button 
                  className="w-1/2 bg-red-400 hover:bg-red-500 text-white font-bold py-0 px-4 ml-5 rounded"
                  onClick={() => handleDelete(vehicle.vehicle_id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};


export default VehiclesData;
