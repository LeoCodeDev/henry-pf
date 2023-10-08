import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export default function AvatarSelection(props) {
  const { avatars, onChange, isDesktop} = props;
  const [selectedValue, setSelectedValue] = useState("");

  const handleAvatarChange = (event) => {
    onChange(event.target.value);
    setSelectedValue(event.target.value);
  };

  return (
    <div style={{marginRight:"auto", marginLeft: isDesktop ? "1rem" : "0"}}>
      <FormControl sx={{ minWidth: isDesktop ? "15vw" : "60vw", marginTop: isDesktop ? "0" : "4vh" }}>
        <InputLabel id="avatar-label">Select Avatar</InputLabel>
        <Select
          labelId="avatar-label"
          value={selectedValue}
          label="Select Avatar"
          onChange={handleAvatarChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {avatars.map((avatar, index) => {
            return (
              <MenuItem key={index} value={avatar.src}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={avatar.src}
                    alt={avatar.label}
                    style={{
                      width: 50,
                      height: 50,
                      marginLeft: 5,
                      padding: 0,
                      marginRight: 40,
                      borderRadius: 50,
                    }}
                  />
                  <span>{avatar.label}</span>
                </div>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
