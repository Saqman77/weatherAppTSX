import { createContext, useContext, useState, ReactNode } from 'react';

// Define the context type
interface ThemeContextType {
  lightTheme: boolean;
  setLightTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CityContextType {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const cityContext = createContext<CityContextType | undefined>(undefined);

// Create the provider component
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lightTheme, setLightTheme] = useState<boolean>(false);

  return (
    <ThemeContext.Provider value={{ lightTheme, setLightTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const CityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [city, setCity] = useState<string>('');

  return (
    <cityContext.Provider value={{ city, setCity }}>
      {children}
    </cityContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Custom hook to use the CityContext
export const useCity = (): CityContextType => {
  const context = useContext(cityContext);
  if (!context) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
};