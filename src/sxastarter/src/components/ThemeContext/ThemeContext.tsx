import React from 'react';

type ContextType = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeContext = React.createContext<ContextType>({
  theme: 'light',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {},
});
