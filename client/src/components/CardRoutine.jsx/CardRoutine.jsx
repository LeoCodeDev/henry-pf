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
      await axios.post('/routines/addUserRoutine',{email:user.email, routine:routine.id_routine });
      toast.success('Routine added successfully');
    } catch (error) {
      toast.error('Error adding routine');
    }
  }
   

  return (
    <Card style={{margin:'1em'}}>
      <CardContent>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
        <Link to={`/routines/detail/${routine.id_routine}`} style={{ textDecoration: "none", color:'grey'}}>
        <Typography variant="h5" component="div">
           {routine.name_routine} 
        </Typography>
        </Link>

        <IconButton
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
