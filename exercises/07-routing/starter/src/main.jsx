import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Bug 1: The router wrapper component is missing

// "Error: useNavigate() may be used only in the context of a <Router> component"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
