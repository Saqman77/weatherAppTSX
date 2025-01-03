
import { useTheme } from '../../utils/Theme-context'

interface LeftColumnProps {
    wind: string;
    humidity: string;
    visibility: string;
    airPressure: string;
}

const LeftColumn = ({ wind, humidity, visibility, airPressure, }: LeftColumnProps) =>{

    const { lightTheme } = useTheme()

    // convert visibility from meters to kilometers
    const convertVisibility = (visibility: string) => {
        const visibilityInKm = (Number(visibility) / 1000).toFixed(1);
        return `${visibilityInKm} km`;
    }

    const data = {
        wind,
        humidity,
        visibility: convertVisibility(visibility),
        airPressure
    }


  return (
    <div className='left-column'
    style={lightTheme ? {backgroundColor: '#ccc', color: 'black', boxShadow:'rgb(0 0 0 / 19%) 1px 1px 15px 0px inset, rgb(0 0 0 / 40%) 3px 3px 18px 0px'} : {backgroundColor: '#36363a', color: 'white', boxShadow:'box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5)' }}
    >
        <div className="leftContent wind">
            <h2>Wind status:</h2>
            <p>{data.wind} km/h</p>
        </div>
        <div className="leftContent humidity">
            <h2>Humidity:</h2>
            <p>{data.humidity} %</p>
        </div>
        <div className="leftContent visibility">
            <h2>Visibility:</h2>
            
            <p>{ data.visibility}</p>
        </div>
        <div className="leftContent air-pressure">
            <h2>Air Pressure:</h2>
            <p>{data.airPressure} hPa</p>
        </div>
    </div>
  )
}

export default LeftColumn