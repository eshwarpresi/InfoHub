import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(100);
  const [conversionData, setConversionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchConversion = async (conversionAmount = amount) => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`http://localhost:5000/api/currency?amount=${conversionAmount}`);
      
      if (response.data.success) {
        setConversionData(response.data.data);
      } else {
        setError(response.data.error || 'Conversion failed');
      }
    } catch (err) {
      setError('Unable to connect to currency service. Please try again.');
      console.error('Currency fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversion(100);
  }, []);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(value) && value >= 0)) {
      setAmount(value);
    }
  };

  const handleConvert = (e) => {
    e.preventDefault();
    if (amount !== '' && amount >= 0) {
      fetchConversion(amount);
    } else {
      setError('Please enter a valid amount');
    }
  };

  return (
    <div className="module-card">
      <h2 className="text-xl font-bold mb-4 text-gray-800">💱 Currency Converter</h2>
      
      <form onSubmit={handleConvert} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount in INR (₹)
            </label>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount in INR"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              step="0.01"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors font-medium"
            >
              {loading ? 'Converting...' : 'Convert'}
            </button>
          </div>
        </div>
      </form>

      {loading && (
        <div className="flex items-center justify-center h-20">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
          <span className="ml-2 text-gray-600">Converting currency...</span>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <div className="text-red-600 font-medium mb-2">⚠️ {error}</div>
          <button 
            onClick={() => fetchConversion(amount)}
            className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            Retry
          </button>
        </div>
      )}

      {conversionData && !loading && (
        <div className="space-y-4">
          <div className="text-center text-sm text-gray-600 bg-gray-50 py-2 rounded">
            Converting <span className="font-bold">₹{conversionData.originalAmount}</span> Indian Rupees
          </div>
          
          <div className="grid gap-3">
            {Object.entries(conversionData.conversions).map(([currency, value]) => (
              <div
                key={currency}
                className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100"
              >
                <div className="flex items-center">
                  <span className="text-lg mr-2">
                    {currency === 'USD' ? '💵' : currency === 'EUR' ? '💶' : '💷'}
                  </span>
                  <span className="font-semibold text-gray-700">{currency}</span>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600">
                    {value}
                  </div>
                  <div className="text-xs text-gray-500">{currency}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-xs text-gray-500 text-center mt-2">
            Exchange rates are for demonstration purposes
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;