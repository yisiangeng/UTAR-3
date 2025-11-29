# TNB Energy Guardian - Project Summary

## Overview
This project implements a comprehensive energy monitoring dashboard for TNB Malaysia, aligned with SDG 7 (Affordable and Clean Energy). The application is built using React and Vite, featuring a modern, responsive design with real-time data visualization.

## Features Implemented

### 1. Trackers
- **Month-to-Date Consumption**: Visualized with a prominent card.
- **Accumulated Fee**: Bill forecaster with projected costs.
- **Voltage Guardian**: Daily usage line chart.
- **Weekly Usage**: Bar chart comparison.

### 2. In-time Monitoring (Real-time)
- **Live Tracking**: Moving sum chart updating every second.
- **Voltage Monitoring**: Simulates real-time voltage fluctuations (230V-250V).
- **Spike Detection**: Randomly simulates voltage spikes and triggers a popup alert.
- **Weather Integration**: Displays current temperature/humidity with alerts for cooling events.
- **Submeter Disaggregation**: Real-time breakdown of 3 submeters.

### 3. Forecast Dashboard
- **Efficiency Gauge**: Visual representation of forecast efficiency.
- **Usage Forecast**: Predicted load curve for the next 24 hours.
- **Submeter Predictions**: Detailed breakdown of expected usage.

### 4. AI Chatbot Assistant
- **Interactive Chat**: Users can ask questions about energy saving.
- **Scenario Simulation**: One-click simulation for Cooking, Laundry, Shower, and Aircond scenarios.
- **Smart Responses**: Context-aware advice based on keywords.

### 5. Statistics & Insights
- **Usage Breakdown**: Pie chart showing consumption by category.
- **Smart Tips**: Actionable advice with potential savings.
- **Savings Calculator**: Interactive tool to estimate monthly savings based on implemented tips.

## Technology Stack
- **Framework**: React (Vite)
- **Styling**: Vanilla CSS (Custom Design System with CSS Variables)
- **Charts**: Chart.js (via react-chartjs-2)
- **Icons**: Lucide React

## How to Run
1. Ensure dependencies are installed: `npm install`
2. Start the development server: `npm run dev`
3. Open the browser at the provided URL (usually `http://localhost:5173` or `5174`).

## Design Philosophy
The interface uses a "Clean Energy" aesthetic with a primary palette of Emerald Green and TNB Blue. It features glassmorphism effects, smooth transitions, and a card-based layout for clarity and visual appeal.
