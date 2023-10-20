import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

export default function SelectLabels(props) {
  const {
    isDeveloper,
    developerType,
    onIsDeveloperChange,
    onDeveloperTypeChange,
    isDesktop,
  } = props;

  const [teams, setTeams] = useState([]);

  const handleIsDeveloperChange = (event) => {
    const value = event.target.value;
    onIsDeveloperChange(value);
  };

  const handleDeveloperTypeChange = (event) => {
    const value = event.target.value;
    onDeveloperTypeChange(value);
  };

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

      {isDeveloper === "Yes" && (
        <FormControl sx={{ ml: isDesktop ? 2 : 0, minWidth: 120 }}>
          <InputLabel id="developer-type-label">Team</InputLabel>
          <Select
            labelId="developer-type-label"
            id="developer-type-select"
            value={developerType || ""}
            label="Developer Type"
            onChange={handleDeveloperTypeChange}
          >
            {teams.map((team) => (
              <MenuItem key={team.id_team} value={team.name}>
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
