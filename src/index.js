import './index.css';
import { ThemeProvider } from '@emotion/react';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FoodProvider } from './context/food';
import { createTheme } from '@mui/material';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

const theme = createTheme({
  // BREAKPOINTS
  breakpoints: {
    values: {
      lg: 1200,
      md: 900,
      sm: 780,
      xl: 1500,
      xs: 0,
    },
  },
  // PALLETE
  palette: {
    primary: {
      main: '#4831d4',
    },
  },
});

root.render(
  <FoodProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </FoodProvider>
);
