import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_BASE_URL;

const WeatherModule = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState('pending');

  // Get precise user location
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude.toFixed(4),
            lon: position.coords.longitude.toFixed(4)
          };
          console.log('User location:', location);
          setLocationPermission('granted');
          resolve(location);
        },
        (error) => {
          console.warn('Location error:', error);
          setLocationPermission('denied');
          reject(new Error(`Location access ${error.message.toLowerCase()}`));
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 300000 // 5 minutes cache
        }
      );
    });
  };

  const fetchWeather = async (location = null) => {
    try {
      setLoading(true);
      setError('');
      
      let apiUrl = `${API_URL}/api/weather`;
      let requestType = 'default';
      
      if (location?.lat && location?.lon) {
        apiUrl += `?lat=${location.lat}&lon=${location.lon}`;
        requestType = 'coordinates';
      } else {
        apiUrl += `?city=Bangalore`;
        requestType = 'city';
      }
      
      console.log(`Fetching weather (${requestType}):`, apiUrl);
      
      const response = await axios.get(apiUrl);
      
      if (response.data.success) {
        setWeatherData({
          ...response.data.data,
          requestType: requestType
        });
        if (location) {
          setUserLocation(location);
        }
      } else {
        throw new Error('Failed to load weather data');
      }
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError(err.message || 'Unable to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherWithLocation = async () => {
    try {
      const location = await getUserLocation();
      await fetchWeather(location);
    } catch (locationError) {
      console.log('Using default city due to:', locationError.message);
      await fetchWeather(); // Use default city
    }
  };

  useEffect(() => {
    fetchWeatherWithLocation();
  }, []);

  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌦️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[iconCode] || '🌤️';
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRetryWithLocation = () => {
    fetchWeatherWithLocation();
  };

  const handleRetryDefault = () => {
    fetchWeather();
  };

  if (loading) {
    return (
      <div className="module-card">
        <h2 className="text-xl font-bold mb-4 text-gray-800">🌤️ Live Weather</h2>
        <div className="flex flex-col items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
          <span className="text-gray-600 text-center">
            {locationPermission === 'pending' ? 'Detecting your location...' : 'Loading weather data...'}
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="module-card">
        <h2 className="text-xl font-bold mb-4 text-gray-800">🌤️ Live Weather</h2>
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <div className="text-red-500 mb-3">❌ {error}</div>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button 
              onClick={handleRetryWithLocation}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              📍 Use My Location
            </button>
            <button 
              onClick={handleRetryDefault}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              🏙️ Use Default City
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="module-card">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        🌤️ Live Weather 
        {weatherData?.requestType === 'coordinates' && (
          <span className="text-sm text-green-600 ml-2">📍 Your Exact Location</span>
        )}
        {weatherData?.requestType === 'city' && (
          <span className="text-sm text-blue-600 ml-2">🏙️ City-Based</span>
        )}
      </h2>
      
      {weatherData && (
        <div className="space-y-4">
          {/* Location & Temperature */}
          <div className="flex items-center justify-between">
            <div className="text-5xl">
              {getWeatherIcon(weatherData.icon)}
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-800">
                {weatherData.temperature}°C
              </div>
              <div className="text-sm text-gray-600">{weatherData.location}</div>
              {weatherData.feelsLike && (
                <div className="text-xs text-gray-500">Feels like {weatherData.feelsLike}°C</div>
              )}
              {userLocation && (
                <div className="text-xs text-green-600 mt-1">
                  📍 {userLocation.lat}, {userLocation.lon}
                </div>
              )}
            </div>
          </div>
          
          {/* Weather Description */}
          <div className="text-lg text-gray-700 capitalize text-center bg-blue-50 py-2 rounded">
            {weatherData.description}
          </div>
          
          {/* Weather Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-blue-50 p-3 rounded text-center">
              <div>💧 Humidity</div>
              <div className="font-semibold text-lg">{weatherData.humidity}%</div>
            </div>
            <div className="bg-green-50 p-3 rounded text-center">
              <div>💨 Wind Speed</div>
              <div className="font-semibold text-lg">{weatherData.windSpeed} m/s</div>
            </div>
            <div className="bg-purple-50 p-3 rounded text-center">
              <div>📊 Pressure</div>
              <div className="font-semibold text-lg">{weatherData.pressure} hPa</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded text-center">
              <div>👁️ Visibility</div>
              <div className="font-semibold text-lg">{weatherData.visibility} km</div>
            </div>
          </div>

          {/* Sunrise/Sunset if available */}
          {weatherData.sunrise && weatherData.sunset && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-orange-50 p-3 rounded text-center">
                <div>🌅 Sunrise</div>
                <div className="font-semibold">{formatTime(weatherData.sunrise)}</div>
              </div>
              <div className="bg-indigo-50 p-3 rounded text-center">
                <div>🌇 Sunset</div>
                <div className="font-semibold">{formatTime(weatherData.sunset)}</div>
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
            <button 
              onClick={handleRetryWithLocation}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
            >
              🔄 Refresh with My Location
            </button>
            <button 
              onClick={handleRetryDefault}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm"
            >
              🔄 Refresh Default
            </button>
          </div>
          
          {/* API Key Notice */}
          {weatherData.note && (
            <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded text-center">
              ⚠️ {weatherData.note}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherModule;