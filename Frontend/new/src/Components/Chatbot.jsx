import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newUserMsg = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages([...messages, newUserMsg]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
        setMessages(prev => [...prev, {id: Date.now() + 1, text: "Thanks for your message! Our team will get back to you shortly.", sender: 'bot'}]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-300 origin-bottom-right">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle size={18} />
                </div>
                <span className="font-semibold">Prolync Support</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-gray-100 text-gray-800 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition transform hover:scale-105"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
           <button
           onClick={() => setIsOpen(true)}
           className="w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-purple-500/30 transition transform hover:scale-110"
         >
           <MessageCircle size={28} />
         </button>
      )}
     
    </div>
  );
};

export default Chatbot;
