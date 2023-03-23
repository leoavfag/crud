import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { LateralMenu } from './shared/components';
import { AppThemeProvider, DrawerProvider } from './shared/contexts';

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <LateralMenu>
            <AppRoutes />
          </LateralMenu>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
