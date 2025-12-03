import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // Default dark mode

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);
  // whenever the theme state changes, this useEffect updates meaning useEffect
  // codes enclosed by curly braces run after the component renders
  // here, it sets a data-theme attribute on the body element to the current theme value
  // this allows CSS to apply different styles based on the theme (dark or light)

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
