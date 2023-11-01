import {Box, ButtonGroup, Button, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import theme from '../../../theme';

const TopBar = ({onTeamChange}) => {
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
        <Button onClick={() => onTeamChange(null)}>All Teams</Button>
        {teams.map((team) => (
            <Button key={team.id_team} onClick={() => onTeamChange(team.name)}>{team.name}</Button>
        ))}
      </ButtonGroup>
    </Box>
    </ThemeProvider>
  );
}

export { TopBar }