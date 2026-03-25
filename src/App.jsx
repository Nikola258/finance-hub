import Dashboard from "./components/Dashboard.jsx"
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProviderWrapper } from './context/ThemeContext';
import {CryptoProvider} from "./context/CryptoContext.jsx";

export default function App() {
    return (
        <CryptoProvider>
            <ThemeProviderWrapper>
                <Router>
                    <Dashboard />
                </Router>
            </ThemeProviderWrapper>
        </CryptoProvider>
    )
}