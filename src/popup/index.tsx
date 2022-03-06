import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';

import { App } from './App';
import { theme } from './theme';
import { GlobalStyles } from './GlobalStyles';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <CssBaseline />
        <GlobalStyles />

        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
