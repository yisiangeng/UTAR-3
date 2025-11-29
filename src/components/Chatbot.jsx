import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, Sparkles, MessageCircle, ChevronRight, Zap, TrendingDown, Clock } from 'lucide-react';

const Chatbot = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: '👋 Hello! I am your **WattsUp Energy Assistant**.\n\nI can help you with:\n💡 Energy-saving tips\n📊 Usage reports\n⚡ Appliance scheduling\n🔮 Forecasts\n\nHow can I assist you today?', animated: false }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = (text = input) => {
        if (!text.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text, animated: true };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate Bot Response with typing indicator
        setTimeout(() => {
            let botResponse = "I'm here to help! You can ask me about appliance usage, reports, or energy saving tips.";
            const lowerText = text.toLowerCase();

            if (lowerText.includes('heavy appliances') || lowerText.includes('best hour') || lowerText.includes('best time')) {
                botResponse = "⚡ **Optimal Appliance Usage Times**\n\n🌙 **Off-Peak (Cheapest)**\n⏰ 10 PM - 6 AM\n💰 Save up to 30-40%\n\n⚠️ **Peak (Most Expensive)**\n⏰ 2 PM - 5 PM\n🚫 Avoid heavy appliances\n\n💡 **Pro Tip:** Set timers on your washer and dryer to run automatically during off-peak hours!";
            } else if (lowerText.includes('report') || lowerText.includes('last month') || lowerText.includes('summary')) {
                botResponse = "📊 **November 2024 Summary**\n\n⚡ **Total Usage:** 450 kWh\n📅 **Peak Day:** Nov 15 (22 kWh)\n💰 **Total Cost:** RM 207\n\n📈 **vs October:**\n✅ -45 kWh (-9%)\n💵 Saved RM 45!\n\n🎯 You're doing great! Keep it up!";
            } else if (lowerText.includes('reduce') || lowerText.includes('bill') || lowerText.includes('tips') || lowerText.includes('save')) {
                botResponse = "💰 **Top 3 Energy-Saving Tips**\n\n🌡️ **AC Optimization**\n• Set to 24°C (saves ~10%)\n• Clean filters monthly\n\n🔌 **Eliminate Phantom Load**\n• Unplug idle chargers\n• Use smart power strips\n\n💧 **Water Heating**\n• Use cold water for laundry\n• Saves ~RM 30/month\n\n✨ **Potential savings: RM 60-100/month!**";
            } else if (lowerText.includes('forecast') || lowerText.includes('next week') || lowerText.includes('prediction')) {
                botResponse = "🔮 **7-Day Energy Forecast**\n\n📅 **Week Ahead:**\n⚡ 105-115 kWh projected\n💰 Est. cost: RM 38-42\n\n🌤️ **Weather Impact:**\n🌡️ 28-32°C expected\n💨 Moderate humidity\n\n💡 **Recommendation:**\nYou're on track! Usage looks stable. Thursday & Friday may be warmer—consider pre-cooling your home before peak hours.";
            } else if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
                botResponse = "👋 Hello there!\n\nI'm your WattsUp Energy Assistant, powered by smart analytics. I'm here to help you:\n\n✨ Optimize energy usage\n💰 Save on bills\n📊 Track consumption\n🌱 Meet sustainability goals\n\nWhat would you like to know?";
            } else if (lowerText.includes('thank')) {
                botResponse = "😊 You're very welcome!\n\nI'm always here to help you save energy and reduce costs. Feel free to ask me anything!\n\n💚 Remember: Every kWh saved helps the environment! 🌍";
            }

            setIsTyping(false);
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botResponse, animated: true }]);
        }, 1000);
    };

    const suggestedQuestions = [
        { icon: <Clock size={14} />, text: "When is the best hour to use heavy appliances?", color: "text-orange-500" },
        { icon: <TrendingDown size={14} />, text: "Give me a short report of my usage last month.", color: "text-blue-500" },
        { icon: <Zap size={14} />, text: "How can I reduce my energy bill?", color: "text-green-500" },
        { icon: <Sparkles size={14} />, text: "Forecast my usage for next week.", color: "text-purple-500" }
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden font-sans z-50"
            style={{
                right: '24px',
                bottom: '90px',
                animation: 'slideUpFade 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}>

            <style>{`
                @keyframes slideUpFade {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                
                @keyframes messageSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-3px); }
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                
                .message-animate {
                    animation: messageSlideIn 0.4s ease-out;
                }
                
                .dot-bounce {
                    animation: bounce 1.4s infinite;
                }
                
                .dot-bounce:nth-child(2) {
                    animation-delay: 0.2s;
                }
                
                .dot-bounce:nth-child(3) {
                    animation-delay: 0.4s;
                }
                
                .pulse-ring {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>

            {/* Enhanced Header */}
            <div className="relative bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 p-4 flex items-center justify-between text-white shadow-lg overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-20 h-20 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-2xl"></div>
                </div>

                <div className="flex items-center gap-3 relative z-10">
                    <div className="relative">
                        <div className="absolute inset-0 bg-white/30 rounded-full blur-md pulse-ring"></div>
                        <div className="relative bg-white/20 p-2.5 rounded-full backdrop-blur-sm border-2 border-white/40">
                            <Bot size={22} className="text-white" strokeWidth={2.5} />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-base leading-tight">WattsUp Energy Assistant</h3>
                        <p className="text-xs opacity-95 flex items-center gap-1.5 mt-0.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-200"></span>
                            </span>
                            <span className="font-medium">Online & Ready</span>
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="relative z-10 text-white/90 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all hover:rotate-90 duration-300"
                    aria-label="Close chat"
                >
                    <X size={20} strokeWidth={2.5} />
                </button>
            </div>

            {/* Messages Area with gradient background */}
            <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white flex flex-col gap-3">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'} ${msg.animated ? 'message-animate' : ''}`}
                    >
                        <div
                            className={`px-4 py-3 rounded-2xl text-sm shadow-md whitespace-pre-line leading-relaxed ${msg.sender === 'user'
                                ? 'rounded-br-md'
                                : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
                                }`}
                            style={msg.sender === 'user' ? {
                                background: 'linear-gradient(to bottom right, #10B981, #059669)',
                                color: 'white'
                            } : {}}
                        >
                            {msg.text.split('**').map((part, i) =>
                                i % 2 === 0 ? part : <strong key={i} className={msg.sender === 'user' ? 'font-bold' : 'font-bold text-gray-900'}>{part}</strong>
                            )}
                        </div>
                        <span className="text-[10px] text-gray-400 mt-1 px-1">
                            {new Date(msg.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                    <div className="flex items-start message-animate">
                        <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-5 py-3 shadow-md">
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full dot-bounce"></div>
                                <div className="w-2 h-2 bg-emerald-500 rounded-full dot-bounce"></div>
                                <div className="w-2 h-2 bg-emerald-500 rounded-full dot-bounce"></div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Suggested Questions - Always Visible */}
            <div className="px-4 py-3 bg-gradient-to-t from-gray-50 to-white border-t border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={16} className="text-emerald-500" />
                    <p className="text-xs text-gray-600 font-bold uppercase tracking-wide">Quick Actions</p>
                </div>
                <div className="flex flex-col gap-2">
                    {suggestedQuestions.map((q, i) => (
                        <button
                            key={i}
                            onClick={() => handleSend(q.text)}
                            className="group text-left bg-white hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 border-2 border-gray-200 hover:border-emerald-400 rounded-xl transition-all shadow-sm hover:shadow-md p-3 transform hover:translate-x-1"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`flex-shrink-0 w-8 h-8 bg-gray-100 group-hover:bg-emerald-100 rounded-lg flex items-center justify-center transition-colors ${q.color}`}>
                                    {q.icon}
                                </div>
                                <span className="flex-1 text-xs font-semibold text-gray-700 group-hover:text-emerald-700 transition-colors">
                                    {q.text}
                                </span>
                                <ChevronRight size={16} className="text-gray-400 group-hover:text-emerald-600 transform group-hover:translate-x-1 transition-all" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Enhanced Input Area */}
            <div className="p-4 bg-white border-t-2 border-gray-200">
                <div className="flex items-center gap-2 bg-gray-100 rounded-2xl px-4 py-2.5 border-2 border-gray-200 focus-within:border-emerald-400 focus-within:bg-white focus-within:shadow-lg transition-all">
                    <input
                        type="text"
                        className="flex-1 bg-transparent text-sm outline-none text-gray-800 placeholder-gray-500 font-medium"
                        placeholder="Ask me anything about energy..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button
                        className={`p-2 rounded-xl transition-all duration-300 ${input.trim()
                            ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl hover:scale-105'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        onClick={() => handleSend()}
                        disabled={!input.trim()}
                        aria-label="Send message"
                    >
                        <Send size={16} className={input.trim() ? 'ml-0.5' : ''} strokeWidth={2.5} />
                    </button>
                </div>
                <p className="text-[10px] text-gray-400 mt-2 text-center flex items-center justify-center gap-1">
                    <Sparkles size={10} className="text-emerald-500" />
                    Powered by WattsUp Smart Analytics
                </p>
            </div>
        </div>
    );
};

export default Chatbot;
