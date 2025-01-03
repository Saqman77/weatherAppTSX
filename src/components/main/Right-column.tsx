import { useEffect, useState } from 'react';
import { useTheme } from '../../utils/Theme-context';

interface RightColumnProps {
  city: string;
}

const RightColumn: React.FC<RightColumnProps> = ({ city }) => {
  const { lightTheme } = useTheme();
  const [uvIndex, setUvIndex] = useState<number | null>(null);
  const [dashOffset, setDashOffset] = useState<number>(472); // Full circle by default

  // Fetch latitude and longitude based on city name
  const fetchCoordinates = async (city: string) => {
    try {
      const API_KEY = "187215d262353d3ff1cb64376423cc36"; // Replace with your OpenWeather API key
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        return { lat, lon };
      } else {
        console.error('City not found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      return null;
    }
  };

  // Fetch UV index based on coordinates
  const fetchUvIndex = async (lat: number, lon: number) => {
    try {
      const API_KEY = "187215d262353d3ff1cb64376423cc36"; // Replace with your OpenWeather API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      const data = await response.json();
      const uv = data.value; // UV index value
      setUvIndex(uv);

      // Assuming maximum UV index is 15 (you can adjust this based on your needs)
      const maxUvIndex = 15;
      const uvPercentage = Math.min((uv / maxUvIndex) * 100, 100);
      const newDashOffset = 472 - (472 * uvPercentage) / 100; // Calculate dash offset
      setDashOffset(newDashOffset);
    } catch (error) {
      console.error('Error fetching UV index:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const coordinates = await fetchCoordinates(city);
      if (coordinates) {
        await fetchUvIndex(coordinates.lat, coordinates.lon);
      }
    };

    fetchData();
  }, [city]);

  return (
    <div className="uv-container">
      <div className="uv-wrapper">
        <div className="uv">
          <div
            className="outer"
            style={
              lightTheme
                ? {
                    boxShadow: '6px 6px 10px -1px rgba(0,0,0,0.15), -6px -6px 10px -1px rgba(255,255,255,0.7)',
                  }
                : {
                    boxShadow: '6px 6px 10px -1px rgba(0, 0, 0, 0.4), -6px -6px 10px -1px rgba(98, 98, 103, 0.7)',
                  }
            }
          >
            <div
              className="inner"
              style={
                lightTheme
                  ? {
                      boxShadow: `inset 4px 4px 6px -1px rgba(0,0,0,0.2), inset -4px -4px 6px -1px rgba(255, 255, 255, 0.7),
                                    -0.5px -0.5px 0px rgba(255, 255, 255, 1), 0.5px 0.5px 0px rgba(0,0,0,0.15),
                                    0px 12px 10px -10px rgba(0,0,0,0.05)`,
                    }
                  : {
                      boxShadow: `inset 4px 4px 6px -1px rgba(0, 0, 0, 0.25),
                                    inset -4px -4px 6px -1px rgba(98, 98, 103, 0.7),
                                    0.5px 0.5px 0px rgba(98, 98, 103, 1),
                                    -0.5px -0.5px 0px rgba(0, 0, 0, 0.15),
                                    0px 12px 10px -10px rgba(0, 0, 0, 0.05)`,
                    }
              }
            >
              <div id="uvIndex">{`UV: ${uvIndex !== null ? uvIndex : 'Loading...'}%`}</div>
            </div>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
          <defs>
            <linearGradient id="GradientColor" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fcb042" />
              <stop offset="100%" stopColor="#f59522" />
            </linearGradient>
          </defs>
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="url(#GradientColor)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: '472',
              strokeDashoffset: dashOffset,
              transition: 'stroke-dashoffset 0.5s ease-in-out',
            }}
          />
        </svg>
      </div>
    </div>
  );
};

export default RightColumn;
