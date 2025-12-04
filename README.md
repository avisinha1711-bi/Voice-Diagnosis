# 🔬 PragnaAI: Parkinson's Disease Voice Analysis Dashboard

This repository contains the front-end user interface for the PragnaAI system, a research application designed for the voice-based analysis and preliminary detection of Parkinson's Disease metrics. The dashboard provides a modern, responsive interface for recording voice samples, visualizing audio metrics, and displaying model diagnostic results.

#✨ Features

The dashboard is structured around four main real-time data cards, providing a complete overview of the diagnostic process:

Voice Recording & Playback: Features controls for starting and stopping a voice recording session, along with a mock timer and playback function.

Analysis Results: Displays the diagnostic confidence percentage via a clean progress circle, indicating whether the analysis is complete or pending.

Voice Analysis Graph: A visualization component with interactive tabs to switch between Waveform, Spectrum, and Pitch analysis views (currently placeholders for future integration).

Model Information: A static sidebar providing key details about the underlying Machine Learning model, including the training data source, algorithm used, and reported accuracy.

# 🛠️ Technology Stack

This application is built using a modern, efficient, and component-based technology stack:

React: Used for building a robust and maintainable component-based user interface.

Tailwind CSS: Provides utility-first styling for rapid development of a responsive, dark-themed, and aesthetically pleasing design.

Lucide React: Used for sharp, modern, and easily scalable icons.

# 🚀 Getting Started (Front-End Setup)

Since this is a single-file React component intended for a modern browser environment, the setup assumes you have a standard React development environment (like Create React App or Vite) set up.

Prerequisites

Node.js (LTS recommended)

npm or yarn

Installation Steps

Clone the repository (if applicable) or save the App.jsx file.

Ensure Tailwind CSS is configured in your project. (The provided component uses Tailwind classes extensively).

Install dependencies:
The component uses lucide-react. Install it in your project:

npm install lucide-react
# or
yarn add lucide-react


Run the application:
Integrate App.jsx into your main entry point (e.g., main.jsx or index.js).

The component will run immediately, displaying the dashboard layout. Note that the analysis and graph components contain mock data and placeholders and do not currently connect to a live backend or microphone API.

# ⚠️ Disclaimer

This dashboard is an interface design prototype for a research application. The results, status indicators, and analysis percentages displayed are MOCK DATA for illustrative purposes only and should not be used for actual diagnosis or medical decision-making.

© 2025 PragnaAI. For research purposes only.
