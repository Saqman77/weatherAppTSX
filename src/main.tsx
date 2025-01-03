import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { CityProvider, ThemeProvider } from './utils/Theme-context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <CityProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </CityProvider>
  </StrictMode>,
)
