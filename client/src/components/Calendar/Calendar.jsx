import axios from "axios";
import { useState, useEffect } from "react";
import { NavBar } from "../NavBar/NavBar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useAuthStore } from "../../store/authStore";

export default function Calendar() {
  const { user } = useAuthStore();
  const [allRoutine, setAllRoutine] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fechRoutine = async () => {
      const { data } = await axios.get(
        `/routines/getUserRoutines?email=${user.email}`
      );
      setAllRoutine(data);
    };

    fechRoutine();
  }, [user]);

  useEffect(() => {
    setEvents(
      allRoutine.reduce((result, item) => {
        const {
          name_routine,
          id_routine,
          Routines_users: { date },
        } = item;
        return result.concat(
          date.map((d) => ({
            id: id_routine,
            title: name_routine,
            date: `${d.Date}T${d.hour}`,
            dateOnly :d.Date,
            hourOnly:d.hour
          }))
        );
      }, [])
    );
  }, [allRoutine]);

  const handleEventDrop = async (info) => {
    console.log(info)
    console.log( info.event._instance.range.start)
    const { id_user } = user;
    const  id_routine  = info.event._def.publicId;
    const {dateOnly} =info.event._def.extendedProps
    const {hourOnly} =info.event._def.extendedProps
    const GMT = info.oldEvent._instance.range.start.toTimeString().match(/GMT([+-]\d+)/)[1];
    const initialDate = info.oldEvent._instance.range.start
      .toISOString()
      .split("T")[0];
    const newDate = info.event._instance.range.start
      .toISOString()
      .split("T")[0];

      const timeOffset = info.oldEvent._instance.range.start.getTimezoneOffset();

    // Formatea la hora en 24 horas con minutos y segundos
    const initialHour = new Date(
      info.oldEvent._instance.range.start
    ).toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const newHour = new Date(
      info.event._instance.range.start
    ).toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const initialHourDate = new Date(`2023-10-24T${initialHour}`);

    // Agrega o resta la diferencia de tiempo en minutos a newHour
    initialHourDate.setMinutes(initialHourDate.getMinutes() + timeOffset);
    const newHourAdjusted = initialHourDate.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    // const data = {
    //   idUser: id_user,
    //   idRoutine: id_routine,
    //   originDate: initialDate,
    //   originHour: initialHour,
    //   newDate: newDate,
    //   newHour: newHour,
    // };

    // console.log(data);
    console.log({id_user, id_routine, initialDate, initialHour, newDate, newHour,dateOnly, hourOnly,GMT, newHourAdjusted});

    try {
      const response = await axios.put("/routines/putUserRoutineNewDate", {
        idUser: id_user,
        idRoutine: id_routine,
        originDate: initialDate,
        originHour: hourOnly,
        newDate: newDate,
        newHour: newHourAdjusted,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavBar />
      <div style={{ marginTop: "5em" }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          timeZone="UTC"
          headerToolbar={{
            start: "timeGridDay,dayGridMonth",
            center: "title",
            end: "today prev,next",
          }}
          events={events}
          editable={true}
          droppable={true}
          eventDrop={handleEventDrop}
        />
      </div>
    </>
  );
}
