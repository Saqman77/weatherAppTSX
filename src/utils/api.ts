import { WeatherResponse } from "../weather-data";

const API_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";
const SEARCH_API_BASE_URL = "https://api.openweathermap.org/data/2.5/find";
const API_KEY = "187215d262353d3ff1cb64376423cc36";

/**
 * Fetch weather data from the OpenWeatherMap API.
 * @param city - Name of the city to fetch weather for.
 * @returns A promise resolving to weather data.
 */
export const fetchWeatherData = async (city: string): Promise<WeatherResponse> => {
  if (!city) {
    throw new Error("City name cannot be empty.");
  }

  try {
    const response = await fetch(`${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data: WeatherResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};



export const searchCitySuggestions = async (city: string): Promise<WeatherResponse> => {
  if (!city) {
    throw new Error("City name cannot be empty.");
  }

  try {
    const response = await fetch(`${SEARCH_API_BASE_URL}?q=${city}&appid=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data: WeatherResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch city", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}