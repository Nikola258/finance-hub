import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createAppTheme } from '../theme';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProviderWrapper = ({ children }) => {
    const [mode, setMode] = useState(() => localStorage.getItem('themeMode') || 'dark');

    useEffect(() => localStorage.setItem('themeMode', mode), [mode]);

    //if the current mode is light, switch to dark. otherwise, switch to light
    const toggleTheme = () => setMode(prev => (prev === 'light' ? 'dark' : 'light'));
    const theme = useMemo(() => createAppTheme(mode), [mode]);

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};