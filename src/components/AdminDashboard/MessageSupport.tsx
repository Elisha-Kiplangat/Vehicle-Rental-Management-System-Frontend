
import { Container, Typography, Button } from '@mui/material';

const MessageSupport = () => {
  const messages = [
    { id: 1, sender: 'John Doe', subject: 'Vehicle Inquiry', date: '2023-07-01' },
    { id: 2, sender: 'Jane Smith', subject: 'Booking Issue', date: '2023-07-02' },
    
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Messages
      </Typography>
      <Button variant="contained" color="primary">Compose Message</Button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded my-6">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Sender</th>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message.id}>
                <td className="border px-4 py-2">{message.id}</td>
                <td className="border px-4 py-2">{message.sender}</td>
                <td className="border px-4 py-2">{message.subject}</td>
                <td className="border px-4 py-2">{message.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default MessageSupport;
