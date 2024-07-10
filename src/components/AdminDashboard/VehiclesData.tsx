
import { Container, Typography, Button } from '@mui/material';

const VehiclesData = () => {
  const vehicles = [
    { id: 1, make: 'Toyota', model: 'Camry', year: 2020 },
    { id: 2, make: 'Honda', model: 'Accord', year: 2021 },
    // Add more vehicles as needed
  ];

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
              <th className="border px-4 py-2">Make</th>
              <th className="border px-4 py-2">Model</th>
              <th className="border px-4 py-2">Year</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td className="border px-4 py-2">{vehicle.id}</td>
                <td className="border px-4 py-2">{vehicle.make}</td>
                <td className="border px-4 py-2">{vehicle.model}</td>
                <td className="border px-4 py-2">{vehicle.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default VehiclesData;
