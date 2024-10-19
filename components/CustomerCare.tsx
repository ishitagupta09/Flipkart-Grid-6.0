import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

const CustomerCare: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ user: string; message: string }[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setChatHistory([...chatHistory, { user: 'You', message }]);
      setMessage('');
      // Simulate AI response
      setTimeout(() => {
        setChatHistory(prev => [...prev, { user: 'AI', message: 'Thank you for your message. How can I assist you today?' }]);
      }, 1000);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Customer Care</h2>
      <div className="bg-white p-4 rounded shadow">
        <div className="h-64 overflow-y-auto mb-4 p-2 border rounded">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`mb-2 ${chat.user === 'You' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded ${chat.user === 'You' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <strong>{chat.user}:</strong> {chat.message}
              </span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow border rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerCare;
