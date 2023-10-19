import { Box, Typography, ThemeProvider } from "@mui/material";
import theme from "../../../theme";
import { useEffect, useState } from "react";
import axios from "axios";

const TotalUsers = () => {
  const [users, setUsers] = useState({})

  useEffect(()=>{
    const fetchData = async ()=> {
      try {
        const {data} = await axios('/users/getLastUsers')
        setUsers(data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  },[])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Typography sx={{ fontSize: "1rem" }}>Total Users</Typography>
        <h1>Nº{users.oct} de users</h1>
      </Box>
    </ThemeProvider>
  );
};

export {TotalUsers}