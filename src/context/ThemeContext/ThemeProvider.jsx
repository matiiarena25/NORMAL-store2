import { useState, useEffect } from 'react';
import ThemeContext from './ThemeContext';

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const storedTheme = sessionStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            sessionStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const value = {
        theme,
        isDarkMode: theme === 'dark',
        toggleTheme
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
