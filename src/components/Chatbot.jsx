import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, Sparkles, MessageCircle, ChevronRight } from 'lucide-react';

const Chatbot = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: 'Hello! I am your Energy Assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = (text = input) => {
        if (!text.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Simulate Bot Response
        setTimeout(() => {
            let botResponse = "I'm here to help! You can ask me about appliance usage, reports, or energy saving tips.";
            const lowerText = text.toLowerCase();

            if (lowerText.includes('heavy appliances') || lowerText.includes('best hour')) {
                botResponse = "Based on your area's demand, the best time to use heavy appliances (washer, dryer) is between 10 PM and 6 AM (Off-Peak). Avoid 2 PM - 5 PM.";
            } else if (lowerText.includes('report') || lowerText.includes('last month')) {
                botResponse = "Last Month Summary:\n• Total Usage: 450 kWh\n• Peak Day: 15th Nov (22 kWh)\n• Savings: You saved RM 45 compared to Oct!";
            } else if (lowerText.includes('reduce') || lowerText.includes('bill') || lowerText.includes('tips')) {
                botResponse = "Here are 3 tips to reduce your bill:\n1. Set AC to 24°C (saves ~10%).\n2. Unplug idle electronics (phantom load).\n3. Use cold water for laundry.";
            } else if (lowerText.includes('forecast') || lowerText.includes('next week')) {
                botResponse = "Forecast for next week: Usage is projected to be stable at ~15 kWh/day. Weather is mild, so AC usage should be low.";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botResponse }]);
        }, 800);
    };

    const suggestedQuestions = [
        "When is the best hour to use heavy appliances?",
        "Give me a short report of my usage last month.",
        "How can I reduce my energy bill?",
        "Forecast my usage for next week."
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed w-[320px] h-[450px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-slide-up-fade font-sans z-50" style={{ left: '24px', bottom: '90px' }}>
            {/* Header */}
            <div className="bg-blue-600 p-4 flex items-center justify-between text-white shadow-md">
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-full">
                        <Bot size={20} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm leading-tight">Energy Assistant</h3>
                        <p className="text-[10px] opacity-90 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Online
                        </p>
                    </div>
                </div>
                <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
                    <X size={20} />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                    >
                        <div
                            className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm whitespace-pre-line ${msg.sender === 'user'
                                ? 'bg-blue-600 text-white rounded-br-none'
                                : 'bg-white text-gray-700 rounded-bl-none border border-gray-200'
                                }`}
                        >
                            {msg.text}
                        </div>
                        <span className="text-[10px] text-gray-400 mt-1 px-1">
                            {new Date(msg.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions (if no interaction yet or always visible? User said "Preload suggested") */}
            {messages.length === 1 && (
                <div className="px-4 pb-2 bg-gray-50">
                    <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">Suggested Questions</p>
                    <div className="flex flex-col gap-2">
                        {suggestedQuestions.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => handleSend(q)}
                                className="text-left text-xs bg-white border border-gray-200 hover:border-blue-400 hover:text-blue-600 text-gray-600 px-3 py-2 rounded-lg transition-all shadow-sm flex items-center justify-between group"
                            >
                                {q}
                                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-100">
                <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:border-blue-400 focus-within:bg-white transition-all">
                    <input
                        type="text"
                        className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button
                        className={`p-1.5 rounded-full transition-all ${input.trim()
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                        onClick={() => handleSend()}
                        disabled={!input.trim()}
                    >
                        <Send size={16} className={input.trim() ? 'ml-0.5' : ''} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
