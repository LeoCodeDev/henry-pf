import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from 'axios';
///getTeams

export default function SelectLabels(props) {
  const {
    isDeveloper,
    developerType,
    onIsDeveloperChange,
    onDeveloperTypeChange,
    isDesktop,
  } = props;

  const handleIsDeveloperChange = (event) => {
    const value = event.target.value;
    onIsDeveloperChange(value);
  };

  const handleDeveloperTypeChange = (event) => {
    const value = event.target.value;
    onDeveloperTypeChange(value);
  };

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
        <FormControl sx={{ ml: isDesktop ? 2 : 0, minWidth: 120, mt: !isDesktop ? 2 : 0 }}>
          <InputLabel id="developer-type-label">Team</InputLabel>
          <Select
            labelId="developer-type-label"
            id="developer-type-select"
            value={developerType || ""}
            label="Developer Type"
            onChange={handleDeveloperTypeChange}
          >
            <MenuItem value="FullStack">FullStack</MenuItem>
            <MenuItem value="BackEnd">BackEnd</MenuItem>
            <MenuItem value="FrontEnd">FrontEnd</MenuItem>
            <MenuItem value="DataScience">DataScience</MenuItem>
            <MenuItem value="MobileApp">Mobile App Dev</MenuItem>
            <MenuItem value="GameDev">Game Developer</MenuItem>
            <MenuItem value="DevOps">DevOps Engineer</MenuItem>
            <MenuItem value="AI">AI/ML Engineer</MenuItem>
          </Select>
          <FormHelperText>Select your developer type</FormHelperText>
        </FormControl>
      )}
    </div>
  );
}
