
import CardRoutine from '../../components/CardRoutine.jsx/CardRoutine';
import {AppBar, Tabs, Tab,Typography, Box} from '@mui/material'
import { useState } from 'react';

export function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
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
          {routines.map((routine)=>(
              <CardRoutine routine={routine} key={routine.id_routine}/>
          ))}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography>Sales Content</Typography>
          {sales.map((sale)=>(
              <lu>
              <li>Date: {sale.date}</li>
              <li>Total: {sale.total}</li>
              <li>Products: {sale.Products?.map((product)=>(
                  <Typography>{product.name}</Typography>
              ))}
              </li>
              </lu>
          ))}
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography>Calendar</Typography>
          {/* <Calendar/> */}
        </TabPanel>
      </div>
    );
  }