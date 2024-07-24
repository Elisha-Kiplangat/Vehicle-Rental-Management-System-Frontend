import { Container, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { Message, useFetchMessagesQuery } from '../../features/MessagesApi';

const MessageSupport = () => {
  const { data: messages, error, isLoading } = useFetchMessagesQuery();
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  const handleReply = (message: Message) => {
    setReplyTo(message);
  };

  const handleSendReply = () => {
    if (replyTo) {
      
      console.log(`Replying to user ${replyTo.user_id} with message: ${replyMessage}`);
      setReplyTo(null);
      setReplyMessage('');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-info"></span>
      </div>
    );
  }

  if (error) return <div>Error loading messages</div>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Messages
      </Typography>
      <Button variant="contained" color="primary">Compose Message</Button>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full my-6">
          <thead>
            <tr>
              <th className="border px-4 py-2">User ID</th>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message: Message) => (
              <tr key={message.user_id}>
                <td className="border px-4 py-2">{message.user_id}</td>
                <td className="border px-4 py-2">{message.subject}</td>
                <td className="border px-4 py-2">{message.description}</td>
                <td className="border px-4 py-2">{message.status}</td>
                <td className="border px-4 py-2">
                  <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={() => handleReply(message)}
                  >
                    Reply
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {replyTo && (
        <div className="mt-4">
          <Typography variant="h6">Reply to User {replyTo.user_id}</Typography>
          <textarea
            className="textarea textarea-bordered w-full mt-2"
            placeholder="Write your reply..."
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSendReply}
            >
              Send Reply
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default MessageSupport;
