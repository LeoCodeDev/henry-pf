import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import axios from 'axios';

const VariantButtonGroup = () => {
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
         marginTop: 9,
        },
      }}
    >
      
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button>All Teams</Button>
        {teams.map((team) => (
            <Button key={team.id_team}>{team.name}</Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}

export { VariantButtonGroup }