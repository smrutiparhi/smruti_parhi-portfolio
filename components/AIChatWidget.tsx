
import React, { useState, useRef, useEffect } from 'react';
import { chatWithResume } from '../geminiService';

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: "I'm Smruti's digital twin. Ask me anything about his work, skills, or experience." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const aiResponse = await chatWithResume(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse || "I couldn't generate a response." }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="w-[calc(100vw-2rem)] sm:w-[400px] h-[500px] md:h-[550px] glass border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl flex flex-col mb-4 md:mb-6 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-500">
          <div className="p-6 md:p-8 bg-white flex justify-between items-center shrink-0">
            <div>
              <h3 className="font-black text-black text-lg md:text-xl font-outfit leading-none mb-1">AI AGENT</h3>
              <p className="text-[9px] md:text-[10px] font-bold text-slate-500 tracking-widest uppercase">Knowledge Base</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-black hover:scale-110 transition-transform p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 scrollbar-hide">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 md:px-5 py-2 md:py-3 text-xs md:text-sm leading-relaxed ${
                  m.role === 'user' ? 'bg-indigo-600 text-white font-medium' : 'bg-slate-800/50 text-slate-200 border border-white/5'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800/50 text-indigo-400 rounded-2xl px-4 md:px-5 py-2 md:py-3 text-xs md:text-sm font-bold animate-pulse">
                  Processing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 md:p-6 border-t border-white/5 bg-slate-900/50 shrink-0">
            <div className="flex gap-2 md:gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about Smruti..."
                className="flex-1 bg-white/5 text-white rounded-xl md:rounded-2xl px-4 md:px-5 py-2 md:py-3 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-white hover:bg-indigo-400 text-black p-2 md:p-3 rounded-xl md:rounded-2xl disabled:opacity-50 transition-all flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`h-16 w-16 md:h-20 md:w-20 flex items-center justify-center rounded-full shadow-2xl transition-all duration-500 group ${isOpen ? 'bg-white text-black rotate-90' : 'bg-indigo-600 text-white hover:scale-110 active:scale-95'}`}
        aria-label="Open AI Chat"
      >
        {isOpen ? (
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
             <div className="absolute inset-0 bg-white rounded-full scale-150 opacity-0 group-hover:opacity-10 transition-all"></div>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        )}
      </button>
    </div>
  );
};

export default AIChatWidget;
