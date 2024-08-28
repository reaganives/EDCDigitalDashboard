import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi'; // Import specific weather icons

export default function WeatherLogic() {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        axios.get('/weather/forecast')
            .then(response => {
                setWeatherData(response.data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }, []);

    // Function to convert Celsius to Fahrenheit
    const convertToFahrenheit = (celsius) => {
        return (celsius * 9/5) + 32;
    };

    // Function to get the corresponding weather icon
    const getWeatherIcon = (weatherCode) => {
        switch (weatherCode) {
            case 'Clear':
                return <WiDaySunny size={32} />;
            case 'Clouds':
                return <WiCloud size={32} />;
            case 'Rain':
                return <WiRain size={32} />;
            case 'Snow':
                return <WiSnow size={32} />;
            case 'Thunderstorm':
                return <WiThunderstorm size={32} />;
            case 'Fog':
            case 'Mist':
                return <WiFog size={32} />;
            default:
                return <WiCloud size={32} />;
        }
    };

    // Function to format the hour in 12-hour format with AM/PM
    const formatHour = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    return (
        <div className="weather-card flex flex-col items-center justify-center bg-gradient-to-b from-amber-50 to-purple-100 rounded-lg shadow-lg w-full max-w-md mx-auto h-full p-2">
            {weatherData ? (
                <div className="flex flex-col items-center">
                    {/* Current Temp Display */}
                    <h3 className="md:text-5xl text-4xl font-noto font-semibold text-gray-800 text-center ml-3">
                        {Math.round(convertToFahrenheit(weatherData[0].main.temp))}°F
                    </h3>
                    <p className="md:text-base text-sm text-gray-500 capitalize tracking-wide">{weatherData[0].weather[0].description}</p>

                    {/* Time-based forecast */}
                    <div className="flex md:mt-8 mt-2 space-x-4 justify-around w-full">
                        {weatherData.slice(0, 5).map((forecast, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <p className="text-xs text-center text-gray-600 md:flex hidden">{formatHour(forecast.dt)}</p>
                                {getWeatherIcon(forecast.weather[0].main)} {/* Dynamically render weather icon */}
                                <p className="md:text-xl text-lg font-bold text-gray-700">
                                    {Math.round(convertToFahrenheit(forecast.main.temp))}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
}






