import { Box, Typography, ThemeProvider } from "@mui/material";
import theme from "../../../theme";
import { useEffect, useState } from "react";
import axios from "axios";

const TotalSales = () => {
  const [sales, setSales] = useState({})

  useEffect(()=>{
    const fetchData = async ()=> {
      try {
        const {data} = await axios('/sales/getLastYearSales?type=count')
        setSales(data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  },[])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Typography sx={{ fontSize: "1rem" }}>Total Sales</Typography>
        <h1>Nº{sales.oct} de ventas</h1>
      </Box>
    </ThemeProvider>
  );
};

export {TotalSales}