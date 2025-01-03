import { useEffect } from 'react';
import Card from './Card';
import Card2 from './Card';
import './cards.scss';
import { useTheme } from '../../utils/Theme-context';
import {  WeatherItem } from '../../weather-data';
import { iconMap } from '../../utils/icon';

interface Props {
  data: WeatherItem[] | null;
  error: string | null;
  loading: boolean;
  refetch: () => Promise<void>;
  day: string;
  time: string;
  temp: string;
  weather: string;
  icon: string;
  wind?: string;
  speed?: string;
}


const TopColumn = ({ data, error,   }: Props): JSX.Element => {
  const { lightTheme } = useTheme();

  const formatDateTime = (dt_txt: string) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(dt_txt);
  
    const day = daysOfWeek[date.getDay()];
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    // Correct handling of 12-hour format
    const formattedHour = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    const period = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${formattedHour}:${minutes.toString().padStart(2, "0")} ${period}`;
  
    return { day, time: formattedTime };
  };

  useEffect(() => {
    const cardContainer = document.querySelector('.Cardcontainer') as HTMLElement;
    const column = document.querySelector('.column') as HTMLElement;

    if (cardContainer && column) {
      column.style.height = `${cardContainer.clientHeight}px`;
    }

    return () => {
      if (column) {
        column.style.height = '';
      }
    };
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <>
    <div
      className="column"
      style={
        lightTheme
          ? {
              backgroundColor: '#ccc',
              color: 'black',
              boxShadow: `rgba(0, 0, 0, 0.15) 6px 6px 10px -1px,
                          rgba(255, 255, 255, 0.7) -6px -6px 10px -1px,
                          inset 0 3px 10px 0 rgb(0 0 0 / 55%)`,
              outline: '2px solid orange',
              outlineOffset: '-2px',
            }
          : {
              backgroundColor: '#36363a',
              color: 'white',
            }
      }
    >
      {data && data.length > 0 ? (
        data.map((item: WeatherItem) => {
          const { day, time } = formatDateTime(item.dt_txt);
          const icon = iconMap[item.weather[0].icon];
          return (
            <Card
              key={item.dt}
              day={day}
              time={time}
              temp={item.main.temp.toString()}
              wind={item.wind}
              weather={item.weather[0].description}
              speed={item.wind.speed.toString()}
              icon={icon}
            />
          );
        })
      ) : (
        Array.from({ length: 8 }).map((_, index) => (
          <Card2
            key={index}
            day="...loading"
            time=""
            temp=""
            weather=""
            wind={{ speed: '', gust: '', deg: '' }}
            speed=''
            icon={iconMap['01d']}
          />
        ))
      )}
    </div>
    </>
  );
};

export default TopColumn;
