import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { AlertTriangle, Zap, Activity, CheckCircle } from 'lucide-react';

const Monitoring = () => {
    // Thresholds
    const THRESHOLDS = {
        voltage: { min: 230, max: 250 },
        liveConsumption: 12, // kW
        submeter: 5, // kW
        totalConsumption: 20 // kWh (daily limit example)
    };

    const [dataPoints, setDataPoints] = useState(Array(30).fill(0).map(() => Math.random() * 2 + 10));
    const [labels, setLabels] = useState(Array(30).fill('').map((_, i) => i));
    const [voltage, setVoltage] = useState(240);
    const [totalConsumption, setTotalConsumption] = useState(12.5);
    const [submeters, setSubmeters] = useState([4.2, 3.1, 5.2]);
    const [activeAlert, setActiveAlert] = useState(null);

    // Submeter Names
    const submeterNames = ["Kitchen", "Laundry Room", "Water Heater & AC"];

    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate Data
            const newLiveValue = Math.random() * 5 + 9; // Random between 9 and 14
            const newVoltage = 225 + Math.random() * 30; // Random between 225 and 255 (often out of range)
            const newSubmeters = [
                Math.random() * 4 + 2, // 2-6
                Math.random() * 4 + 2, // 2-6
                Math.random() * 4 + 2  // 2-6
            ];

            // Update Chart Data
            setDataPoints(prev => {
                const newData = [...prev.slice(1), newLiveValue];
                return newData;
            });

            setVoltage(newVoltage);
            setTotalConsumption(prev => prev + (Math.random() * 0.01));
            setSubmeters(newSubmeters);

            // Check for Alerts
            let alertMsg = null;
            if (newLiveValue > THRESHOLDS.liveConsumption) {
                alertMsg = `High Live Consumption: ${newLiveValue.toFixed(1)} kW`;
            } else if (newVoltage < THRESHOLDS.voltage.min || newVoltage > THRESHOLDS.voltage.max) {
                alertMsg = `Unstable Voltage: ${newVoltage.toFixed(1)} V`;
            } else if (newSubmeters.some(val => val > THRESHOLDS.submeter)) {
                const idx = newSubmeters.findIndex(val => val > THRESHOLDS.submeter);
                alertMsg = `High Usage in ${submeterNames[idx]}: ${newSubmeters[idx].toFixed(1)} kW`;
            }

            setActiveAlert(alertMsg);

        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, []);

    // Determine Status Colors
    const isVoltageNormal = voltage >= THRESHOLDS.voltage.min && voltage <= THRESHOLDS.voltage.max;
    const isTotalNormal = totalConsumption < THRESHOLDS.totalConsumption;
    const isLiveNormal = dataPoints[dataPoints.length - 1] < THRESHOLDS.liveConsumption;

    const getStatusColor = (isNormal) => isNormal ? 'text-success' : 'text-danger';
    const getCardBorder = (isNormal) => isNormal ? 'border-success' : 'border-danger';
    const getBgColor = (isNormal) => isNormal ? 'bg-success' : 'bg-danger';

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Real-time Consumption (kW)',
                data: dataPoints,
                borderColor: isLiveNormal ? '#198754' : '#DC3545', // Green or Red
                backgroundColor: isLiveNormal ? 'rgba(25, 135, 84, 0.1)' : 'rgba(220, 53, 69, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        animation: { duration: 0 },
        scales: {
            x: { display: false },
            y: { min: 0, max: 20, display: false }
        },
        plugins: { legend: { display: false } },
        maintainAspectRatio: false,
    };

    return (
        <div className="container-fluid p-0 d-flex flex-column gap-4 animate-fade-in-up">

            {/* 1. Alert Section (Top) */}
            {activeAlert && (
                <div className="alert alert-danger d-flex align-items-center shadow-sm border-0 border-start border-4 border-danger animate-pulse">
                    <AlertTriangle size={24} className="me-3" />
                    <div>
                        <h6 className="alert-heading fw-bold mb-0">System Alert Detected</h6>
                        <p className="mb-0 small">{activeAlert}</p>
                    </div>
                </div>
            )}
            {!activeAlert && (
                <div className="alert alert-success d-flex align-items-center shadow-sm border-0 border-start border-4 border-success">
                    <CheckCircle size={24} className="me-3" />
                    <div>
                        <h6 className="alert-heading fw-bold mb-0">System Normal</h6>
                        <p className="mb-0 small">All metrics are within optimal range.</p>
                    </div>
                </div>
            )}

            {/* 2. Voltage & Total Consumption (Side by Side) */}
            <div className="row g-4">
                <div className="col-md-6">
                    <div className={`card h-100 shadow-sm border-0 border-bottom border-4 ${isVoltageNormal ? 'border-success' : 'border-danger'}`}>
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <div>
                                <h6 className="text-muted text-uppercase small fw-bold mb-1">Incoming Voltage</h6>
                                <h2 className={`fw-bold mb-0 ${getStatusColor(isVoltageNormal)}`}>{voltage.toFixed(1)} V</h2>
                                <small className="text-muted">Range: 230V - 250V</small>
                            </div>
                            <div className={`p-3 rounded-circle bg-opacity-10 ${isVoltageNormal ? 'bg-success text-success' : 'bg-danger text-danger'}`}>
                                <Zap size={24} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className={`card h-100 shadow-sm border-0 border-bottom border-4 ${isTotalNormal ? 'border-success' : 'border-danger'}`}>
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <div>
                                <h6 className="text-muted text-uppercase small fw-bold mb-1">Total Consumption</h6>
                                <h2 className={`fw-bold mb-0 ${getStatusColor(isTotalNormal)}`}>{totalConsumption.toFixed(2)} kWh</h2>
                                <small className="text-muted">Daily Limit: 20 kWh</small>
                            </div>
                            <div className={`p-3 rounded-circle bg-opacity-10 ${isTotalNormal ? 'bg-success text-success' : 'bg-danger text-danger'}`}>
                                <Activity size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Submeters (3 Cards Side by Side) - Moved Up */}
            <div>
                <h6 className="fw-bold text-muted text-uppercase mb-3 px-1">Submeter Breakdown</h6>
                <div className="row g-4">
                    {submeters.map((val, idx) => {
                        const isSubmeterNormal = val <= THRESHOLDS.submeter;
                        return (
                            <div key={idx} className="col-md-4">
                                <div className={`card h-100 shadow-sm border-0 ${isSubmeterNormal ? '' : 'ring-2 ring-danger ring-opacity-50'}`}>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div>
                                                <h6 className="fw-bold mb-1">{submeterNames[idx]}</h6>
                                                <span className={`h4 fw-bold ${getStatusColor(isSubmeterNormal)}`}>
                                                    {val.toFixed(2)} kW
                                                </span>
                                            </div>
                                            <div className={`p-2 rounded ${isSubmeterNormal ? 'bg-success' : 'bg-danger'} bg-opacity-10 ${isSubmeterNormal ? 'text-success' : 'text-danger'}`}>
                                                <Zap size={18} />
                                            </div>
                                        </div>
                                        <div className="progress" style={{ height: '6px' }}>
                                            <div
                                                className={`progress-bar ${getBgColor(isSubmeterNormal)}`}
                                                role="progressbar"
                                                style={{ width: `${(val / 10) * 100}%` }}
                                            ></div>
                                        </div>
                                        <div className="mt-2 d-flex justify-content-between text-muted small">
                                            <span>0 kW</span>
                                            <span>10 kW</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 4. Live Consumption Chart - Moved to Bottom */}
            <div className="card shadow-sm border-0">
                <div className="card-header bg-white border-0 pt-4 px-4 pb-0 d-flex justify-content-between align-items-center">
                    <div>
                        <h5 className={`fw-bold mb-0 flex items-center gap-2 ${getStatusColor(isLiveNormal)}`}>
                            <Activity size={20} /> Live Consumption
                        </h5>
                        <p className="text-muted small mb-0">Real-time power usage (kW)</p>
                    </div>
                    <span className={`badge ${isLiveNormal ? 'bg-success' : 'bg-danger'} bg-opacity-10 ${isLiveNormal ? 'text-success' : 'text-danger'} px-3 py-2 rounded-pill`}>
                        {dataPoints[dataPoints.length - 1].toFixed(2)} kW
                    </span>
                </div>
                <div className="card-body px-0" style={{ height: '300px' }}>
                    <Line data={chartData} options={options} />
                </div>
            </div>

        </div>
    );
};

export default Monitoring;
