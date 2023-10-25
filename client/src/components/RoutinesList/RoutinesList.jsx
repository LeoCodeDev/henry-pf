import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
} from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import CardRoutine from '../CardRoutine.jsx/CardRoutine'
import { NavBar } from '../NavBar/NavBar'
import Grid from '@mui/material/Grid'
import { TrainerProfile } from './TrainerProfile'

export default function RoutineList() {
  const [routines, setRoutines] = useState([])
  const [trainers, setTrainers] = useState([])
  const [selectedTrainer, setSelectedTrainer] = useState(null)

  const sortTrainers = (a, b) => {
    if (a.avgRating < b.avgRating) {
      return 1
    } else if (a.avgRating > b.avgRating) {
      return -1
    } else {
      return b.countRatings - a.countRatings
    }
  }

  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios('/users/getAllTrainers')
        data && setTrainers(data.sort(sortTrainers))
      })()
    } catch (error) {
      console.log(error.message)
    }
  }, [])

  useEffect(() => {
    const fetchRoutines = async () => {
      const { data } = await axios.get('/routines/getAllRoutines')
      data && setRoutines(data)
    }
    fetchRoutines()
  }, [])

  const handleClick = (e) => {
    if (!selectedTrainer || selectedTrainer.id_user !== Number(e.target.id)) {
      return setSelectedTrainer(
        trainers.find((trainer) => Number(e.target.id) === trainer.id_user)
      )
    }
    setSelectedTrainer(null)
  }

  const trainerCollection = trainers.map((trainer) => {
    return (
      <div key={trainer.id_user}>
        <MenuItem>
          <figure
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img
              src={trainer.avatar}
              alt={`${trainer.username} profile picture`}
              id={trainer.id_user}
              onClick={handleClick}
            />
          </figure>
        </MenuItem>
        <SubMenu
          title={`${trainer.username} ⭐ ${trainer.avgRating.toFixed(1)}`}
        >
          <div>
            <button>Suscribe</button>
            <button>Routines</button>
          </div>
        </SubMenu>
      </div>
    )
  })

  return (
    <>
      <NavBar />
      <Grid container xs={10} margin="5em" textAlign="center" spacing={2}>
        <Grid item md={2}>
          <ProSidebar>
            <SidebarHeader>Trainers</SidebarHeader>
            <Menu>{trainerCollection}</Menu>
          </ProSidebar>
        </Grid>
        <Grid container xs={10}>
          <Grid item md={12}>
            {selectedTrainer ? (
              <TrainerProfile selectedTrainer={selectedTrainer} />
            ) : (
              <Grid container md={8} xs={8}>
                {routines.map((routine) => (
                  <Grid item xs={12} sm={6} md={4} key={routine.id_routine}>
                    <CardRoutine routine={routine} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
