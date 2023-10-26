import { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import CardRoutine from '../CardRoutine.jsx/CardRoutine'
import axios from 'axios'

const TrainerProfile = ({ selectedTrainer }) => {
  const [routines, setRoutines] = useState([])
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios(
          `/users/getTrainerRoutines?trainer_id=${selectedTrainer.id_user}`
        )
        setRoutines(data)
      })()
    } catch (error) {
      console.log(error.message)
    }
  }, [selectedTrainer])

  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios(
          `/users/getTrainerReview?trainer_id=${selectedTrainer.id_user}`
        )
        setReviews(data)
      })()
    } catch (error) {
      console.log(error.message)
    }
  }, [selectedTrainer])
  
  console.log(reviews);
  return (
    <Grid sx={{marginLeft:'10rem'}} item xs={12} md={8}>
      <div style={{ textAlign: 'center', marginLeft:'10rem' }}>
        <h3>{selectedTrainer.userName}</h3>
        <img
          src={selectedTrainer.avatar}
          alt={`${selectedTrainer.username} profile picture`}
          style={{ width: '100px', height: '100px' }}
        />
        <div style={{ textAlign: 'left' }}>
          <p>Puntuación: {`⭐ ${selectedTrainer.avgRating.toFixed(1)}`}</p>
          <div>
            <button>Suscribe</button>
          </div>
          {/* Benja aqui puedes poner los comentarios en acordion? */}
        </div>
      </div>
      <Grid container spacing={2}>
        {routines.map((routine) => (
          <Grid item xs={12} sm={6} md={4} key={routine.id_routine}>
            <CardRoutine routine={routine} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export { TrainerProfile }
