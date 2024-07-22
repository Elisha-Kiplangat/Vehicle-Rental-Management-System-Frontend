import { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useFetchLocationsQuery, useAddLocationMutation } from '../../features/LocationsApi';

interface Location {
  location_id: number;
  name: string;
  address: string;
  created_at: string;
  updated_at: string;
}

const Locations = () => {
  const pollingInterval = 10000;
  const { data: locations, error, isLoading } = useFetchLocationsQuery({pollingInterval});
  const [addLocation] = useAddLocationMutation();
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [expandedLocationId, setExpandedLocationId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newLocation, setNewLocation] = useState({ name: '', address: '' });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLocation({ ...newLocation, [e.target.name]: e.target.value });
  };

  const handleAddLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addLocation(newLocation).unwrap();
      setNewLocation({ name: '', address: '' });
      setShowAddForm(false);
    } catch (err) {
      console.error('Failed to add location: ', err);
    }
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
      <Button variant="contained" color="primary" onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? 'Cancel' : 'Add Location'}
      </Button>
      {areAnySelected && (
        <>
          <Button variant="contained" color="secondary" style={{ marginLeft: '10px' }}>Edit</Button>
          <Button variant="contained" color="error" style={{ marginLeft: '10px' }}>Delete</Button>
        </>
      )}
      {showAddForm && (
        <Box component="form" onSubmit={handleAddLocation} sx={{ mt: 2 }}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={newLocation.name}
              onChange={handleChange}
              className="mt-1 p-2 block w-1/2 shadow-sm sm:text-sm border-blue-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              value={newLocation.address}
              onChange={handleChange}
              className="mt-1 p-2 block w-1/2 shadow-sm sm:text-sm border-blue-300 rounded-md"
              required
            />
          </div>
          <Button type="submit" variant="contained" color="primary">Save</Button>
        </Box>
      )}
      <div className="overflow-x-auto mt-4">
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
                  <tr key={`${location.location_id}-details`}>
                    <td></td>
                    <td colSpan={4}>
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
