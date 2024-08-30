import { useEffect, useState } from 'react';
import axios from '../axiosConfig';

// Define the types for the weather data
interface WeatherMain {
    temp: number;
}

interface Weather {
    main: string;
    description: string;
}

interface WeatherData {
    main: WeatherMain;
    weather: Weather[];
    dt: number;  // timestamp
}

export default function TempQuickView() {
    const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null);

    useEffect(() => {
        axios.get<WeatherData[]>('/weather/forecast')
            .then(response => {
                setWeatherData(response.data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }, []);

    // Function to convert Celsius to Fahrenheit
    const convertToFahrenheit = (celsius: number): number => {
        return (celsius * 9 / 5) + 32;
    };

    return (
        <div className="weather-card flex flex-col items-center justify-center">
            {weatherData && weatherData.length > 0 && (
                <div className="flex flex-col items-center justify-center">
                    {/* Current Temp Display */}
                    <h3 className="text-lg font-noto font-semibold text-sky-50 text-center">
                        {Math.round(convertToFahrenheit(weatherData[0].main.temp))}°F
                    </h3>
                </div>
            )}
        </div>
    );
}
