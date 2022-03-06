import { FunctionComponent } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export const Layout: FunctionComponent = ({ children }) => (
  <Container sx={{ height: '100%' }}>
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingY: 2,
      }}
    >
      {children}
    </Box>
  </Container>
);
