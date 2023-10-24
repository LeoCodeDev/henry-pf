import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#228d07",
    },
    secondary: {
      main: "#E91E63",
    },
    error: {
      main: "#F44336", // Color de error (rojo)
    },
    warning: {
      main: "#FF9800", // Color de advertencia (naranja claro)
    },
    background: {
      main: "#1E1E1E", // oscuro
    },
    background_ligth: {
      main: "#ffff",
    },
    background_dark: {
      main: "#010402",
    },
    text: {
      main: "#bfbfbf",
    },
  },
  typography: {
    fontFamily: "poppins, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },

    h3: {
      fontSize: "1.3rem",
      fontWeight: 350,
    },
    h7: {
      fontSize: "1rem",
      fontWeight: 320,
    },
    h8: {
      fontSize: "0.8rem",
      fontWeight: 300,
    },

    body1: {
      fontSize: "1rem",
    },
    button: {
      textTransform: "none",
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiTextField: {  
      defaultProps: {
        size: 'small',  
      },
    },
    MuiSelect: {  
      defaultProps: {
        size: 'small',  
      },
    },
    MuiMenuItem: {  
      defaultProps: {
        dense: true, 
      },
    },
    MuiButton: {  
      defaultProps: {
        size: 'small',  
      },
    },
  }
});

export default theme;
