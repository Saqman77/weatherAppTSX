import { useEffect } from 'react';
import './App.scss';
import Header from './components/header/Header';
import TopColumn from './components/cards/Top-column';
import Main from './components/main/Main';
import { useCity, useTheme } from './utils/Theme-context';
import { useWeatherData } from './utils/UseWeatherData';
import { processWeatherData } from './utils/Process-data';
import { useGeolocationAndWeather } from './utils/geolocation';


const App = () => {
  const { city, setCity } = useCity();
  const { weatherData: geoWeatherData } = useGeolocationAndWeather(); // Use geolocation hook
  const { weatherData, error, loading, refetch } = useWeatherData(city);
  const processedData = weatherData ? processWeatherData(weatherData) : null;
  const nextDaysData: any = processedData?.nextDaysData || [];
  const currentDayData = processedData?.currentDayData.data[0];
  const time = processedData?.currentDayData.time;
  const { lightTheme } = useTheme();

  // Sync city with geolocation-based city name
  useEffect(() => {
    if (geoWeatherData?.name) {
      setCity(geoWeatherData.name); // Update city context with the geolocation city
    }
  }, [geoWeatherData, setCity]);

  // Debugging logs
  useEffect(() => {
    console.log(weatherData, processedData);
  }, [weatherData, processedData]);

  return (
    <div
      className="App"
      {...processedData}
      style={
        lightTheme
          ? { backgroundColor: 'rgb(217 217 217)', color: 'black' }
          : { backgroundColor: '#212022', color: 'white' }
      }
    >
      <div
        className="main-wrapper"
        style={{
          width: '100%',
          maxWidth: '1400px',
          height: window.innerWidth < 1200 ? 'max-content' : '100vh',
          maxHeight: '100%',
          padding: window.innerWidth > 500 ? '30px' : '15px',
        }}
      >
        <Header />
        <TopColumn
          data={nextDaysData}
          error={error}
          loading={loading}
          refetch={refetch}
          day={!loading ? processedData?.nextDaysData[0].day : 'loading....'}
          time={!loading ? processedData?.nextDaysData[0].time : 'loading....'}
          temp={!loading ? processedData?.nextDaysData[0].temp : 'loading....'}
          weather={!loading ? processedData?.nextDaysData[0].weather : 'loading....'}
          icon={!loading ? processedData?.nextDaysData[0].icon : 'loading....'}
        />
        <Main
          data={currentDayData}
          loading={loading}
          refetch={refetch}
          error={error}
          time={!loading ? time : 'loading....'}
          city={city}
        />
      </div>
    </div>
  );
};

export default App;
