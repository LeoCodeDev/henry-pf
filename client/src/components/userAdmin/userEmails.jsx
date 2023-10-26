import { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Chip,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function UserEmails() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [subject, setSubject] = useState("");
  const [sendToAll, setSendToAll] = useState(false);
  const [body, setBody] = useState("");

  const fetchUsers = async () => {
    const { data } = await axios("/users/allUsers");
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserSelection = (event) => {
    setSelectedUsers(event.target.value);
  };

  const handleSendToAll = (event) => {
    setSendToAll(event.target.checked);
    setSelectedUsers([]);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const removeUserHandler = (userToRemove) => {
    setSelectedUsers(selectedUsers.filter((user) => user !== userToRemove));
  };

  const handleSubmit = async () => {
    const dataToSend = {
      to: sendToAll ? users : selectedUsers,
      subject,
      text: body,
    };
    try {
      await axios.post("/dashboard/emailSender", dataToSend);
      toast.success("Email sent successfully");
      setSelectedUsers([]);
      setSendToAll(false);
      setSubject("");
      setBody("");
    } catch (error) {
      toast.error("Error sending email");
    }
  };
  

  return (
    <div
      style={{
        width: "75vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "auto",
        padding: "20px",
        border: "1px solid #000",
        borderRadius: "5px",
        gap: "1em",
        backgroundColor: "#1E1E1E",
      }}
    >
      <Typography sx={{fontSize: '1.5rem'}}>Send Email</Typography>
      <FormControl fullWidth>
        {sendToAll ? null : (
          <>
            <InputLabel>Select Users</InputLabel>
            <Select
              sx={{
                fieldset: { borderColor: "#fff" },
                padding: "0px",
                "& .MuiSelect-select": { color: "#fff" },
              }}
              multiple
              value={selectedUsers}
              onChange={handleUserSelection}
              renderValue={(selected) => selected.join(", ")}
            >
              {users.map((user) => (
                <MenuItem key={user.user_id} value={user.email}>
                  {user.first_name} {user.last_name}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            sx={{
              color: "#228d07",
              "&.Mui-checked": {
                color: "#228d07",
              },
            }}
            checked={sendToAll}
            onChange={handleSendToAll}
          />
        }
        label="Send to all users"
      />

      <TextField
        sx={{
          label: { color: "#fff" },
          fieldset: { borderColor: "#fff" },
        }}
        label="Subject"
        fullWidth
        variant="outlined"
        value={subject}
        onChange={handleSubjectChange}
      />

      <TextField
        sx={{
          label: { color: "#fff" },
          fieldset: { borderColor: "#fff" },
        }}
        label="Body"
        fullWidth
        variant="outlined"
        
        multiline
        rows={4}
        value={body}
        onChange={handleBodyChange}
      />
      <div>
        <Typography variant="h6">Selected Users:</Typography>
        {sendToAll
          ? "All users"
          : selectedUsers?.map((user) => (
              <Chip
                key={user}
                label={user}
                onDelete={() => removeUserHandler(user)}
                style={{ margin: "4px", color: "#fff" }}
              />
            ))}
      </div>

      <Button
        variant="contained"
        sx={{
          margin: "1rem",
          size: "large",
          backgroundColor: "#539a07",
          ":hover": {
            bgcolor: "#228d07",
          },
        }}
        onClick={handleSubmit}
      >
        Send Email
      </Button>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
