import React, { useState } from 'react';
import { Zap, Activity, Cloud, BarChart2, Home, MessageSquare, LayoutDashboard, PieChart, X, Bot } from 'lucide-react';
// import Monitoring from './components/Monitoring';
import Monitoring from './components/Monitoring'
import Forecast from './components/Forecast';
import Chatbot from './components/Chatbot';
import Overview from './components/Overview';
import UsageBreakdown from './components/UsageBreakdown';

function App() {
    const [activeTab, setActiveTab] = useState('overview');
    const [isChatOpen, setIsChatOpen] = useState(false);

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <Overview setActiveTab={setActiveTab} />;
            case 'monitoring': return <Monitoring />;
            case 'usage-breakdown': return <UsageBreakdown setActiveTab={setActiveTab} />;
            case 'forecast': return <Forecast />;
            default: return <Overview setActiveTab={setActiveTab} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="header-gradient">
                <div className="container">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2" style={{ fontSize: '2.5rem', fontWeight: '800' }}>TNB Energy Guardian</h1>
                            <p className="opacity-80 text-lg">Empowering Clean & Affordable Energy (SDG 7)</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="text-right hidden md:block">
                                <div className="font-bold text-lg">Welcome, User</div>
                                <div className="text-sm opacity-70">Account: #88291023</div>
                            </div>
                            <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm border border-white/20">
                                <Zap size={28} className="text-emerald-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="container" style={{ marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
                {/* Navigation */}
                <nav className="nav-tabs">
                    <button
                        className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        <LayoutDashboard size={18} />
                        Overview
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'monitoring' ? 'active' : ''}`}
                        onClick={() => setActiveTab('monitoring')}
                    >
                        <Activity size={18} />
                        In-time Monitoring
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'usage-breakdown' ? 'active' : ''}`}
                        onClick={() => setActiveTab('usage-breakdown')}
                    >
                        <PieChart size={18} />
                        Usage Breakdown
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'forecast' ? 'active' : ''}`}
                        onClick={() => setActiveTab('forecast')}
                    >
                        <Cloud size={18} />
                        Forecast
                    </button>
                </nav>

                {/* Tab Content */}
                <div className="fade-in pb-24">
                    {renderContent()}
                </div>
            </main>

            {/* Floating Chatbot Panel */}
            <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

            {/* Floating AI Help Button */}
            <button
                className="fixed h-14 w-14 rounded-full shadow-lg text-white hover:scale-105 transition-all duration-300 z-50 flex items-center justify-center border-2 border-white"
                onClick={() => setIsChatOpen(!isChatOpen)}
                style={{ zIndex: 100, right: '24px', bottom: '24px', backgroundColor: '#2563EB' }}
                aria-label="Toggle AI Assistant"
            >
                {isChatOpen ? <X size={24} /> : <MessageSquare size={24} fill="currentColor" />}
            </button>

            {/* Footer */}
            <footer className="container mt-12 py-8 border-t border-gray-200 text-center text-gray-500 text-sm">
                <p>© 2024 Tenaga Nasional Berhad. All rights reserved.</p>
                <p className="mt-2">Promoting Sustainable Energy for a Better Future.</p>
            </footer>
        </div>
    );
}

export default App;
