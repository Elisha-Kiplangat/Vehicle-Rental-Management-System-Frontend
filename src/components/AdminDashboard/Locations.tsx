import { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useFetchLocationsQuery } from '../../features/LocationsApi';

interface Location {
  location_id: number;
  name: string;
  address: string;
  created_at: string;
  updated_at: string;
}

const Locations = () => {
  const { data: locations, error, isLoading } = useFetchLocationsQuery();
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [expandedLocationId, setExpandedLocationId] = useState<number | null>(null);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedLocations([]);
    } else {
      setSelectedLocations(locations ? locations.map((location: Location) => location.location_id) : []);
    }
    setSelectAll(!selectAll);
  };

  const handleSelectLocation = (id: number) => {
    setSelectedLocations((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((locationId) => locationId !== id) : [...prevSelected, id]
    );
  };

  const handleExpandLocation = (id: number) => {
    setExpandedLocationId(expandedLocationId === id ? null : id);
  };

  const areAnySelected = selectedLocations.length > 0;

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="spinner"></div> {<span className="loading loading-spinner text-info"></span>}
    </div>;
  }

  if (error) {
    return <div>Error loading locations</div>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Locations
      </Typography>
      <Button variant="contained" color="primary">Add Location</Button>
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
              <th>Name</th>
              <th>Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {locations && locations.map((location: Location) => (
              <>
                <tr key={location.location_id}>
                  <td>
                    <label>
                      <input 
                        type="checkbox" 
                        className="checkbox" 
                        checked={selectedLocations.includes(location.location_id)}
                        onChange={() => handleSelectLocation(location.location_id)}
                      />
                    </label>
                  </td>
                  <td>{location.location_id}</td>
                  <td>{location.name}</td>
                  <td>{location.address}</td>
                  <td>
                    <button 
                      className="btn btn-ghost p-2" 
                      onClick={() => handleExpandLocation(location.location_id)}
                    >
                      {expandedLocationId === location.location_id ? 'Hide details' : 'Show details'}
                    </button>
                  </td>
                </tr>
                {expandedLocationId === location.location_id && (
                  <tr key={location.location_id}>
                    <td></td>
                    <td colSpan={6}>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Created At</th>
                            <th>Updated At</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{location.created_at}</td>
                            <td>{location.updated_at}</td>
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

export default Locations;
