import axios from "axios";
import  { useState, useEffect } from "react";
import { NavBar } from '../NavBar/NavBar';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid"
import { useAuthStore } from "../../store/authStore";



export default function Calendar(){
    const {user} = useAuthStore()
    const [allRoutine , setAllRoutine] = useState([])
    const [events , setEvents] = useState([])
    // const [loading , setLoading] = useState(true)
      // { title: "Rutina mamalona ", date: "2023-10-21" ,hour:"13:30:00" },
    // { title: "Brazos nucleares mata gorilas", date: "2023-10-30", hour: "13:30:00" },
    // { title: "Brazos nucleares mata gorilas", date: "2023-10-23", "07:30:00" }
 
   

    //  const fechRoutine = async () => {
    //     const {data} = await axios.get(`/routines/getUserRoutines?email=${user.email}`)
    //     console.log(data)
    //     setAllRoutine(data)
    //     setLoading(false)
    //  }

     useEffect(() => {
        const fechRoutine = async () => {
            const { data } = await axios.get(`/routines/getUserRoutines?email=${user.email}`);
            setAllRoutine(data);
        };
    
        fechRoutine(); // Llama a la función para obtener las rutinas.
    
        // Este useEffect se ejecutará cada vez que allRoutine se actualice.
    }, [user]);
    
    useEffect(() => {
        // Esta función se ejecutará cuando allRoutine cambie.
        setEvents(
            allRoutine.reduce((result, item) => {
                const { name_routine, Routines_users: { date } } = item;
                return result.concat(date.map(d => ({
                    title: name_routine,
                    date: d.Date,
                    hour: d.hour
                })));
            }, [])
        );
    }, [allRoutine]);
    
    // if(allRoutine.length>0){
    //     setEvents(allRoutine.filter(routine=>routine.status==="active"))
    // }

    return(
        // loading ? <h1>Cargando...</h1> :
        <>
          <NavBar/>
          <div style={{ marginTop:'5em'}}><FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
          headerToolbar={
            {
            start: 'timeGridDay,dayGridMonth', // will normally be on the left. if RTL, will be on the right
            center: 'title',
            end: 'today prev,next' // will normally be on the right. if RTL, will be on the left
             }
        }
      
      events={events}
      editable={true}
      droppable={true}
    //   eventDrop={handleEventDrop}
    /></div>
          
        </>
    )

}