import { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useFetchBranchesQuery } from '../../features/BranchesApi';

interface Branch {
  branch_id: number;
  name: string;
  contact_phone: string;
  created_at: string;
  updated_at: string;
}

const Branches = () => {
  const { data: branches, error, isLoading } = useFetchBranchesQuery();
  const [selectedBranches, setSelectedBranches] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [expandedBranchId, setExpandedBranchId] = useState<number | null>(null);

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

  const areAnySelected = selectedBranches.length > 0;

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="spinner"></div> {<span className="loading loading-spinner text-info"></span>}
    </div>;
  }

  if (error) {
    return <div>Error loading branches</div>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Branches
      </Typography>
      <Button variant="contained" color="primary">Add Branch</Button>
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
                  <tr key={`${branch.branch_id}`}>
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
