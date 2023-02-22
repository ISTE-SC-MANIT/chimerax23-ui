import React from 'react';

export const ThemeContext = React.createContext({ toggleMode: () => {} });

export function toggleMode(
  setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
) {
  setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
}
