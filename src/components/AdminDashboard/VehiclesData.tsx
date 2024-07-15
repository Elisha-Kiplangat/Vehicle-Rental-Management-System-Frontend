
import { Container, Typography, Button } from '@mui/material';
import { useFetchVehiclesQuery, Vehicle } from '../../features/VehiclesAPI';

const VehiclesData = () => {
  const { data: vehicles, error, isLoading } = useFetchVehiclesQuery();

  if (isLoading) {
   return <div className="flex justify-center items-center h-screen">
      <div className="spinner"></div> {<span className="loading loading-spinner text-info"></span>}
    </div>;
  }
  if (error) return <div>Error loading vehicles</div>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Vehicles
      </Typography>
      <Button variant="contained" color="primary">Add Vehicle</Button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded my-6">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Specification ID</th>
              <th className="border px-4 py-2">Rental Rate</th>
              <th className="border px-4 py-2">Availability</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle: Vehicle) => (
              <tr key={vehicle.vehicle_id}>
                <td className="border px-4 py-2">{vehicle.vehicle_id}</td>
                <td className="border px-4 py-2">{vehicle.vehicle_specification_id}</td>
                <td className="border px-4 py-2">{vehicle.rental_rate}</td>
                <td className="border px-4 py-2">{vehicle.availability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default VehiclesData;
