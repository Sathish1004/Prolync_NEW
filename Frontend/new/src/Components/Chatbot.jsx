import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import botAvatar from '../assets/bot_avatar.png';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm your AI assistant. How can I help you today?", sender: 'bot' }
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 overflow-hidden transform transition-all duration-300 origin-bottom-right animate-fade-in-up ring-1 ring-purple-500/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-5 flex justify-between items-center text-white relative overflow-hidden">
            {/* Decorative background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="flex items-center space-x-4 relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center p-1 overflow-hidden backdrop-blur-sm border border-white/40 shadow-inner">
                    <img src={botAvatar} alt="Bot" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="font-bold text-xl leading-tight tracking-tight">Prolync AI</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400 border border-white/20"></span>
                        </span>
                        <span className="text-xs text-indigo-100 font-medium tracking-wide">Always Online</span>
                    </div>
                </div>
            </div>
            <button 
                onClick={() => setIsOpen(false)} 
                className="hover:bg-white/20 p-2 rounded-full transition duration-200 backdrop-blur-sm group relative z-10"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-5 space-y-5 bg-gradient-to-b from-gray-50 to-white scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start items-end gap-3'}`}
              >
                {msg.sender === 'bot' && (
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 border border-indigo-200 flex-shrink-0 shadow-sm p-0.5">
                        <img src={botAvatar} alt="Bot" className="w-full h-full object-cover rounded-full" />
                    </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-5 py-3.5 text-sm shadow-md leading-relaxed tracking-wide ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none hover:shadow-lg transition-shadow duration-200'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-full border-2 border-transparent focus-within:border-purple-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-purple-100 transition-all duration-300 shadow-inner">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent text-gray-800 px-4 py-2 focus:outline-none text-sm placeholder-gray-400 font-medium"
              />
              <button
                onClick={handleSend}
                className={`p-3 rounded-full transition-all duration-300 transform shadow-md ${
                    inputValue.trim() 
                        ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:shadow-purple-500/30 hover:scale-110 hover:rotate-12' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!inputValue.trim()}
              >
                <Send size={18} className={inputValue.trim() ? 'ml-0.5' : ''} />
              </button>
            </div>
            <div className="text-center mt-3 flex justify-center items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></span>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Powered by Prolync AI</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
           <button
           onClick={() => setIsOpen(true)}
           className="group relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 z-50"
         >
           {/* Static Glow Background */}
           <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-500"></div>
           
           {/* Main Button Container */}
           <div className="absolute inset-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center overflow-hidden border-2 border-white/20 shadow-2xl">
                <img src={botAvatar} alt="Chat" className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
           </div>

           {/* Notification Badge */}
           <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
             <span className="relative text-[11px] font-bold text-white">1</span>
           </span>
         </button>
      )}
     
    </div>
  );
};

export default Chatbot;
