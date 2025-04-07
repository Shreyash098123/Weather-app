import React, { useState } from "react";

const WeatherApp = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const API_KEY = "f44c266ab71365270bfaa156533ec126"
  const BASE_URL = "https://api.openweathermap.org/data/2.5";

  // Fetch current weather
  const fetchCurrentWeather = async (lat, lon) => {
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  // Fetch 5-day forecast   
  const fetchForecast = async (lat, lon) => {
    const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  // Get user location
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const currentWeatherData = await fetchCurrentWeather(latitude, longitude);
          const forecastData = await fetchForecast(latitude, longitude);
          setCurrentWeather(currentWeatherData);
          setForecast(forecastData);
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-800 text-white flex flex-col items-center justify-center p-5">
      <h1 className="text-4xl font-bold mb-6">Weather App</h1>
      <button 
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full mb-6 transition-all"
        onClick={handleLocationClick}
      >
        Get Weather
      </button>
      {currentWeather && (
        <div className="bg-white text-black p-6 rounded-2xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold">{currentWeather.name}, {currentWeather.sys.country}</h2>
          <p className="text-3xl font-bold my-2">{currentWeather.main.temp}°C</p>
          <p className="capitalize">{currentWeather.weather[0].description}</p>
          <div className="flex justify-between mt-4">
            <p><strong>Humidity:</strong> {currentWeather.main.humidity}%</p>
            <p><strong>Wind:</strong> {currentWeather.wind.speed} m/s</p>
          </div>
        </div>
      )}
      {forecast && forecast.list && (
        <div className="mt-8 bg-white text-black p-6 rounded-2xl shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl font-semibold text-center mb-4">5-Day Forecast</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {forecast.list.filter((item, index) => index % 8 === 0).map((item) => (
              <div key={item.dt} className="p-4 bg-blue-200 rounded-xl text-center shadow-md">
                <p className="font-bold">{new Date(item.dt * 1000).toLocaleDateString()}</p>
                <p className="text-lg font-semibold">{item.main.temp}°C</p>
                <p className="capitalize">{item.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
