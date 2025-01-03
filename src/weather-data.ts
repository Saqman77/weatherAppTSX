export interface WeatherResponse {
    cod: string;
    message: number;
    cnt: number;
    list: WeatherEntry[];
    city: CityInfo;
  }
  
  export interface WeatherEntry {
    dt: number;
    main: MainWeatherData;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    rain?: Rain;
    sys: Sys;
    dt_txt: string;
  }
  
  export interface MainWeatherData {
    temp: number | string;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  }
  
  export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  export interface Clouds {
    all: number;
  }
  
  export interface Wind {
    speed: string | number;
    deg: number;
    gust: number;
  }
  
  export interface Rain {
    "3h": number;
  }
  
  export interface Sys {
    pod: string;
  }
  
  export interface CityInfo {
    id: number;
    name: string;
    coord: Coordinates;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  }
  
  export interface Coordinates {
    lat: number;
    lon: number;
  }

  export interface WeatherItem {
    dt: number;
    dt_txt: string;
    main: {
      temp: string | number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
    wind: any;
    

  }
  
  // export interface MainProps {
  //   error: string | null;
  //   loading: boolean;
  //   refetch: () => Promise<void>;
  //   data: any;

  // }