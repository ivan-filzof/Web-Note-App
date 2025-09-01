
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './css/index.css'

// Remove dark mode class addition
createRoot(document.getElementById("root")!).render(<App />);
