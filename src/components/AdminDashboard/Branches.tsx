import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { Container, Typography, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useFetchBranchesQuery, useAddBranchesMutation } from '../../features/BranchesApi';
import { useFetchLocationsQuery } from '../../features/LocationsApi';

interface Branch {
  branch_id: number;
  name: string;
  contact_phone: string;
  created_at: string;
  updated_at: string;
}

const Branches = () => {
  const pollingInterval = 10000;
  const { data: branches, error: branchesError, isLoading: branchesLoading } = useFetchBranchesQuery({pollingInterval});
  const { data: locations, error: locationsError, isLoading: locationsLoading } = useFetchLocationsQuery({pollingInterval});
  const [addBranch] = useAddBranchesMutation();
  const [selectedBranches, setSelectedBranches] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [expandedBranchId, setExpandedBranchId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newBranch, setNewBranch] = useState({ name: '', contact_phone: '', location_id: 0 });

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedBranches([]);
    } else {
      setSelectedBranches(branches ? branches.map((branch: Branch) => branch.branch_id) : []);
    }
    setSelectAll(!selectAll);
  };

  const handleSelectBranch = (id: number) => {
    setSelectedBranches((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((branchId) => branchId !== id) : [...prevSelected, id]
    );
  };

  const handleExpandBranch = (id: number) => {
    setExpandedBranchId(expandedBranchId === id ? null : id);
  };

  const handleChange = (e: React.ChangeEvent<{ name?: string; value: string }>) => {
    const { name, value } = e.target;
    setNewBranch({ ...newBranch, [name as string]: value });
  };
  const handleSelectChange = (event: SelectChangeEvent<number>) => {
  const name = event.target.name;
  const value = event.target.value;
  setNewBranch({ ...newBranch, [name]: value });
};

  const handleAddBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBranch(newBranch).unwrap();
      setNewBranch({ name: '', contact_phone: '', location_id: 0 });
      setShowAddForm(false);
    } catch (err) {
      console.error('Failed to add branch: ', err);
    }
  };

  const areAnySelected = selectedBranches.length > 0;

  if (branchesLoading || locationsLoading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="spinner"></div> {<span className="loading loading-spinner text-info"></span>}
    </div>;
  }

  if (branchesError || locationsError) {
    return <div>Error loading branches or locations</div>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Branches
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? 'Cancel' : 'Add Branch'}
      </Button>
      {areAnySelected && (
        <>
          <Button variant="contained" color="secondary" style={{ marginLeft: '10px' }}>Edit</Button>
          <Button variant="contained" color="error" style={{ marginLeft: '10px' }}>Delete</Button>
        </>
      )}
      {showAddForm && (
        <Box component="form" onSubmit={handleAddBranch} sx={{ mt: 2 }}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={newBranch.name}
              onChange={handleChange}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700">Contact Phone</label>
            <input
              id="contact_phone"
              name="contact_phone"
              type="text"
              value={newBranch.contact_phone}
              onChange={handleChange}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <FormControl fullWidth>
              <InputLabel id="location-label">Location</InputLabel>
              <Select
  labelId="location-label"
  id="location_id"
  name="location_id"
  value={newBranch.location_id}
  onChange={handleSelectChange} // Use the new handler here
  required
>
  {locations && locations.map((location: any) => (
    <MenuItem key={location.location_id} value={location.location_id}>
      {location.name}
    </MenuItem>
  ))}
</Select>
            </FormControl>
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
              <th>Contact</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {branches && branches.map((branch: Branch) => (
              <>
                <tr key={branch.branch_id}>
                  <td>
                    <label>
                      <input 
                        type="checkbox" 
                        className="checkbox" 
                        checked={selectedBranches.includes(branch.branch_id)}
                        onChange={() => handleSelectBranch(branch.branch_id)}
                      />
                    </label>
                  </td>
                  <td>{branch.branch_id}</td>
                  <td>{branch.name}</td>
                  <td>{branch.contact_phone}</td>
                  <td>
                    <button 
                      className="btn btn-ghost p-2" 
                      onClick={() => handleExpandBranch(branch.branch_id)}
                    >
                      {expandedBranchId === branch.branch_id ? 'Hide details' : 'Show details'}
                    </button>
                  </td>
                </tr>
                {expandedBranchId === branch.branch_id && (
                  <tr key={`${branch.branch_id}-details`}>
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
                            <td>{branch.created_at}</td>
                            <td>{branch.updated_at}</td>
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

export default Branches;
