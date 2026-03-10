import Dashboard from "./components/Dashboard.jsx"
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProviderWrapper } from './context/ThemeContext';

export default function App() {
    return (
        <ThemeProviderWrapper>
            <Router>
                <Dashboard />
            </Router>
        </ThemeProviderWrapper>
    )
}