import { Box, Typography, ThemeProvider } from "@mui/material";
import theme from "../../../theme";

export const TotalSells = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Typography sx={{ fontSize: "1rem" }}>Total Sells</Typography>
        <h1>$ de ventas</h1>
      </Box>
    </ThemeProvider>
  );
};
