import { Box, Typography, ThemeProvider } from "@mui/material";
import theme from "../../../theme";

export const TotalSales = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Typography sx={{ fontSize: "1rem" }}>Total Sales</Typography>
        <h1>Nº de ventas</h1>
      </Box>
    </ThemeProvider>
  );
};