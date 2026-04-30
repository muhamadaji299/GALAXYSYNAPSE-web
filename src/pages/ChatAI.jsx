import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  User, 
  Bot, 
  Sparkles, 
  Trash2, 
  Command, 
  Loader2,
  AlertCircle
} from 'lucide-react';

const API_BASE_URL = 'https://chat-api-production-0347.up.railway.app/api';

const ChatAI = () => {
  const navigate = useNavigate();
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([
    { id: 'welcome', role: 'assistant', content: 'Hello! I am your Galaxy AI assistant. How can I help you navigate the cosmos today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const userMessage = { id: Date.now(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);
    setError('');

    try {
      // Selalu buat chat baru atau gunakan session yang ada (tanpa sidebar)
      let chatId = currentChatId;

      if (!chatId) {
        const createRes = await fetch(`${API_BASE_URL}/chat`, {
          method: 'POST',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const createData = await createRes.json();
        if (!createRes.ok) throw new Error(createData.message || 'Failed to create chat');
        chatId = createData.data.id;
        setCurrentChatId(chatId);
      }

      const response = await fetch(`${API_BASE_URL}/chat/message`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chat_id: chatId, message: currentInput }),
      });

      const result = await response.json();

      if (response.ok) {
        const aiMessage = { 
          id: result.data.data.id, 
          role: 'assistant', 
          content: result.data.ai_response 
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        setError(result.message || 'Failed to get AI response');
      }
    } catch (err) {
      setError(err.message || 'Connection error. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-black text-white overflow-hidden">
      <Sidebar />
      
      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-black">
        {/* Header */}
        <header className="p-4 md:p-6 pl-16 lg:pl-6 border-b border-white/10 flex justify-between items-center bg-black/50 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="p-1.5 md:p-2 bg-blue-500/20 text-blue-400 rounded-lg">
              <Sparkles size={18} />
            </div>
            <div>
              <h1 className="text-sm md:text-lg font-bold">Galaxy AI</h1>
              <p className="text-[10px] md:text-xs text-green-500 flex items-center gap-1">
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-green-500 animate-pulse" />
                Core Online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                setMessages([{ id: 'welcome', role: 'assistant', content: 'Current session cleared.' }]);
                setCurrentChatId(null);
              }}
              className="p-2 text-gray-500 hover:text-red-400 transition-colors"
              title="Clear Session"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  msg.role === 'user' 
                    ? 'bg-white/10 text-white' 
                    : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                }`}>
                  {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>
                
                <div className={`max-w-[85%] md:max-w-[80%] p-3 md:p-4 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-white/5 border border-white/10 text-white rounded-tr-none'
                    : 'bg-white/5 border border-white/5 text-gray-200 rounded-tl-none'
                }`}>
                  <p className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <div className="flex gap-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center">
                <Bot size={18} />
              </div>
              <div className="bg-white/5 border border-white/5 p-3 md:p-4 rounded-2xl rounded-tl-none flex gap-1">
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
              </div>
            </div>
          )}

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mx-auto max-w-md my-8 p-8 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] flex flex-col items-center gap-6 text-center relative overflow-hidden group"
              >
                {/* Decorative background light */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 blur-[80px] rounded-full group-hover:bg-white/10 transition-colors" />
                
                <div className="p-4 bg-white/5 rounded-full border border-white/10">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white tracking-tight">Signal Interrupted</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {error}
                  </p>
                </div>

                <button 
                  onClick={() => setError('')}
                  className="w-full py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-gray-200 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  Dismiss Transmission
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 pt-2 bg-gradient-to-t from-black via-black to-transparent">
          <div className="max-w-4xl mx-auto relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask anything about the galaxy..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pr-16 focus:outline-none focus:border-blue-500/50 transition-all resize-none h-20 md:h-24 text-xs md:text-sm"
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-3">
              <span className="hidden md:flex text-[10px] text-gray-500 items-center gap-1">
                <Command size={10} /> + Enter to send
              </span>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className={`p-2 rounded-lg transition-all ${
                  input.trim() && !isTyping
                    ? 'bg-white text-black hover:bg-gray-200' 
                    : 'bg-white/5 text-gray-600 cursor-not-allowed'
                }`}
              >
                {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
          </div>
          <p className="text-center text-[10px] text-gray-600 mt-4">
            Galaxy AI can make mistakes. Consider checking important information.
          </p>
        </div>
      </main>
    </div>
  );
};
export default ChatAI;
