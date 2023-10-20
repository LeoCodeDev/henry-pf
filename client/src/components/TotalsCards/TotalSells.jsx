import { useEffect, useState } from 'react';
import { Box, Typography, ThemeProvider } from "@mui/material";
import theme from "../../../theme";
import axios from 'axios';

const TotalSells = ({month}) => {
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
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography sx={{ fontSize: "1rem" }}>Total Sells</Typography>
        <Typography sx={{ fontSize: "2.5rem", marginTop: '1rem' }}>${sales[month]}</Typography>
      </Box>
    </ThemeProvider>
  );
};

export { TotalSells }