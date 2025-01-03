import './header.scss';
import logo from '../../assets/icons/football-grass-green-nature-soccer-svgrepo-com.svg';
import searchIcon from '../../assets/icons/search-svgrepo-com.svg';
import { useCity, useTheme } from '../../utils/Theme-context';
import { useRef, useState } from 'react';

const Header = () => {
  const { lightTheme, setLightTheme } = useTheme();
  const { city, setCity } = useCity();
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]); // Holds city suggestions

  const fetchSuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]); // Clear suggestions for short queries
      return;
    }

    try {
      const API_KEY = "187215d262353d3ff1cb64376423cc36"; // Replace with your OpenWeather API key
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
      );
      const data = await response.json();
      const cityNames = data.map((item: any) => item.name); // Extract city names
      setSuggestions(cityNames);
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
    }
  };

  const handleSearch = () => {
    if (inputRef.current) {
      setCity(inputRef.current.value); // Set the city to the state using input's value
      setSuggestions([]); // Clear suggestions after search
    }
  };

  const enterPressed = (event: any) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    if (query.trim() === "") {
      setSuggestions([]); // Clear suggestions when the input is empty
      return;
    }

    fetchSuggestions(query); // Fetch suggestions based on input
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCity(suggestion); // Set city to the selected suggestion
    if (inputRef.current) {
      inputRef.current.value = suggestion; // Update input value
    }
    setSuggestions([]); // Clear suggestions
  };

  const toggleTheme = () => {
    setLightTheme(!lightTheme);
  };

  return (
    <div className="header">
      <div className="logo" style={{ width: '30px', height: '30px' }}>
        <img src={logo} alt="Logo" style={{ width: '30px', height: '30px' }} />
      </div>
      <div className="search-wrapper">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for city"
          className="search"
          onKeyDown={enterPressed}
          onChange={handleInputChange}
          style={
            lightTheme
              ? {
                  boxShadow:
                    '-5px -3px 6px 0 rgb(255 255 255), inset 2px 3px 4px 1px rgb(0 0 0 / 28%), 2px 3px 10px 0 rgb(0 0 0 / 58%)',
                }
              : {
                  boxShadow:
                    'inset 0 3px 5px 0 rgb(0 0 0), -2px -3px 4px 1px rgb(231 228 228 / 29%)',
                }
          }
        />
        <button onClick={handleSearch} style={{ 
           boxShadow: lightTheme ? '-5px -3px 6px 0 rgb(255 255 255), 2px 3px 10px 0 rgb(0 0 0 / 58%)' 
           : '1px 2px 10px 0 rgba(0, 0, 0, 0.5), 0 0 10px 0 rgba(0, 0, 0, 0.4),  -2px -3px 4px 1px rgb(231 228 228 / 29%)',
          width: '20px',
          height: '20px' }}>
          <img src={searchIcon} alt="Search" className="searchImg" />
        </button>
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="suggestion-item"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="city-name">
        <h2 className="city-text">{city}</h2>
      </div>
      <div className="toggle">
        <label className="switch">
          <input type="checkbox" onClick={toggleTheme} />
          <span
            className="slider-round"
            style={
              lightTheme
                ? {
                    boxShadow:
                      '-5px -3px 6px 0 rgb(255 255 255), inset 2px 3px 4px 1px rgb(0 0 0 / 28%), 2px 3px 10px 0 rgb(0 0 0 / 58%)',
                  }
                : {
                    boxShadow:
                      'inset 0 3px 5px 0 rgb(0 0 0), -2px -3px 4px 1px rgb(231 228 228 / 29%)',
                  }
            }
          ></span>
        </label>
      </div>
    </div>
  );
};

export default Header;
