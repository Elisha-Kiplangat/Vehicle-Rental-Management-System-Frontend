import { Container, Typography, Button } from '@mui/material';

const Customers = () => {
  const customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', job: 'Desktop Support Technician', favoriteColor: 'Purple' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', job: 'Tax Accountant', favoriteColor: 'Red' },
    // Add more customers as needed
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>
      <Button variant="contained" color="primary">Add Customer</Button>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </td>
                <td>{customer.name}</td>
                <td>{customer.job}</td>
                <td>{customer.favoriteColor}</td>
                <td>
                  <button className="btn btn-ghost btn-xs">details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default Customers;
