import React from 'react';

import { ThemeContext } from 'src/components/ThemeContext/ThemeContext';
import { useLocalStorage } from 'src/components/ThemeContext/LocalStorage';

type Props = {
  children?: React.ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage('ui.theme', 'light');

  const toggleTheme = (): void => {
    const val = theme === 'light' ? 'dark' : 'light';
    setTheme(val);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
