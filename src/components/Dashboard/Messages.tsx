import { useState, useEffect } from 'react';

interface Message {
  id: number;
  bookingId: number;
  content: string;
  timestamp: string;
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchedMessages: Message[] = [
      {
        id: 1,
        bookingId: 101,
        content: 'Your booking for vehicle ID 101 has been confirmed.',
        timestamp: '2023-07-09 10:00 AM',
      },
      {
        id: 2,
        bookingId: 102,
        content: 'Your booking for vehicle ID 102 has been canceled.',
        timestamp: '2023-07-09 11:00 AM',
      },
      {
        id: 3,
        bookingId: 103,
        content: 'Your booking for vehicle ID 103 is pending approval.',
        timestamp: '2023-07-09 12:00 PM',
      },
    ];
    setMessages(fetchedMessages);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Booking Messages</h2>
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="p-4 bg-white shadow-md rounded-lg">
            <div className="flex justify-between">
              <div className="text-lg font-semibold">Booking ID: {message.bookingId}</div>
              <div className="text-sm text-gray-500">{message.timestamp}</div>
            </div>
            <div className="mt-2">{message.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
