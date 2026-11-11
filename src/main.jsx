import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthProvider.jsx' // <-- Add this line

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>  {/* <-- Add this */}
      <App />
    </AuthProvider> {/* <-- Add this */}
  </StrictMode>,
)