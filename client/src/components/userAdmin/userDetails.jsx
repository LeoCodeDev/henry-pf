import  axios  from 'axios';
import { useState } from 'react';
import { Avatar, Paper, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast, {Toaster} from 'react-hot-toast';

const UserDetails = () => {
    const [user, setUser]= useState({})
    const {email}= useParams()
    const [loading, setLoading]= useState(false)
    
    const getUser=async()=>{
        setLoading(true)
        const {data}= await axios.get(`/users/getUser?email=${email}`)
        setUser(data)
        setLoading(false)
    }

    const toggleAdmin=async(id_user, role)=>{
      setLoading(true)
      try {
        await axios.put(`/users/manageUser?id_user=${id_user}`, {role})
        getUser()
        setLoading(false) 
        toast.success('User updated successfully')      
      } catch (error) {
        setLoading(false)
        toast.error(error.message)
      }
    }  
    
    useEffect(()=>{
        getUser()
    }, [])
  return (
    loading ? <h1>Loading...</h1> :
    <Paper style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <Avatar alt={user.username} src={user.avatar} style={{ width: '150px', height: '150px', margin: 'auto' }} />
      <Typography variant="h5" align="center" gutterBottom>
        {`${user.first_name} ${user.last_name}`}
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        {`Username: ${user.username}`}
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        {`Email: ${user.email} 
        Role: ${user.role}
         Team:${user.team}`}
      </Typography>

      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Sales
      </Typography>
      <List>
        {user.Sales && user.Sales.map((sale) => (
        <ListItem key={sale.id_sale}>
            <div>
            <Typography variant="subtitle1">
                Total Amount: {sale.total}
            </Typography>
            <Typography variant="body2">
                Products: {sale.Products.map((product) => product.name).join(', ')}
            </Typography>
            <Typography variant="body2">
                Date: {sale.date}
            </Typography>
            </div>
    </ListItem>
        ))}
      </List>

      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Routines
      </Typography>
      <List>
        {user.Routines && user.Routines.map((routine) => (
          <ListItem key={routine.id_routine}>
            <ListItemText
              primary={`Name: ${routine.name}`}
              secondary={`Description: ${routine.description}`}
            />
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        sx={{size: 'large', backgroundColor: '#010402' }}
        styles={{margin: '1rem'}}
        onClick={()=>toggleAdmin(user.id_user, user.role)}
      >
        {user.role==='Admin'? 'Remove admin permissions' : 'Make user admin'}
      </Button>
      <Toaster position="top-center" reverseOrder={false} />
    </Paper>
  );
};

export default UserDetails;
