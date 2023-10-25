import { Grid } from "@mui/material"
import CardRoutine from "../CardRoutine.jsx/CardRoutine"

const TrainerProfile = ({selectedTrainer}) => {
  return (
    <Grid item xs={12} md={8}>
        <div style={{ textAlign: 'center' }}>
          <h3>{selectedTrainer.userName}</h3>
          <img
            src={selectedTrainer.avatar}
            alt={`${selectedTrainer.userName} profile picture`}
            style={{ width: '100px', height: '100px' }}
          />
          <div style={{ textAlign: 'left' }}>
            <p>
              Puntuación: {selectedTrainer.rating}
            </p>
            {/* <p>
              Comentarios: {selectedTrainer.comments.length}
            </p> */}
          </div>
        </div>
        <Grid container spacing={2}>
          {selectedTrainer.routines.map((routine) => (
            <Grid item xs={12} sm={6} md={4} key={routine.id_routine}>
              <CardRoutine routine={routine} />
            </Grid>
          ))}
        </Grid>
      </Grid>
  )
}

export {TrainerProfile}
