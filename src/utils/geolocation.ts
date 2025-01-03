import { useState, useEffect } from "react";
import { useCity } from "./Theme-context";


// Define the weather data types based on OpenWeather API response
interface Weather {
  description: string;
  icon: string;
}

interface MainWeatherData {
  temp: number;
  pressure: number;
  humidity: number;
}

interface Wind {
  speed: number;
}

interface WeatherResponse {
  name: string;
  weather: Weather[];
  main: MainWeatherData;
  wind: Wind;
}

/**
 * Custom hook to fetch the user's geolocation and weather data based on the geolocation.
 * Updates the city in the CityContext.
 * @returns The weather data, error message, and loading state.
 */
export const useGeolocationAndWeather = () => {
  const { setCity } = useCity(); // Use the CityContext to manage city state
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to get the geolocation of the user
  const getLocation = () => {
    return new Promise<{ latitude: number; longitude: number }>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (err) => reject(err),
          { timeout: 10000 }
        );
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  };

  // Fetch weather data based on the latitude and longitude
  const fetchWeather = async (latitude: number, longitude: number) => {
    const API_KEY = "187215d262353d3ff1cb64376423cc36"; // Replace with your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`; // Metric for Celsius

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data: WeatherResponse = await response.json();
      setCity(data.name); // Update the city in the CityContext
      setWeatherData(data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching weather data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    // Function to fetch both geolocation and weather data
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const { latitude, longitude } = await getLocation();
        await fetchWeather(latitude, longitude);
      } catch (err) {
        setError("Error retrieving location or weather data.");
        setLoading(false);
      }
    };

    fetchData(); // Initiates the data fetching when the hook is first used
  }, []); // Empty dependency array ensures this effect runs once on mount

  return { weatherData, error, loading };
};
