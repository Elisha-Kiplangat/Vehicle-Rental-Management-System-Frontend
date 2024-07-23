
import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const SuccessPage = () => {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <FontAwesomeIcon icon={faCheckCircle} size="6x" color="green" />
      <Typography variant="h4" gutterBottom>
        Payment Successful!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Thank you for your payment. Your transaction was successful.
      </Typography>
      <Button
        component={Link}
        to="/dashboard/user/bookings"
        variant="contained"
        color="primary"
        style={{ marginTop: '20px' }}
      >
        Go to Dashboard
      </Button>
    </Container>
  );
};

export default SuccessPage;
