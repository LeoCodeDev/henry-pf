import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#228d07', 
    },
    secondary: {
      main: '#E91E63',
    },
    error: {
      main: '#F44336', // Color de error (rojo)
    },
    warning: {
      main: '#FF9800', // Color de advertencia (naranja claro)
    },
    background: {
        main: '#1E1E1E', // oscuro
    },
    background_ligth: {
        main: '#ffff', 
    },
  },
  typography: {
    fontFamily: 'poppins, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
});

export default theme;
