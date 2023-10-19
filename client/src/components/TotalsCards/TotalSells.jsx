import { useEffect, useState } from 'react';
import { Box, Typography, ThemeProvider } from "@mui/material";
// import {fetchData} from './dataFetch'
import theme from "../../../theme";
import axios from 'axios';

const TotalSells = () => {
  const [sales, setSales] = useState({})

  useEffect(()=>{
    const fetchData = async ()=> {
      try {
        const {data} = await axios('/sales/getLastYearSales?type=sum')
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
        <Typography sx={{ fontSize: "1rem" }}>Total Sells</Typography>
        <h1>${sales.oct} de ventas</h1>
      </Box>
    </ThemeProvider>
  );
};

export { TotalSells }