import { ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';
import { createContext, ReactNode, useContext } from 'react';
import { DarkTheme } from '../themes';

interface IThemeContextProps {
  children: ReactNode;
}

const ThemeContext = createContext({});

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

export const AppThemeProvider: React.FC<IThemeContextProps> = ({
  children,
}) => {
  return (
    <ThemeContext.Provider value={{}}>
      <ThemeProvider theme={DarkTheme}>
        <Box
          width="100vw"
          height="100vh"
          bgcolor={DarkTheme.palette.background.default}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
