import { useTheme } from "../../utils/Theme-context";
import image from '../../assets/icons/Sunnny Windy Icon 1.svg'

interface CenterProps {
    day: string;
    weather: string;
    temp: string;
    time: string;
    icon: string;
  }


const Card2: React.FC<CenterProps> = () => {

    const { lightTheme } = useTheme()
    return (
      
      <div className='card'
      style={lightTheme ? {backgroundColor: '#ccc', color: 'black', boxShadow:'inset 3px 2px 15px 2px rgb(0 0 0 / 1%), 9px 7px 18px 0 rgb(0 0 0 / 32%)'} : {backgroundColor: '#36363a', color: 'white', boxShadow:'box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5)' }}
    >
        <div className='card-header'>
          <h2>Loading.. </h2>
          <p>Loading.. </p>
        </div>
        <div className='card-body'>
          <div className='temp'>
              <div className="icon">
                  <img src={image} alt="" />
              </div>
              <p>Loading.. </p>
          </div>
        <div className='weather'>
            <h2>Loading.. </h2>
            <p>Loading.. </p>
        </div>
        </div>
    </div>
  
    )
  }
  
  export default { Card2} ;