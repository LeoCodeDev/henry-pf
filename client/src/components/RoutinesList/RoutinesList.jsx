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

//Data Hardcodeada para ejemplos (Mocks)
const mockedData = [
  {
    id: 1,
    avatar:
      'https://previews.123rf.com/images/blankstock/blankstock1903/blankstock190302593/124721850-icono-de-l%C3%ADnea-de-usuario-signo-de-avatar-de-perfil-s%C3%ADmbolo-de-silueta-de-persona-formas.jpg',
    userName: 'JohnDoe',
    rating: 4,
    routines: [
      {
        name_routine: 'Routine Name',
        author: 'XXXXXXXX',
        description:
          'lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. In hac habitasse platea dictumst. Phasellus eget vulputate dui. Praesent nec nisl auctor, fringilla leo at',
        id_routine: 1,
        puntuation: 4,
        Exercises: ['uno'],
      },
    ],
  },
  {
    id: 2,
    avatar:
      'https://previews.123rf.com/images/blankstock/blankstock1903/blankstock190302593/124721850-icono-de-l%C3%ADnea-de-usuario-signo-de-avatar-de-perfil-s%C3%ADmbolo-de-silueta-de-persona-formas.jpg',
    userName: 'JohnDoe2',
    rating: 4,
    routines: [
      {
        name_routine: 'Routine Name',
        author: 'XXXXXXXX',
        description:
          'lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. In hac habitasse platea dictumst. Phasellus eget vulputate dui. Praesent nec nisl auctor, fringilla leo at',
        id_routine: 1,
        puntuation: 4,
        Exercises: ['uno'],
      },
    ],
  },
  {
    id: 3,
    avatar:
      'https://previews.123rf.com/images/blankstock/blankstock1903/blankstock190302593/124721850-icono-de-l%C3%ADnea-de-usuario-signo-de-avatar-de-perfil-s%C3%ADmbolo-de-silueta-de-persona-formas.jpg',
    userName: 'JohnDoe',
    rating: 4,
    routines: [
      {
        name_routine: 'Routine Name',
        author: 'XXXXXXXX',
        description:
          'lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. In hac habitasse platea dictumst. Phasellus eget vulputate dui. Praesent nec nisl auctor, fringilla leo at',
        id_routine: 1,
        puntuation: 4,
        Exercises: ['uno'],
      },
    ],
  },
  {
    id: 4,
    avatar:
      'https://previews.123rf.com/images/blankstock/blankstock1903/blankstock190302593/124721850-icono-de-l%C3%ADnea-de-usuario-signo-de-avatar-de-perfil-s%C3%ADmbolo-de-silueta-de-persona-formas.jpg',
    userName: 'JohnDoe',
    rating: 4,
    routines: [
      {
        name_routine: 'Routine Name',
        author: 'XXXXXXXX',
        description:
          'lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. In hac habitasse platea dictumst. Phasellus eget vulputate dui. Praesent nec nisl auctor, fringilla leo at',
        id_routine: 1,
        puntuation: 4,
        Exercises: ['uno'],
      },
    ],
  },
  {
    id: 5,
    avatar:
      'https://previews.123rf.com/images/blankstock/blankstock1903/blankstock190302593/124721850-icono-de-l%C3%ADnea-de-usuario-signo-de-avatar-de-perfil-s%C3%ADmbolo-de-silueta-de-persona-formas.jpg',
    userName: 'JohnDoe',
    rating: 4,
    routines: [
      {
        name_routine: 'Routine Name',
        author: 'XXXXXXXX',
        description:
          'lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. In hac habitasse platea dictumst. Phasellus eget vulputate dui. Praesent nec nisl auctor, fringilla leo at',
        id_routine: 1,
        puntuation: 4,
        Exercises: ['uno'],
      },
    ],
  },
]

export default function RoutineList() {
  const [routines, setRoutines] = useState([])
  const [selectedTrainer, setSelectedTrainer] = useState(null)

  useEffect(() => {
    const fetchRoutines = async () => {
      const { data } = await axios.get('/routines/getAllRoutines')
      setRoutines(data)
    }
    fetchRoutines()
  }, [])

  const handleClick = (e) => {
    if (!selectedTrainer || selectedTrainer.id !== Number(e.target.id))
      return setSelectedTrainer(
        mockedData.find((trainer) => Number(e.target.id) === trainer.id)
      )
    setSelectedTrainer(null)
  }

  const trainerCollection = mockedData.map((trainer) => {
    return (
      <div key={trainer.id}>
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
              alt={`${trainer.userName} profile picture`}
              id={trainer.id}
              onClick={handleClick}
            />
          </figure>
        </MenuItem>
        <SubMenu title={trainer.userName}>
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
