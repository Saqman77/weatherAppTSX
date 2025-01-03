import { WeatherResponse } from "../weather-data";

/**
 * Processes the weather data to separate current day's data and upcoming days.
 * @param weatherData - The API response data.
 * @returns An object with current day data and an array for the next days' data.
 */
export const processWeatherData = (weatherData: WeatherResponse) => {
  const nowUTC = new Date(); // Current UTC time

  const timezoneOffsetSeconds = weatherData.city.timezone; // Timezone offset in seconds

  const localTime = new Date(nowUTC.getTime() + timezoneOffsetSeconds); // Adjust to local time

  const today = localTime.toISOString().split("T")[0]; // Current local date in 'YYYY-MM-DD' format
  const currentTime = localTime.toTimeString().split(" ")[0]; // Current local time in 'HH:MM:SS' format
  const forecastByDay: Record<string, any[]> = {};

  // Group weather data by date
  weatherData.list.forEach((entry) => {
    const date = entry.dt_txt.split(" ")[0]; // Extract date portion
    if (!forecastByDay[date]) {
      forecastByDay[date] = [];
    }
    forecastByDay[date].push(entry);
  });

  // Extract today's data and next days' data
  const currentDayData = {
    data: forecastByDay[today] || [], // Weather entries for today
    time: currentTime, // Local time adjusted for the timezone
  };
  delete forecastByDay[today]; // Remove current day from forecast

  const nextDaysData = Object.entries(forecastByDay).map(([date, entries]) => {
    // Choose an entry around noon (12:00) or average values
    const midDayEntry = entries.find((entry) => entry.dt_txt);
    return { date, ...midDayEntry };
  });

  return { currentDayData, nextDaysData };
};