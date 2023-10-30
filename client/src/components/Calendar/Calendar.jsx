import axios from "axios";
import { useState, useEffect, useRef } from "react";
import {
  Typography,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  FormControl,
  Button,
  ToggleButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useAuthStore } from "../../store/authStore";
import styles from "./Calendar.module.css";
import ReusableModal from "../ReusableModal/ReusableModal";

export default function Calendar({ routines }) {
  const { user } = useAuthStore();
  const [allRoutine, setAllRoutine] = useState([]);
  const [events, setEvents] = useState([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [Hour, setHour] = useState("");
  const [Fecha, setFecha] = useState("");
  const [send, setSend] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Days, setDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  function getDatesForSelectedDaysInMonth(weekDays, year, month) {
    const selectedDays = Object.keys(weekDays).filter((day) => weekDays[day]);
    const datesOfTheMonth = [];

    for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
      const currentDate = new Date(year, month, day);
      const dayName = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ][currentDate.getDay()];

      if (selectedDays.includes(dayName)) {
        datesOfTheMonth.push(new Date(year, month, day));
      }
    }

    const dayOfTheMonth = datesOfTheMonth.map(
      (day) => day.toISOString().split("T")[0]
    );
    return dayOfTheMonth;
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fechRoutine = async () => {
    if(user.email === '') return
    const { data } = await axios.get(
      `/routines/getUserRoutines?email=${user.email}`
    );
    setAllRoutine(data);
  };
  useEffect(() => {
    fechRoutine();
  }, [user, send]);

  useEffect(() => {
    let findEvent = false;
    if (allRoutine.length > 0) {
      findEvent = allRoutine.some(
        (routine) => routine.Routines_users.date !== null
      );
    }
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
                  complete: d.complete,
                  color : d.complete ? "green" : "red"
                }))
              : []
          );
        }, [])
      );
    } else setEvents([]);
  }, [allRoutine]);

  useEffect(() => {
    // Redibujar el calendario al cargar el componente
    const calendar = document.querySelector(".fc");
    if (calendar) {
      window.dispatchEvent(new Event("resize"));
    }
    // Redibujar el calendario cuando cambia el tamaño de la pantalla
    const handleResize = () => {
      if (calendar) {
        window.dispatchEvent(new Event("resize"));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
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
      await axios.put("/routines/putUserRoutineNewDate", {
        idUser: id_user,
        idRoutine: id_routine,
        originDate: initialDate,
        originHour: hourOnly,
        newDate: newDate,
        newHour: newHourAdjusted,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEventClick = (info) => {
    const event = info.event;
    const extendedProps = event.extendedProps;
    setSelectedEvent(extendedProps);
    setIsModalOpen(true);
    setSelectedRoutine(
      routines.find(
        (routine) => routine.id_routine === extendedProps.idEstandar
      )
    );
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

  const handleCheckedRoutine = async (event, selectEvent) => {
    const checked = event.target.checked;
    setSelectedEvent({
      ...selectEvent,
      complete: checked,
    });

    await axios.put(`/routines/putUserRoutineCheck`, {
      idUser: user.id_user,
      idRoutine: selectEvent.idEstandar,
      Date: selectEvent.dateOnly,
      hour: selectEvent.hourOnly,
    });
    setSend(send ? false : true);

  };
  const secondSubmit = async (days, routine) => {
    console.log({ aviso: "estoy entrando" });
    const { id_user } = user;
    const id_routine = routine.id_routine;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const selectedDates = getDatesForSelectedDaysInMonth(
      days,
      currentYear,
      currentMonth
    );
    await axios.put("/routines/putUserRoutineDateMonth", {
      idUser: id_user,
      idRoutine: id_routine,
      Dates: selectedDates,
      Hour: Hour ? Hour : null
    });
    setSend(send ? false : true);
    setDays({
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false,
    });
  };

  const handleSubmit = async (event, routine) => {
    event.preventDefault();
    const hasTrueValue = Object.values(Days).includes(true);
    console.log(hasTrueValue);
    if (hasTrueValue) {
      await secondSubmit(Days, routine);
      return;
    } else {
      const { id_user } = user;
      const id_routine = routine.id_routine;

      await axios.put("/routines/putUserRoutineDate", {
        idUser: id_user,
        idRoutine: id_routine,
        Date: Fecha,
        hour: Hour,
      });
    }
    setSend(send ? false : true);
  };

  const handleRemove = async ( selectEvent) => {
    console.log(selectEvent);
    const { id_user } = user;
    const id_routine = selectEvent.idEstandar;
    const Date = selectEvent.dateOnly;
    const hour = selectEvent.hourOnly;

    await axios.put("/routines/deleteDateRoutine", {
      idUser: id_user,
      idRoutine: id_routine,
      day: Date,
      Hour: hour,
    });

    setSend(send ? false : true);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.lateral_scroll_container}>
        <div className={styles.lateralScroll}>
          {routines.map((routine) => (
            <div>
            <Card style={{ margin: "1em" }} key={routine.id}>
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
                    <Typography variant="subtitle1">
                      schedule routine :{" "}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormControl>
                    <Typography variant="subtitle1" >
                      schedule routine in a singel day:{" "}
                    </Typography>
                      <TextField
                        label="Hora 24H"
                        type="time"
                        value={Hour}
                        // style={{ marginTop: '1rem' }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => setHour(`${e.target.value}:00`)}
                      />
                      <TextField
                        label="Fecha"
                        type="date"
                        style={{ marginTop: "0.5rem" }}
                        value={Fecha}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => setFecha(e.target.value)}
                      />
                      <Typography
                      style={{marginTop: "1rem"}}>or recurring in the month</Typography>
                      <TextField
                        label="Hora 24H"
                        type="time"
                        value={Hour}
                        // style={{ marginTop: '1rem' }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => setHour(`${e.target.value}:00`)}
                      />
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(3, max-content)", // 3 columnas, ajusta según tu preferencia
                          gridColumn: "3",
                          gridRow: "3",
                        }}
                      >
                        { 
                        Object.keys(Days).map((propiedad) => (
                          <ToggleButton
                          style={{width : "maxcontent"}}
                            key={propiedad}
                            value="check"
                            selected={Days[propiedad]}
                            onChange={() => {
                              setDays({
                                ...Days,
                                [propiedad]: !Days[propiedad],
                              });
                            }}
                          >
                            {propiedad}
                          </ToggleButton>
                        ))}
                      </div>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={(event) => handleSubmit(event, routine)}
                      >
                        schedule
                      </Button>
                    </FormControl>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
            </div>
          ))}
        </div>
      </div>

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
      <ReusableModal open={isModalOpen} onClose={closeModal} title="Perfil">
        {isModalOpen && selectedEvent && (
          <div
            className={styles.modalBackground}
            ref={checked}
            onClick={handleCloseModal}
          >
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <Card style={{ margin: "1em" }}>
                <CardContent>
                  <Button
                    onClick={() => handleRemove( selectedEvent)}
                    variant="outlined"
                    color="error"
                    style={{ justifySelf: "end" }}
                  >
                    unschedule
                  </Button>
                  <Typography variant="h5" component="div">
                    🏋️‍♂️ {selectedRoutine.name_routine}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    👤 Author username: {selectedRoutine.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    🏆 Puntuation: {selectedRoutine.puntuation || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    🏋️‍♂️ Exercises: {selectedRoutine?.Exercises.length}
                  </Typography>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle1">Exercises</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {selectedRoutine.Exercises.map((exercise) => (
                        <div key={exercise.id_exercise}>
                          <Typography variant="h6">{exercise.name}</Typography>
                          <Typography variant="body2">
                            Type: {exercise.type}
                          </Typography>
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
              <Typography>Day : {selectedEvent.dateOnly}</Typography>
              <Typography>Hour : {selectedEvent.hourOnly}</Typography>

              <label>
                <Typography>Complet</Typography>
                <input
                  type="checkbox"
                  checked={selectedEvent.complete}
                  onChange={() => handleCheckedRoutine(event, selectedEvent)}
                />
              </label>
            </div>
          </div>
        )}
      </ReusableModal>
    </>
  );
}
