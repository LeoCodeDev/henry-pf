import axios  from 'axios';
import { useEffect, useState } from "react";
import CardRoutine from "../CardRoutine.jsx/CardRoutine";
import { NavBar } from '../NavBar/NavBar';
import Grid from '@mui/material/Grid';
import { useAuthStore } from '../../store/authStore';

export default function RoutineList(){
  const [routines, setRoutines] = useState([])
  
  const {user}=useAuthStore();

    const fetchRoutines=async ()=>{
      const { data } = await axios.get('/routines/getAllRoutines')
      console.log(data);
        setRoutines(data)
  }
  
  const getRoutineUser = async () => {
    const routine = await axios.get(`routines/getUserRoutines?email=${user.email}`,)
    console.log(routine);
  }

    useEffect(()=>{
      getRoutineUser()
      fetchRoutines()
    },[])

    return(
        <>
        <NavBar/>
        <Grid 
        container
        xs={10}
        margin="5em"
        textAlign="center"
        spacing={2}>
      {routines.map((routine) => (
        <Grid item xs={12} sm={6} md={4} key={routine.id_routine}>
          <CardRoutine routine={routine} />
        </Grid>
      ))}
    </Grid>
      </>
    )

}

