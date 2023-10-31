import { Card, CardContent, Typography, IconButton} from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useAuthStore } from '../../store/authStore';
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';

const CardRoutine = ({ routine }) => {
  const {user}=useAuthStore();  

  const addUserRoutine=async()=>{
    try {
      if(!user.email) return toast.error('"Guest" users can\'t add routines. Please Login.')
      await axios.post('/routines/addUserRoutine',{email:user.email, routine:routine.id_routine });
      toast.success('Routine added successfully');
    } catch (error) {
      toast.error('Error adding routine');
    }
  }

  return (
    <Card style={{margin:'.5em', padding: '0 1rem', position:'relative'}}>
      <CardContent>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
        <Link to={`/routines/detail/${routine.id_routine}`} style={{ textDecoration: "none", color:'grey'}}>
        <Typography color='primary' sx={{fontSize: '1.1rem', marginBottom: '0.5rem'}} variant="h6">
          {routine.name_routine} 
        </Typography>
        </Link>

          <IconButton
            sx={{position: 'absolute', top:'0', right: '0'}}
        onClick={() =>addUserRoutine()}
        >
          <AddIcon/>
        </IconButton>
        </div>
        <Typography variant="body2" color="text.secondary">
        👤 Author: {routine.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        🏆 Puntuation: {routine.puntuation}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        🏋️‍♂️ Exercises: {routine.Exercises.length}
        </Typography>
      </CardContent>
      <Toaster position="top-center" reverseOrder={false} />
    </Card>
  );
};

export default CardRoutine;
