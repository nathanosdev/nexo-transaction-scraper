import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1E4DD8',
    },
    secondary: {
      main: '#F4F6FD',
    },
    error: {
      main: red.A400,
    },
  },
});
