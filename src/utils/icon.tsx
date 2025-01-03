import sunLight from '../assets/icons/01.sun-dark.svg';
import fullMoonLight from '../assets/icons/19.full-moon-dark.svg';
import partialCloudyLight from '../assets/icons/05.partial-cloudy-dark.svg';
import cloudyNightLight from '../assets/icons/16.cloudy-night-dark.svg';
import cloudLight from '../assets/icons/15.cloud-dark.svg';
import mostlyCloudLight from '../assets/icons/11.mostly-cloudy-dark.svg';
import rainLight from '../assets/icons/20.rain-dark.svg';
import heavyRainLight from '../assets/icons/18.heavy-rain-dark.svg';
import thunderstormLight from '../assets/icons/13.thunderstorm-dark.svg';
import snowLight from '../assets/icons/22.snow-dark.svg';
import heavyWindLight from '../assets/icons/21.heavy-wind-dark.svg';

export const iconMap: { [key: string]: string } = {
  "01d": sunLight,
  "01n": fullMoonLight,
  "02d": partialCloudyLight,
  "02n": cloudyNightLight,
  "03d": cloudLight,
  "03n": cloudLight,
  "04d": mostlyCloudLight,
  "04n": mostlyCloudLight,
  "09d": rainLight,
  "09n": rainLight,
  "10d": heavyRainLight,
  "10n": heavyRainLight,
  "11d": thunderstormLight,
  "11n": thunderstormLight,
  "13d": snowLight,
  "13n": snowLight,
  "50d": heavyWindLight,
  "50n": heavyWindLight,
};
