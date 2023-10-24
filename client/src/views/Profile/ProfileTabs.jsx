import Calendar from '../../components/Calendar/Calendar';
import {AppBar, Tabs, Tab,Typography, Box, Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,} from '@mui/material'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';

export function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const { user } = useAuthStore()
  
  const fetchRoutinesUser = async () => {
    const routine = await axios.get(`routines/getUserRoutines?email=${user.email}`)
    console.log(routine);
    return routine
  }
  useEffect(() => {
    fetchRoutinesUser()
  }, []);

    useEffect(() => {
      // Redibujar el calendario cuando se muestra la pestaña del calendario
      const calendar = document.querySelector('.fc');
      if (calendar && value === 2) {
        window.dispatchEvent(new Event('resize'));
      }
    }, [value]);
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }
  
  export function ProfileTabs({sales, routines}) {
    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Routines" />
            <Tab label="Sales" />
            <Tab label="Calendar" />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Typography>Routines Content</Typography>
          <div style={{margin:'1em'}}>

          {routines.map((routine)=>(
                  <Card
                  style={{margin:'1em'}}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        🏋️‍♂️ {routine.name_routine}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        👤 Author username: {routine.author}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        🏆 Puntuation: {routine.puntuation || "N/A"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        🏋️‍♂️ Exercises: {routine?.Exercises.length}
                      </Typography>
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography variant="subtitle1">Exercises</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {routine.Exercises.map((exercise) => (
                            <div key={exercise.id_exercise}>
                              <Typography variant="h6">{exercise.name}</Typography>
                              <Typography variant="body2">Type: {exercise.type}</Typography>
                              <Typography variant="body2">
                                Muscle: {exercise.muscle}
                              </Typography>
                              <Typography variant="body2">
                                Difficulty: {exercise.difficulty}
                              </Typography>
                              <Typography variant="body2">
                                Description: {exercise.description}
                              </Typography>
                              <hr />
                            </div>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    </CardContent>
                  </Card>
          ))}
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography>Sales Content</Typography>
          {sales.map((sale, index) => (
            <div key={index} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '8px', marginBottom: '16px' }}>
              <ul style={{ listStyleType: 'none', padding: '0' }}>
                <li>Date: {sale.date}</li>
                <li>Total: {sale.total}</li>
                <li>Products: 
                  <ul style={{ listStyleType: 'none', padding: '0' }}>
                    {sale.Products?.map((product, index) => (
                      <li key={index}>{product.name}</li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>))}
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography>Calendar</Typography>
          <div>
          <Calendar/>
          </div>
        </TabPanel>
      </div>
    );
  }