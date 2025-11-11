import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'classic' | 'snowy' | 'modern';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('classic');

  useEffect(() => {
    const root = document.documentElement;
    root.removeAttribute('data-theme');
    
    if (theme === 'snowy') {
      root.setAttribute('data-theme', 'snowy');
    } else if (theme === 'modern') {
      root.setAttribute('data-theme', 'modern');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
