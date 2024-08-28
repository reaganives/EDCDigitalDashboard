import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi'; // Import specific weather icons

export default function TempQuickView() {
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
        <div className="weather-card flex flex-col items-center justify-center ">
            {weatherData && (
                <div className="flex flex-col items-center">
                    {/* Current Temp Display */}
                    <h3 className="text-lg font-noto font-semibold text-sky-50 text-center">
                        {Math.round(convertToFahrenheit(weatherData[0].main.temp))}°F
                    </h3>
                </div>
            )}
        </div>
    );
}