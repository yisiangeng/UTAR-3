import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Zap, DollarSign, Calendar } from 'lucide-react';

const Trackers = () => {
    // Mock Data
    const dailyData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Daily Usage (kWh)',
                data: [12, 19, 15, 17, 14, 20, 18],
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const weeklyData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Weekly Consumption (kWh)',
                data: [120, 145, 132, 110],
                backgroundColor: '#3B82F6',
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
        },
        maintainAspectRatio: false,
    };

    return (
        <div className="grid grid-cols-1 gap-6">
            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-full text-green-600">
                        <Zap size={32} />
                    </div>
                    <div>
                        <div className="card-subtitle">Month-to-Date Consumption</div>
                        <div className="stat-value">342.5 <span className="text-sm font-normal text-gray-500">kWh</span></div>
                    </div>
                </div>

                <div className="card flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                        <DollarSign size={32} />
                    </div>
                    <div>
                        <div className="card-subtitle">Accumulated Fee (Est.)</div>
                        <div className="stat-value">RM 145.20</div>
                        <div className="text-xs text-gray-500">Projected: RM 180.00</div>
                    </div>
                </div>

                <div className="card flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                        <Calendar size={32} />
                    </div>
                    <div>
                        <div className="card-subtitle">Billing Cycle</div>
                        <div className="stat-value">Day 22</div>
                        <div className="text-xs text-gray-500">8 days remaining</div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Voltage Guardian (Daily Usage)</h3>
                        <p className="card-subtitle">Monitoring voltage stability and usage peaks</p>
                    </div>
                    <div className="chart-container">
                        <Line data={dailyData} options={options} />
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Weekly Usage Trends</h3>
                        <p className="card-subtitle">Comparison across weeks</p>
                    </div>
                    <div className="chart-container">
                        <Bar data={weeklyData} options={options} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trackers;
