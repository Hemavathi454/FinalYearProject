
import React, { useState, useEffect } from 'react';
import { AppView, DiagnosisResult } from './types';
import Header from './components/Header';
import Landing from './components/Landing';
import UploadModule from './components/UploadModule';
import DiagnosisView from './components/DiagnosisView';
import Dashboard from './components/Dashboard';
import AiAssistant from './components/AiAssistant';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [currentDiagnosis, setCurrentDiagnosis] = useState<DiagnosisResult | null>(null);
  const [history, setHistory] = useState<DiagnosisResult[]>([]);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('agroguard_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const handleDiagnosisComplete = (result: DiagnosisResult) => {
    setCurrentDiagnosis(result);
    setHistory(prev => {
      const updated = [result, ...prev].slice(0, 50); // Keep last 50
      localStorage.setItem('agroguard_history', JSON.stringify(updated));
      return updated;
    });
  };

  const renderView = () => {
    if (currentDiagnosis) {
      return (
        <DiagnosisView 
          result={currentDiagnosis} 
          onReset={() => setCurrentDiagnosis(null)} 
        />
      );
    }

    switch (view) {
      case 'landing':
        return <Landing setView={setView} />;
      case 'upload':
        return <UploadModule onDiagnosisComplete={handleDiagnosisComplete} />;
      case 'dashboard':
        return (
          <Dashboard 
            history={history} 
            onSelectResult={(res) => {
              setCurrentDiagnosis(res);
            }} 
          />
        );
      case 'assistant':
        return <AiAssistant />;
      default:
        return <Landing setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 selection:bg-green-100 selection:text-green-900">
      <Header currentView={view} setView={(v) => {
        setView(v);
        setCurrentDiagnosis(null);
      }} />
      <main className="flex-1">
        {renderView()}
      </main>
      <footer className="bg-white border-t py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center">
            <span className="text-xl font-bold text-green-900">AgroGuard</span>
          </div>
          <div className="flex space-x-6 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-green-700">Privacy</a>
            <a href="#" className="hover:text-green-700">Terms</a>
            <a href="#" className="hover:text-green-700">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
