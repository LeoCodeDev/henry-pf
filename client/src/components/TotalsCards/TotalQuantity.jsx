import { Box, Typography, ThemeProvider } from "@mui/material";
import theme from "../../../theme";
import { useEffect, useState } from "react";
import axios from "axios";

const TotalQuantity = ({month}) => {
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
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Typography sx={{ fontSize: "1rem" }}>Total Quantity</Typography>
      <Typography sx={{ fontSize: "2.5rem", marginTop: '1rem' }}>{sales[month]}</Typography>
    </Box>
  </ThemeProvider>
  );
};

export {TotalQuantity}