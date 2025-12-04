import React, { useState } from 'react';
import { Mic, Pause, Play, CheckCircle, XCircle, BarChart2, Zap, Brain, Target } from 'lucide-react';

// --- Helper Components for the Dashboard Cards ---

// 1. Voice Recording Card
const VoiceRecordingCard = ({ isRecording, onStart, onStop, onPlayback }) => {
  const timerDisplay = "00:00"; // Mock timer display
  
  return (
    <div className="flex flex-col bg-gray-800 p-6 rounded-xl shadow-2xl h-full transition duration-300 hover:shadow-cyan-500/30">
      <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
        <Mic className="w-6 h-6 mr-2 text-cyan-400" /> Voice Recording
      </h2>
      
      <div className="text-6xl font-extrabold text-white mb-8">
        {timerDisplay}
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={onStart}
          disabled={isRecording}
          className={`flex-1 flex items-center justify-center py-3 rounded-xl font-bold transition-all duration-200 ${
            isRecording 
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/50'
          }`}
        >
          <Mic className="w-5 h-5 mr-2" /> Start Recording
        </button>
        <button
          onClick={onStop}
          disabled={!isRecording}
          className={`w-1/3 flex items-center justify-center py-3 rounded-xl font-bold transition-all duration-200 ${
            !isRecording
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/50'
          }`}
        >
          <Pause className="w-5 h-5" /> Stop
        </button>
      </div>

      <button
        onClick={onPlayback}
        className="flex items-center justify-center py-4 rounded-xl font-bold text-lg transition-all duration-200 bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-500/50"
      >
        <Play className="w-6 h-6 mr-2 fill-white" /> Playback
      </button>
    </div>
  );
};

