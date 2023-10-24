import { Box, Typography, ThemeProvider } from "@mui/material";
import theme from "../../../theme";
import { useEffect, useState } from "react";
import axios from "axios";

const TotalUsers = ({month}) => {
  const [users, setUsers] = useState({})

  useEffect(()=>{
    const fetchData = async ()=> {
      try {
        const {data} = await axios('/users/getLastUsers')
        setUsers(data)
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData()
  },[])

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Typography sx={{ fontSize: "1rem" }}>Total Users</Typography>
      <Typography sx={{ fontSize: "2.5rem", marginTop: '1rem' }}>{users[month]}</Typography>
    </Box>
  </ThemeProvider>
  );
};

export {TotalUsers}