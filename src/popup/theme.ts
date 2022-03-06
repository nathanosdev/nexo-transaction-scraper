import { createTheme } from '@mui/material/styles';
import { red, blueGrey, grey } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: blueGrey[500],
    },
    secondary: {
      main: grey[500],
    },
    error: {
      main: red[500],
    },
  },
});
