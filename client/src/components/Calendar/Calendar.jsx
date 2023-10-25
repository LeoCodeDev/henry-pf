import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { NavBar } from "../NavBar/NavBar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useAuthStore } from "../../store/authStore";
import styles from "./Calendar.module.css";

export default function Calendar() {
  const { user } = useAuthStore();
  const [allRoutine, setAllRoutine] = useState([]);
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fechRoutine = async () => {
    const { data } = await axios.get(
      `/routines/getUserRoutines?email=${user.email}`
    );
    setAllRoutine(data);
  };
  useEffect(() => {
    fechRoutine();
  }, []);

  useEffect(() => {
    let findEvent = false;
    if(allRoutine.length > 0){
      findEvent = allRoutine.some(routine => routine.Routines_users.date !== null)
    }
    console.log(findEvent)
    if (allRoutine.length > 0 && findEvent) {
      setEvents(
        allRoutine.reduce((result, item) => {
          const {
            name_routine,
            id_routine,
            Routines_users: { date },
          } = item;
          return result.concat(
            date
              ? date.map((d) => ({
                  id: `${id_routine}-${d.Date}-${d.hour}`,
                  idEstandar: id_routine,
                  title: name_routine,
                  date: `${d.Date}T${d.hour}`,
                  dateOnly: d.Date,
                  hourOnly: d.hour,
                  description: name_routine,
                  complete: d.complete
                }))
              : []
          );
        }, [])
      );
    } else setEvents([]);
    console.log({events , allRoutine});
  }, [allRoutine]);

  useEffect(() => {
    // Redibujar el calendario al cargar el componente
    const calendar = document.querySelector('.fc');
    if (calendar) {
      window.dispatchEvent(new Event('resize'));
    }

    // Redibujar el calendario cuando cambia el tamaño de la pantalla
    const handleResize = () => {
      if (calendar) {
        window.dispatchEvent(new Event('resize'));
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const checked = useRef();

  useEffect(() => {
    const closeMenuOnOutsideClick = (e) => {
      if (checked.current && !checked.current.contains(e.target)) {
        setIsModalOpen(false);
      }
    };
     document.addEventListener("mousedown", closeMenuOnOutsideClick);
    

    // Limpieza del efecto cuando el componente se desmonta
    return () => {
      document.removeEventListener("mousedown", closeMenuOnOutsideClick);
    };
  }, []);

  const handleEventDrop = async (info) => {

    const { id_user } = user;
    const id_routine = info.event._def.extendedProps.idEstandar;
    const { hourOnly } = info.event._def.extendedProps;
    const initialDate = info.oldEvent._instance.range.start
      .toISOString()
      .split("T")[0];
    const newDate = info.event._instance.range.start
      .toISOString()
      .split("T")[0];
    const timeOffset = info.oldEvent._instance.range.start.getTimezoneOffset();
    const initialHour = new Date(
      info.oldEvent._instance.range.start
    ).toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const initialHourDate = new Date(`2023-10-24T${initialHour}`);
    initialHourDate.setMinutes(initialHourDate.getMinutes() + timeOffset);
    const newHourAdjusted = initialHourDate.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

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

  const handleEventClick = (info) => {
    const event = info.event;
    const extendedProps = event.extendedProps;
    setSelectedEvent(extendedProps);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEventDidMount = (info) => {
    const event = info.event;
    const extendedProps = event.extendedProps;

    // Crear un elemento de tooltip
    const tooltip = document.createElement("div");
    tooltip.className = styles.tooltip; // Aplica los estilos CSS Modules
    tooltip.textContent = extendedProps.description;

    // Agrega el tooltip al evento en el DOM
    info.el.appendChild(tooltip);

    // Manejar el evento hover
    info.el.addEventListener("mouseover", () => {
      tooltip.style.visibility = "visible";
      tooltip.style.opacity = 1;
    });

    info.el.addEventListener("mouseout", () => {
      tooltip.style.visibility = "hidden";
      tooltip.style.opacity = 0;
    });
  };

  const handleCheckedRoutine = async(event, selectEvent) => {
    const checked = event.target.checked;
  setSelectedEvent({
    ...selectEvent,
    complete: checked,
  });

    const peticion  = await axios.put(`/routines/putUserRoutineCheck`, {
      idUser: user.id_user,
      idRoutine: selectEvent.idEstandar,
      Date: selectEvent.dateOnly,
      hour: selectEvent.hourOnly,
    });
    console.log({peticion, event,selectEvent})
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
          eventClick={handleEventClick}
          eventDidMount={handleEventDidMount}
        />
      </div>
      {isModalOpen && selectedEvent && (
        <div className={styles.modalBackground} ref={checked} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedEvent.description}</h2>
            <h4>Day : {selectedEvent.dateOnly}</h4>
            <h4>Hour : {selectedEvent.hourOnly}</h4>
            <label>
              <input
                type="checkbox"
                checked={selectedEvent.complete}
                onChange={() => handleCheckedRoutine(event, selectedEvent)}
              />
              Complet
            </label>
          </div>
        </div>
      )}
    </>
  );
}
