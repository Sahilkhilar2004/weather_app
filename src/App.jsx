import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    setError('');
    setWeather(null);
    setForecast([]);

    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      setWeather(weatherRes.data);

      // Filter forecast data to get 1 forecast per day (around 12:00 PM)
      const dailyData = forecastRes.data.list.filter((item) =>
        item.dt_txt.includes('12:00:00')
      );
      setForecast(dailyData);

      updateRecentSearches(cityName);
    } catch (err) {
      console.error(err);
      setError('City not found or API error.');
    } finally {
      setLoading(false);
    }
  };

  const updateRecentSearches = (cityName) => {
    const updated = [cityName, ...recentSearches.filter((c) => c !== cityName)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const handleRefresh = () => {
    if (weather?.name) {
      fetchWeather(weather.name);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem('recentSearches'));
    if (storedSearches) setRecentSearches(storedSearches);
  }, []);

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  

  return (
    <div className="min-h-screen px-4 py-8 text-center transition duration-300">
      <h1 className="text-3xl font-bold mb-4">🌦️ Weather Dashboard</h1>

      <div className="flex justify-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 border rounded-md w-64 text-black"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Search
        </button>
        <button
  onClick={handleRefresh}
  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 active:animate-spin"
>
  Refresh 🔄
</button>

        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          {theme === 'light' ? '🌙 Dark Mode' : '🌞 Light Mode'}
        </button>
      </div>

      {/* Loader */}
      {loading && <p className="text-lg text-blue-500 animate-pulse">Loading...</p>}

      {/* Error */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Weather Info */}
      {weather && (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white/40 dark:bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg mb-6 transition duration-500">

          <h2 className="text-2xl font-semibold">{weather.name}</h2>
          <img
  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
  alt="Weather icon"
  className="mx-auto animate-float"
/>

          <p className="text-xl">{weather.main.temp}°C - {weather.weather[0].main}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} km/h</p>
        </div>
        </motion.div>
      )}

      {/* 5-Day Forecast */}
      {forecast.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">5-Day Forecast</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {forecast.map((item, index) => (
              <div key={index} className="p-4 bg-white/20 dark:bg-white/10 rounded-lg shadow text-sm">
                <p className="font-medium">{new Date(item.dt_txt).toDateString()}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt="icon"
                  className="mx-auto"
                />
                <p>{item.main.temp}°C</p>
                <p>{item.weather[0].main}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Recent Searches</h3>
          <div className="flex justify-center gap-2 flex-wrap mt-2">
            {recentSearches.map((item, idx) => (
              <button
                key={idx}
                className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
                onClick={() => fetchWeather(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
