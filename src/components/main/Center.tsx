import def from '../../assets/icons/Sunnny Windy Icon 1.svg'

interface CenterProps {
    day: string;
    weather: string;
    temp: string;
    image: string;
    time: string | undefined;
}

const Center: React.FC<CenterProps> = ({ day, weather, temp, image, time }) => {

    const data = {
        day,
        time,
        temp,
        weather,

    }

  return (
    <div className="center-container">
        <div className='center'>
            <div className="pill day">
                <h2>{data.day ? (data.day): (<p>current day</p>)}</h2>
            </div>
            <div className="pill time">
            <h2>{data.time?  (data.time) : (<p>current time</p>)}</h2>
            </div>
            <div className="pill center-temp">
                <p>{data.temp}°C </p>
            </div>
        </div>
        <div className="weather-icon">
            <div className="center-icon">
                    <img src={image? (image):(def)} alt="icon" className='c-icon' />
            </div>
            <div className="icon-day">
                <h2>{data.weather}</h2>
            </div>
        </div>
    </div>
  )
}

export default Center