
import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const CancelPage = () => {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <FontAwesomeIcon icon={faTimesCircle} size="6x" color="red" />
      <Typography variant="h4" gutterBottom>
        Payment Canceled
      </Typography>
      <Typography variant="body1" gutterBottom>
        Your payment has been canceled. If you have any questions, please contact support.
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

export default CancelPage;
