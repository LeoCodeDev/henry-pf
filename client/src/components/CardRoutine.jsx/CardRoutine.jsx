import { Card, CardContent, Typography} from '@mui/material';
import { Link } from 'react-router-dom';


const CardRoutine = ({ routine }) => {
  return (
    <Card>
      <CardContent>
        <Link to={`/routines/detail/${routine.id_routine}`} style={{ textDecoration: "none", color:'grey'}}>
        <Typography variant="h5" component="div">
           {routine.name_routine} 
        </Typography>
        </Link>
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
    </Card>
  );
};

export default CardRoutine;
