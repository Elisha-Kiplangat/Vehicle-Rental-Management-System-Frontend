import { useState } from 'react';
import { useFetchMessagesUserQuery, useAddMessageMutation } from '../../features/MessagesApi';

interface Message {
  id: number;
  subject: number;
  description: string;
  updated_at: string;
}

const Messages = () => {
  const userId = localStorage.getItem('user_id');
  const pollingInterval = 10000;
  const { data: messages, error, isLoading } = useFetchMessagesUserQuery(Number(userId), {pollingInterval});
  const [sendMessage] = useAddMessageMutation();

  const [newMessage, setNewMessage] = useState({
    subject: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewMessage({
      ...newMessage,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendMessage({
        ...newMessage,
        user_id: Number(userId),
        status: 'pending'
      }).unwrap();
      setNewMessage({ subject: '', description: '' });
    } catch (err) {
      console.error('Failed to send message: ', err);
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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Booking Messages</h2>
      <div className="space-y-4">
        {messages?.map((message: Message) => (
          <div key={message.subject} className="p-4 bg-white shadow-md rounded-lg">
            <div className="flex justify-between">
              <div className="text-lg font-semibold">Booking ID: {message.subject}</div>
              <div className="text-sm text-gray-500">{message.updated_at}</div>
            </div>
            <div className="mt-2">{message.description}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="mb-4">
          <label className="block text-gray-700">Subject</label>
          <input
            type="text"
            name="subject"
            value={newMessage.subject}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Message</label>
          <textarea
            name="description"
            value={newMessage.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Messages;
