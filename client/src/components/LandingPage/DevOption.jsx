import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from 'axios';

export default function SelectLabels(props) {
  const {
    isDeveloper,
    developerType,
    onIsDeveloperChange,
    onDeveloperTypeChange,
    isDesktop,
  } = props;

  const [teams, setTeams] = useState([]); // Estado para almacenar los equipos
  const [loading, setLoading] = useState(true);

  const handleIsDeveloperChange = (event) => {
    const value = event.target.value;
    onIsDeveloperChange(value);
  };

  const handleDeveloperTypeChange = (event) => {
    const value = event.target.value;
    onDeveloperTypeChange(value);
  };

  useEffect(() => {
    // Realizar la solicitud GET al servidor
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/getTeams'); // Reemplaza '/getTeams' con la ruta correcta
        setTeams(response.data); // Almacena la respuesta en el estado de los equipos
        setLoading(false); // Establece loading en false una vez que se ha completado la solicitud
      } catch (error) {
        console.error("Error al obtener los equipos:", error);
      }
    };

    fetchData();
  }, []); // El segundo argumento [] asegura que esta solicitud se realice solo una vez al montar el componente

  return (
    <div>
      <FormControl sx={{ minWidth: 120, justifyContent: "space-between" }}>
        <InputLabel id="is-developer-label">Is Developer?</InputLabel>
        <Select
          labelId="is-developer-label"
          id="is-developer-select"
          value={isDeveloper}
          label="Is Developer?"
          onChange={handleIsDeveloperChange}
        >
          <MenuItem value="Yes">Yes</MenuItem>
          <MenuItem value="No">No</MenuItem>
        </Select>
        <FormHelperText>Select if you are a developer</FormHelperText>
      </FormControl>

      {isDeveloper === "Yes" && !loading && (
        <FormControl sx={{ ml: isDesktop ? 2 : 0, minWidth: 120, mt: !isDesktop ? 2 : 0 }}>
          <InputLabel id="developer-type-label">Team</InputLabel>
          <Select
            labelId="developer-type-label"
            id="developer-type-select"
            value={developerType || ""}
            label="Developer Type"
            onChange={handleDeveloperTypeChange}
          >
            {teams.map((team) => (
              <MenuItem key={team.id} value={team.name}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Select your developer type</FormHelperText>
        </FormControl>
      )}
    </div>
  );
}
