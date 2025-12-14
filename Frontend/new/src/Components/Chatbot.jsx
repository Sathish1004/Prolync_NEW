import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Mic, MicOff, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import botAvatar from '../assets/bot_avatar.png';

// --- MOCK KNOWLEDGE BASE ---
const COURSE_INFO = {
  'java': "Our Java course covers core concepts, OOPs, Collections, and Multithreading. It's perfect for beginners and includes interview prep!",
  'python': "Python Zero to Hero is one of our best-sellers! It covers everything from basics to Data Science libraries like Pandas and NumPy.",
  'react': "The React + Node.js Masterclass teaches you how to build full-stack MERN applications from scratch.",
  'web': "Our Full-Stack Web Development Bootcamp covers HTML, CSS, JS, React, Node, and MongoDB. 100% placement support included!",
  'price': "Our courses start from just ₹499! We also have premium bundles and EMI options available.",
  'cost': "Most courses are between ₹499 and ₹2499. Check the 'Courses' page for specific pricing!",
  'enroll': "To enroll, simply click on a course you like and hit the 'Buy Now' button. You can pay via UPI, Card, or NetBanking.",
  'workshop': "We conduct weekly workshops on AI, Cloud, and DevOps. Check the 'Workshops' tab for the latest schedule!",
  'certificate': "Yes! You get a verifiable industry-recognized certificate upon completing any course or workshop.",
  'contact': "You can reach our support team at contact@prolync.in or call us at +91-9876543210."
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi 👋 Welcome to Prolync! How can I help you with courses, workshops, or learning today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
        inputRef.current?.focus();
    }
  }, [isOpen]);

  // --- AI ENGINE (SIMULATED LLM) ---
  const generateAIResponse = async (userText) => {
    setIsTyping(true);
    
    // Normalize text (remove punctuation, lowercase)
    const text = userText.toLowerCase().replace(/[^\w\s]/gi, '');
    
    // Simulate network delay for realism
    await new Promise(r => setTimeout(r, 1500)); 

    let response = "I'm not quite sure about that. Could you ask about our courses, workshops, or placement support?";

    // 1. GREETINGS
    if (text.match(/hi|hello|hey|good morning|morning/)) {
        response = "Hello! 👋 I'm here to help you start your learning journey. What skill are you looking to master today?";
    }
    // 2. COURSE QUERIES
    else if (text.includes('java')) response = COURSE_INFO.java;
    else if (text.includes('python')) response = COURSE_INFO.python;
    else if (text.includes('react') || text.includes('node') || text.includes('mern')) response = COURSE_INFO.react;
    else if (text.includes('web') || text.includes('frontend') || text.includes('backend')) response = COURSE_INFO.web;
    else if (text.includes('ai') || text.includes('data science') || text.includes('ml')) {
        response = "We offer a comprehensive AI & Data Science roadmap using Python. Perfect for beginners with no coding background!";
    }
    // 3. GENERAL QUERIES
    else if (text.match(/price|cost|fee|much/)) response = COURSE_INFO.price;
    else if (text.match(/enroll|join|register|buy/)) response = COURSE_INFO.enroll;
    else if (text.includes('workshop') || text.includes('webinar')) response = COURSE_INFO.workshop;
    else if (text.includes('certificate') || text.includes('certification')) response = COURSE_INFO.certificate;
    else if (text.includes('contact') || text.includes('support') || text.includes('help')) response = COURSE_INFO.contact;
    else if (text.includes('thank')) {
        response = "You're very welcome! Happy Learning! 🚀";
    }

    setMessages(prev => [...prev, { id: Date.now(), text: response, sender: 'bot' }]);
    setIsTyping(false);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const userMsg = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    
    generateAIResponse(inputValue);
  };

  // --- VOICE RECOGNITION ---
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Your browser does not support voice input. Please stick to Chrome/Edge.");
        return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        // Optional: Auto-send after voice?
        // handleSend(transcript); 
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end font-sans">
      <AnimatePresence>
      {isOpen && (
        <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[90vw] md:w-96 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden ring-1 ring-purple-500/10 flex flex-col max-h-[600px]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] p-4 flex justify-between items-center text-white shadow-lg">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                    <img src={botAvatar} alt="Bot" className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                    <h3 className="font-bold text-lg leading-tight">Prolync AI</h3>
                    <div className="flex items-center gap-1.5 opacity-90">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                        </span>
                        <span className="text-xs font-medium">Online</span>
                    </div>
                </div>
            </div>
            <button 
                onClick={() => setIsOpen(false)} 
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8fafc] scrollbar-thin scrollbar-thumb-purple-200 h-96">
            {messages.map((msg) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
                <div className="flex justify-start">
                    <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-1">
                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></span>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-full border border-gray-200 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
              
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about courses, interviews..."
                className="flex-1 bg-transparent text-gray-800 px-3 py-2 focus:outline-none text-sm placeholder-gray-400"
              />

              {/* Voice Button */}
              <button
                onClick={handleVoiceInput}
                className={`p-2.5 rounded-full transition-all ${
                    isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50'
                }`}
                title="Speak"
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>

              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className={`p-2.5 rounded-full transition-all shadow-sm ${
                    inputValue.trim() 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg transform hover:-translate-y-0.5' 
                        : 'bg-gray-200 text-gray-400'
                }`}
              >
                <Send size={18} />
              </button>
            </div>
            
            <div className="text-center mt-2">
                <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1 font-medium">
                    <Sparkles size={10} className="text-purple-500" /> Powered by Prolync AI
                </p>
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      {!isOpen && (
           <motion.button
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           whileHover={{ scale: 1.1 }}
           whileTap={{ scale: 0.9 }}
           onClick={() => setIsOpen(true)}
           className="group relative w-16 h-16 rounded-full flex items-center justify-center z-50 shadow-2xl"
         >
           <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 animate-pulse opacity-70"></span>
           <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></span>
           
           <img src={botAvatar} alt="Chat" className="w-full h-full object-cover rounded-full relative z-10 border-2 border-white/30" />
           
           <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white rounded-full flex items-center justify-center z-20">
             <span className="text-[10px] font-bold text-white">1</span>
           </span>
         </motion.button>
      )}
    </div>
  );
};

export default Chatbot;
