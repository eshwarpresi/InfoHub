import React, { useState } from 'react';
import WeatherModule from './components/WeatherModule';
import CurrencyConverter from './components/CurrencyConverter';
import QuoteGenerator from './components/QuoteGenerator';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('weather');

  const tabs = [
    { id: 'weather', label: 'Weather', icon: '🌤️' },
    { id: 'currency', label: 'Currency', icon: '💱' },
    { id: 'quote', label: 'Motivation', icon: '💫' }
  ];

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'weather':
        return <WeatherModule />;
      case 'currency':
        return <CurrencyConverter />;
      case 'quote':
        return <QuoteGenerator />;
      default:
        return <WeatherModule />;
    }
  };

  return (
    <div className="App" style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '2rem', color: 'white' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            🚀 ByteXL InfoHub
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            Your all-in-one utility dashboard
          </p>
        </header>

        {/* Navigation Tabs */}
        <div className="tab-container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              >
                <span style={{ marginRight: '0.5rem' }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Module */}
        <div>
          {renderActiveModule()}
        </div>

        {/* Footer */}
        <footer style={{ 
          textAlign: 'center', 
          marginTop: '3rem', 
          paddingTop: '2rem', 
          borderTop: '1px solid rgba(255,255,255,0.2)',
          color: 'white',
          opacity: 0.8
        }}>
          <p style={{ marginBottom: '0.5rem' }}>
            Built with ❤️ for <strong>ByteXL Coding Challenge</strong>
          </p>
          <p style={{ fontSize: '0.875rem' }}>
            A showcase of modern React development
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;