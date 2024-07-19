import { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useFetchFleetsQuery } from '../../features/FleetApi';

interface Fleet {
    fleet_id: number;
  vehicle_id: number;
  maintenance_cost: string;
  status: string;
  current_value: string;
  acquisition_date: string;
  depreciation_rate: string
  created_at: string;
  updated_at: string;
}

const FleetManagement = () => {
  const { data: fleet, error, isLoading } = useFetchFleetsQuery();
  const [selectedVehicles, setSelectedVehicles] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [expandedVehicleId, setExpandedVehicleId] = useState<number | null>(null);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedVehicles([]);
    } else {
      setSelectedVehicles(fleet ? fleet.map((vehicle: Fleet) => vehicle.vehicle_id) : []);
    }
    setSelectAll(!selectAll);
  };

  const handleSelectVehicle = (id: number) => {
    setSelectedVehicles((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((vehicleId) => vehicleId !== id) : [...prevSelected, id]
    );
  };

  const handleExpandVehicle = (id: number) => {
    setExpandedVehicleId(expandedVehicleId === id ? null : id);
  };

  const areAnySelected = selectedVehicles.length > 0;

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="spinner"></div> {<span className="loading loading-spinner text-info"></span>}
    </div>;
  }

  if (error) {
    return <div>Error loading fleet data</div>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Fleet Management
      </Typography>
      <Button variant="contained" color="primary">Add Fleet</Button>
      {areAnySelected && (
        <>
          <Button variant="contained" color="secondary" style={{ marginLeft: '10px' }}>Edit</Button>
          <Button variant="contained" color="error" style={{ marginLeft: '10px' }}>Delete</Button>
        </>
      )}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input 
                    type="checkbox" 
                    className="checkbox" 
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </label>
              </th>
              <th>ID</th>
              <th>Vehicle</th>
              <th>Maintenance Cost</th>
              <th>Status</th>
              <th>Current Value</th>
            </tr>
          </thead>
          <tbody>
            {fleet && fleet.map((vehicle: Fleet) => (
              <>
                <tr key={vehicle.fleet_id}>
                  <td>
                    <label>
                      <input 
                        type="checkbox" 
                        className="checkbox" 
                        checked={selectedVehicles.includes(vehicle.vehicle_id)}
                        onChange={() => handleSelectVehicle(vehicle.vehicle_id)}
                      />
                    </label>
                  </td>
                  <td>{vehicle.fleet_id}</td>
                  <td>{vehicle.vehicle_id}</td>
                  <td>{vehicle.current_value}</td>
                  <td>{vehicle.status}</td>
                  <td>
                    <button 
                      className="btn btn-ghost p-2" 
                      onClick={() => handleExpandVehicle(vehicle.vehicle_id)}
                    >
                      {expandedVehicleId === vehicle.vehicle_id ? 'Hide details' : 'Show details'}
                    </button>
                  </td>
                </tr>
                {expandedVehicleId === vehicle.vehicle_id && (
                  <tr key={`${vehicle.vehicle_id}`}>
                    <td></td>
                    <td colSpan={6}>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Acquisition Date</th>
                            <th>Depreciation Rate</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{vehicle.acquisition_date}</td>
                            <td>{vehicle.depreciation_rate}</td>
                            <td>{vehicle.created_at}</td>
                            <td>{vehicle.updated_at}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default FleetManagement;
