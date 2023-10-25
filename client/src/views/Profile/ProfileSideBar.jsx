import {List, ListItem, ListItemText, Avatar, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

    
    export default function ProfileSidebar({user, onEditProfileClick}) {

    
      return (
        <div style={{ width: '20em', padding: '1em', gap:'2em', height:'100%'}}>
          <Avatar alt="User Avatar" src={user.avatar} style={{ marginBottom: '10px', width:'55%', height:'50%' }} />
          <List>
            <ListItem style={{color:'white'}}>
              <ListItemText primary={user.username}  />
              <IconButton style={{ color: 'green' }} onClick={onEditProfileClick}>
                <EditIcon />
              </IconButton>
            </ListItem>
            <ListItem>
              <ListItemText primary={user.email}/>
            </ListItem>
            <ListItem > {/* Apply inline style */}
              <ListItemText primary={`Team: ${user.teamName}`} />
            </ListItem>
            <ListItem > {/* Apply inline style */}
              <ListItemText primary={`Role: ${user.role}`} />
            </ListItem>
          </List>
        </div>
      );
    }