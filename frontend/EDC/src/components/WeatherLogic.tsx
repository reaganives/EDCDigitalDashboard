import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

export default function WeatherLogic() {
    const [weatherForecast, setWeatherForecast] = useState(null);

    useEffect(() => {
        axios.get('/weather/forecast')
            .then(response => {
                setWeatherForecast(response.data); // Setting the 3-hour forecast data
            })
            .catch(error => {
                console.error('Error fetching weather forecast:', error);
            });
    }, []);

    return (
        <div className="weather-forecast-card">
            <h2>3-Hour Weather Forecast</h2>
            {weatherForecast ? (
                <div>
                    {weatherForecast.slice(0, 8).map((forecast, idx) => (
                        <div key={idx} className="forecast-entry">
                            <p>Time: {new Date(forecast.dt * 1000).toLocaleString()}</p>
                            <p>Temperature: {forecast.main.temp} °C</p>
                            <p>Weather: {forecast.weather[0].description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading weather forecast...</p>
            )}
        </div>
    );
}


