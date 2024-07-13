
import { Grid, Card, CardContent, Typography, Container } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const bookingsData = [
  { name: 'Jan', bookings: 400 },
  { name: 'Feb', bookings: 300 },
  { name: 'Mar', bookings: 500 },
  { name: 'Apr', bookings: 700 },
  { name: 'May', bookings: 600 },
  { name: 'Jun', bookings: 800 },
];

const Reports = () => {
  return (
    <Container>
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Customers</Typography>
              <Typography variant="h4">1200</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Vehicles</Typography>
              <Typography variant="h4">350</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Bookings</Typography>
              <Typography variant="h4">1500</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Revenue</Typography>
              <Typography variant="h4">$75,000</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Bookings Over Time
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={bookingsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="bookings" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reports;