// 2. Analysis Results Card
const AnalysisResultsCard = ({ percentage, hasData }) => {
  const statusText = hasData ? "Analysis Complete" : "No Analysis";
  const message = hasData 
    ? "Review detailed diagnostic metrics below." 
    : "Record voice to begin Parkinson's disease analysis";

  return (
    <div className="flex flex-col bg-gray-800 p-6 rounded-xl shadow-2xl h-full transition duration-300 hover:shadow-cyan-500/30 text-center items-center justify-center">
      <h2 className="text-xl font-semibold mb-8 text-white flex items-center justify-center">
        <Zap className="w-6 h-6 mr-2 text-cyan-400" /> Analysis Results
      </h2>

      <div className="relative w-48 h-48 mb-8">
        {/* Simple Mock Progress Circle */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle 
            className="text-gray-700 stroke-current"
            strokeWidth="8" 
            cx="50" cy="50" r="44" 
            fill="transparent"
          ></circle>
          <circle 
            className="text-cyan-500 stroke-current transition-all duration-1000"
            strokeWidth="8" 
            cx="50" cy="50" r="44" 
            fill="transparent"
            strokeDasharray={2 * Math.PI * 44}
            strokeDashoffset={2 * Math.PI * 44 * (1 - percentage / 100)}
            strokeLinecap="round"
          ></circle>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-extrabold text-white">{percentage}%</span>
        </div>
      </div>

      <h3 className="text-3xl font-bold text-white mb-2">{statusText}</h3>
      <p className="text-gray-400">{message}</p>
    </div>
  );
};

// 3. Voice Analysis Graph Card
const VoiceAnalysisGraphCard = () => {
  const [activeTab, setActiveTab] = useState('Waveform');
  const tabs = ['Waveform', 'Spectrum', 'Pitch'];

  // Mock data for the graph Y-axis
  const mockYAxis = Array.from({ length: 11 }, (_, i) => (1.0 - i * 0.1).toFixed(1));

  return (
    <div className="flex flex-col bg-gray-800 p-6 rounded-xl shadow-2xl h-full transition duration-300 hover:shadow-cyan-500/30">
      <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
        <BarChart2 className="w-6 h-6 mr-2 text-cyan-400" /> Voice Analysis Graph
      </h2>
      
      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
              activeTab === tab
                ? 'bg-cyan-600 text-white shadow-md'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Graph Area (Placeholder) */}
      <div className="relative bg-gray-900 p-2 rounded-lg flex-1 h-72 lg:h-auto min-h-[200px] overflow-hidden">
        <div className="absolute inset-0 flex">
          {/* Y-Axis Labeling */}
          <div className="w-12 pt-4 flex flex-col justify-between text-right text-xs text-gray-500 font-mono">
            {mockYAxis.map((val) => (
              <span key={val} className="h-[20px] leading-none">{val}</span>
            ))}
            <span className="h-[20px] leading-none mt-auto">0</span>
            <span className="absolute transform -rotate-90 origin-bottom-left bottom-1/2 left-0 ml-1 -translate-y-1/2 text-gray-400 font-sans text-sm">Amplitude</span>
          </div>

          {/* Graph space */}
          <div className="flex-1 border-l border-b border-gray-700 grid grid-cols-10 grid-rows-10 p-1">
            {/* Grid lines */}
            {Array(9).fill(0).map((_, i) => (
                <div key={`h-line-${i}`} className="col-span-full border-b border-dashed border-gray-700/50 row-start-1" style={{gridRowStart: i + 2}}></div>
            ))}
            {Array(9).fill(0).map((_, i) => (
                <div key={`v-line-${i}`} className="row-span-full border-l border-dashed border-gray-700/50 col-start-1" style={{gridColumnStart: i + 2}}></div>
            ))}

            {/* Placeholder Text */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xl font-light">
                [{activeTab} Data Visualization]
            </div>
          </div>
        </div>

        {/* X-Axis Label */}
        <div className="absolute bottom-1 right-2 text-xs text-gray-500">Time (s)</div>
      </div>
    </div>
  );
};


// 4. Model Information Card (Sidebar Component)
const ModelInfoCard = ({ status }) => {
  const isAvailable = status === 'Connected';
  
  const InfoItem = ({ icon: Icon, title, value }) => (
    <div className="p-4 bg-gray-700/50 rounded-lg mb-3 shadow-inner">
      <h4 className="text-sm text-gray-400 font-medium flex items-center mb-1">
        <Icon className="w-4 h-4 mr-2 text-cyan-400" /> {title}
      </h4>
      <p className="text-white font-semibold">{value}</p>
    </div>
  );

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl transition duration-300 hover:shadow-cyan-500/30 mt-6 lg:mt-0">
      <h3 className="text-xl font-bold mb-4 text-white flex items-center">
        <Brain className="w-6 h-6 mr-2 text-cyan-400" /> Model Information
      </h3>

      <div className="flex items-center mb-6 text-sm">
        <div className={`w-3 h-3 rounded-full mr-2 ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className={isAvailable ? 'text-green-400' : 'text-red-400'}>
          Backend {isAvailable ? 'Available' : 'Unavailable'}
        </span>
      </div>

      <InfoItem icon={Zap} title="Training Data" value="UCI Parkinson Speech Dataset" />
      <InfoItem icon={Target} title="Algorithm" value="Random Forest Classifier" />
      <InfoItem icon={CheckCircle} title="Accuracy" value="95% Detection Rate" />
    </div>
  );
};


// --- Main Application Component ---
const App = () => {
  const [status, setStatus] = useState('Not Connected');
  const [isRecording, setIsRecording] = useState(false);
  const [analysisPercentage, setAnalysisPercentage] = useState(0);

  // Mock functions for interaction
  const handleStartRecording = () => {
    setIsRecording(true);
    setAnalysisPercentage(0);
    console.log('Recording started...');
  };
  
  const handleStopRecording = () => {
    setIsRecording(false);
    // Mock analysis calculation
    setAnalysisPercentage(78);
    console.log('Recording stopped. Running analysis...');
  };
  
  const handlePlayback = () => {
    console.log('Playback initiated...');
  };

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-100 flex flex-col p-4 sm:p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-10 pb-4 border-b border-gray-700">
        <div>
          <h1 className="text-4xl font-extrabold text-blue-500">PragnaAI</h1>
          <p className="text-lg text-gray-400">Parkinson's Disease Voice Analysis</p>
        </div>
        <div className="flex items-center text-sm font-medium">
          <span className="mr-2">Status:</span>
          <div className={`w-3 h-3 rounded-full mr-1 ${status === 'Connected' ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className={status === 'Connected' ? 'text-green-400' : 'text-red-400'}>{status}</span>
        </div>
      </header>

      {/* Main Content & Dashboard Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main Dashboard Area (3 Cards in 3/4 width) */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          
          {/* Column 1: Voice Recording */}
          <div className="md:col-span-1">
            <VoiceRecordingCard 
              isRecording={isRecording}
              onStart={handleStartRecording}
              onStop={handleStopRecording}
              onPlayback={handlePlayback}
            />
          </div>

          {/* Column 2: Analysis Results */}
          <div className="md:col-span-1">
            <AnalysisResultsCard 
              percentage={analysisPercentage} 
              hasData={analysisPercentage > 0} 
            />
          </div>
          
          {/* Column 3: Voice Analysis Graph */}
          <div className="md:col-span-1">
            <VoiceAnalysisGraphCard />
          </div>
        </div>

        {/* Sidebar / Model Info (1/4 width) */}
        <div className="lg:col-span-1">
          <ModelInfoCard status={status} />
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500">
        <p className="text-sm mb-1">Advanced voice analysis for Parkinson's disease research</p>
        <a href="mailto:pragna.ai.bio@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors duration-150 flex items-center justify-center mb-4">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
            pragna.ai.bio@gmail.com
        </a>
        <p className="text-xs">&copy; 2025 PragnaAI. For research purposes only.</p>
      </footer>
    </div>
  );
};

export default App;
