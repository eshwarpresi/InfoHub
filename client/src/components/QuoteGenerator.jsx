import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('http://localhost:5000/api/quote');
      
      if (response.data.success) {
        setQuote(response.data.data);
      } else {
        setError('Failed to load quote');
      }
    } catch (err) {
      setError('Unable to connect to quote service. Please try again.');
      console.error('Quote fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleNewQuote = () => {
    fetchQuote();
  };

  if (loading) {
    return (
      <div className="module-card">
        <h2 className="text-xl font-bold mb-4 text-gray-800">💫 Motivational Quotes</h2>
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          <span className="ml-2 text-gray-600">Loading inspiration...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="module-card">
        <h2 className="text-xl font-bold mb-4 text-gray-800">💫 Motivational Quotes</h2>
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <div className="text-red-500 mb-3">❌ {error}</div>
          <button 
            onClick={handleNewQuote}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="module-card">
      <h2 className="text-xl font-bold mb-4 text-gray-800">💫 Motivational Quotes</h2>
      
      {quote && (
        <div className="text-center space-y-6">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-100">
            <div className="text-4xl text-purple-300 mb-2">"</div>
            <p className="text-xl text-gray-800 italic leading-relaxed mb-4 px-4">
              {quote.text}
            </p>
            <div className="text-4xl text-purple-300 transform rotate-180 mb-2">"</div>
            <div className="border-t border-purple-200 pt-4">
              <p className="text-lg text-purple-600 font-semibold">
                — {quote.author}
              </p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleNewQuote}
              className="px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors font-medium shadow-md hover:shadow-lg"
            >
              ✨ New Quote
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors font-medium"
            >
              🔄 Refresh All
            </button>
          </div>
          
          <div className="text-sm text-gray-500 mt-4">
            Let this inspiration fuel your day! 💪
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteGenerator;