import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Lightbulb, TrendingDown, AlertTriangle } from 'lucide-react';

const Statistics = () => {
    // Last Week Usage Data (Kitchen, Laundry, Heater/AC)
    const lastWeekData = {
        labels: ['Kitchen', 'Laundry Room', 'Water Heater & AC'],
        datasets: [
            {
                label: 'Last Week Usage (kWh)',
                data: [120, 45, 180],
                backgroundColor: ['#F59E0B', '#3B82F6', '#EF4444'],
                borderRadius: 8,
            },
            {
                label: 'Target (kWh)',
                data: [80, 40, 150],
                backgroundColor: '#E5E7EB',
                borderRadius: 8,
                type: 'bar'
            }
        ],
    };

    const tips = [
        { id: 1, text: "Reduce Kitchen light on-time by 1 hour daily.", savings: 5 },
        { id: 2, text: "Run Laundry only when full load (save 2 cycles/week).", savings: 8 },
        { id: 3, text: "Set AC to 24°C instead of 20°C.", savings: 15 },
    ];

    return (
        <div className="grid grid-cols-1 gap-6">
            {/* Alert Section */}
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start gap-3">
                <AlertTriangle className="text-red-500 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-bold text-red-800">High Usage Alert</h4>
                    <p className="text-red-700">Your <strong>Kitchen</strong> usage is <strong>50% more</strong> than last week.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Last Week vs Target</h3>
                        <p className="card-subtitle">Submeter performance comparison</p>
                    </div>
                    <div className="chart-container" style={{ height: '300px' }}>
                        <Bar
                            data={lastWeekData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: { beginAtZero: true }
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title flex items-center gap-2">
                            <Lightbulb className="text-yellow-500" /> Smart Insights
                        </h3>
                        <p className="card-subtitle">How to move to lower tariff block</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        {tips.map((tip) => (
                            <div key={tip.id} className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg flex gap-3">
                                <div className="mt-1 text-yellow-600">
                                    <TrendingDown size={20} />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">{tip.text}</p>
                                    <p className="text-sm text-green-600 font-semibold">Potential Savings: ~RM {tip.savings}/mo</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
