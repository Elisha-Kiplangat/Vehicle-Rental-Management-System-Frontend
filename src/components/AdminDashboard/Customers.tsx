import { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useGetAllUsersQuery } from '../../features/auth/AuthSlice';

interface Tcustomer {
  user_id: number;
  full_name: string;
  email: string;
  contact_phone: string;
  address: string;
  role: string;
  created_at: string;
  updated_at: string;
}

const Customers = () => {
  const { data: customers, error, isLoading } = useGetAllUsersQuery();
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [expandedCustomerId, setExpandedCustomerId] = useState<number | null>(null);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(customers ? customers.map((customer: Tcustomer) => customer.user_id) : []);
    }
    setSelectAll(!selectAll);
  };

  const handleSelectCustomer = (id: number) => {
    setSelectedCustomers((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((userId) => userId !== id) : [...prevSelected, id]
    );
  };

  const handleExpandCustomer = (id: number) => {
    setExpandedCustomerId(expandedCustomerId === id ? null : id);
  };

  const areAnySelected = selectedCustomers.length > 0;

  if (isLoading) {
   return <div className="flex justify-center items-center h-screen">
      <div className="spinner"></div> {<span className="loading loading-spinner text-info"></span>}
    </div>;
  }

  if (error) {
    return <div>Error loading customers</div>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>
      <Button variant="contained" color="primary">Add Customer</Button>
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
              <th>Email</th>
              <th>Contact Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customers && customers.map((customer: Tcustomer) => (
              <>
                <tr key={customer.user_id}>
                  <td>
                    <label>
                      <input 
                        type="checkbox" 
                        className="checkbox" 
                        checked={selectedCustomers.includes(customer.user_id)}
                        onChange={() => handleSelectCustomer(customer.user_id)}
                      />
                    </label>
                  </td>
                  <td>{customer.user_id}</td>
                  <td>{customer.full_name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.contact_phone}</td>
                  <td>
                    <button 
                      className="btn btn-ghost p-2" 
                      onClick={() => handleExpandCustomer(customer.user_id)}
                    >
                      {expandedCustomerId === customer.user_id ? 'Hide details' : 'Show details'}
                    </button>
                  </td>
                </tr>
                {expandedCustomerId === customer.user_id && (
                  <tr key={`${customer.user_id}`}>
                    <td></td>
                    <td colSpan={6}>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Address</th>
                            <th>Role</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{customer.address}</td>
                            <td>{customer.role}</td>
                            <td>{customer.created_at}</td>
                            <td>{customer.updated_at}</td>
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

export default Customers;
