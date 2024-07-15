
import { Container, Typography, Button } from '@mui/material';
import { Message, useFetchMessagesQuery } from '../../features/MessagesApi';

const MessageSupport = () => {
  const { data: messages, error, isLoading } = useFetchMessagesQuery();

  if (isLoading) {
   return <div className="flex justify-center items-center h-screen">
      <div className="spinner"></div> {<span className="loading loading-spinner text-info"></span>}
    </div>;
  }
  if (error) return <div>Error loading messages</div>;

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
              <th className="border px-4 py-2">User ID</th>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message: Message) => (
              <tr key={message.user_id}>
                <td className="border px-4 py-2">{message.user_id}</td>
                <td className="border px-4 py-2">{message.subject}</td>
                <td className="border px-4 py-2">{message.description}</td>
                <td className="border px-4 py-2">{message.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default MessageSupport;
