import { Box, Typography, ThemeProvider } from "@mui/material";
import theme from "../../../theme";

export const TotalUsers = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Typography sx={{ fontSize: "1rem" }}>Total Users</Typography>
        <h1>Nº de users</h1>
      </Box>
    </ThemeProvider>
  );
};