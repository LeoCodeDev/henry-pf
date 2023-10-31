import {Box, ButtonGroup, Button, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import theme from '../../../theme';

const TopBar = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        axios.get("/users/getTeams")
          .then((response) => {
            setTeams(response.data);
          })
          .catch((error) => {
            console.error("Error al realizar la solicitud GET:", error);
          });
      }, []); 

      console.log('equipos', teams);
  return (
    <ThemeProvider theme={theme}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
         marginTop: 10,
        },
      }}
    >
      
      <ButtonGroup size="small" variant="contained" aria-label="outlined primary button group">
        <Button>All Teams</Button>
        {teams.map((team) => (
            <Button key={team.id_team}>{team.name}</Button>
        ))}
      </ButtonGroup>
    </Box>
    </ThemeProvider>
  );
}

export { TopBar }