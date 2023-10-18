// Module imports
import { createRoot } from 'react-dom/client'





// Local imports
import './renderer/styles/reset.scss'
import './renderer/styles/app.scss'
import { App } from './renderer/components/App/App.jsx'





// Render your React component instead
const root = createRoot(document.body)
root.render(<App />)
