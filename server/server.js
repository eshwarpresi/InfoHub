const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: 'https://info-dl1f54bei-eshwarpresis-projects.vercel.app', // Vercel frontend URL
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// Mock quotes data
const motivationalQuotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" }
];

// Weather API endpoint
app.get('/api/weather', async (req, res) => {
  try {
    const { city = 'Bangalore', lat, lon } = req.query;
    let weatherData;

    if (lat && lon) {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed,pressure_msl&timezone=auto`);
      const data = await response.json();

      const weatherCodes = {
        0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
        45: 'Fog', 48: 'Depositing rime fog', 51: 'Light drizzle', 53: 'Moderate drizzle',
        55: 'Dense drizzle', 61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
        80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers'
      };

      weatherData = {
        location: data?.timezone || `Lat: ${lat}, Lon: ${lon}`,
        temperature: Math.round(data.current.temperature_2m),
        description: weatherCodes[data.current.weather_code] || 'Unknown',
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed,
        icon: "02d",
        feelsLike: Math.round(data.current.apparent_temperature),
        pressure: Math.round(data.current.pressure_msl)
      };
    } else {
      const cityWeather = {
        'Bangalore': { temp: 26, desc: 'Partly cloudy', humidity: 65 },
        'Hyderabad': { temp: 28, desc: 'Clear sky', humidity: 60 },
        'Delhi': { temp: 22, desc: 'Smoke', humidity: 70 },
        'Mumbai': { temp: 30, desc: 'Humid', humidity: 80 },
        'Chennai': { temp: 32, desc: 'Hot', humidity: 75 }
      };
      const cityData = cityWeather[city] || cityWeather['Bangalore'];

      weatherData = {
        location: `${city}, IN`,
        temperature: cityData.temp,
        description: cityData.desc,
        humidity: cityData.humidity,
        windSpeed: 3.2,
        icon: "02d",
        feelsLike: cityData.temp + 2,
        pressure: 1013,
        visibility: 10
      };
    }

    await new Promise(resolve => setTimeout(resolve, 800));

    res.json({
      success: true,
      data: weatherData,
      note: lat && lon ? "Live weather from your location" : "Sample city data"
    });

  } catch (error) {
    console.error('Weather API error:', error.message);
    res.json({
      success: true,
      data: {
        location: "Bangalore, IN",
        temperature: 26,
        description: "Partly cloudy",
        humidity: 65,
        windSpeed: 3.2,
        icon: "02d",
        feelsLike: 28,
        pressure: 1013,
        visibility: 10
      },
      note: "Using sample weather data"
    });
  }
});

// Currency conversion endpoint
app.get('/api/currency', async (req, res) => {
  try {
    const { amount = 100 } = req.query;
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount < 0) {
      return res.status(400).json({ success: false, error: 'Please provide a valid positive amount' });
    }

    const exchangeRates = { USD: 0.012, EUR: 0.011, GBP: 0.0095 };
    const conversions = {
      USD: (numericAmount * exchangeRates.USD).toFixed(2),
      EUR: (numericAmount * exchangeRates.EUR).toFixed(2),
      GBP: (numericAmount * exchangeRates.GBP).toFixed(2)
    };

    await new Promise(resolve => setTimeout(resolve, 500));

    res.json({
      success: true,
      data: { originalAmount: numericAmount, originalCurrency: 'INR', conversions }
    });

  } catch (error) {
    console.error('Currency API error:', error.message);
    res.status(500).json({ success: false, error: 'Unable to fetch currency data' });
  }
});

// Quotes endpoint
app.get('/api/quote', async (req, res) => {
  try {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    const quote = motivationalQuotes[randomIndex];
    await new Promise(resolve => setTimeout(resolve, 400));

    res.json({ success: true, data: quote });

  } catch (error) {
    console.error('Quotes API error:', error.message);
    res.status(500).json({ success: false, error: 'Unable to fetch quote' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'InfoHub API Server is running successfully!' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to InfoHub API Server',
    endpoints: {
      weather: '/api/weather',
      currency: '/api/currency?amount=100',
      quotes: '/api/quote',
      health: '/api/health'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
