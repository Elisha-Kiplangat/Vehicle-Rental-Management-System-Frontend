// Reports.tsx
import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { Bar } from 'react-chartjs-2';

const Reports: React.FC = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Bookings',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <Paper style={{ padding: 20, marginTop: 20 }}>
        <Bar data={data} options={options} />
      </Paper>
    </Container>
  );
};

export default Reports;
