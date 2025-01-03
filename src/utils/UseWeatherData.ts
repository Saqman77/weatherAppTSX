import { useState, useEffect } from "react";
import { fetchWeatherData } from "./api";
import { WeatherResponse } from "../weather-data";

/**
 * Custom hook to fetch and manage weather data.
 * @param city - Name of the city to fetch weather for.
 * @returns Weather data, error message, and a refetch function.
 */
export const useWeatherData = (city: string) => {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      fetchData();
    }
  }, [city]);

  return { weatherData, error, loading, refetch: fetchData };
};
