import { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import { useAuthStore } from "../../store/authStore";
// import Calendar from '../../components/Calendar/Calendar';
import { NavBar } from "../../components/NavBar/NavBar";
import ProfileSidebar from "./ProfileSideBar";
import { ProfileTabs } from "./ProfileTabs";
import Profile from "../../components/Profile/Profile";
import ReusableModal from "../../components/ReusableModal/ReusableModal";
import RoutineForm from "../../components/RoutineForm/RoutineForm";


function ProfilePage() {
  const { user } = useAuthStore();
  const [routines, setRoutines] = useState([]);
  const [sales, setSales] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenRoutine, setIsModalOpenRoutine] = useState(false);

  const openModalRoutine = () => {
    setIsModalOpenRoutine(true);
  };

  const closeModalRoutine = () => {
    setIsModalOpenRoutine(false);
  };

  const handleEditProfileClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getRoutines = async () => {
      if (user.email === '') return
    const { data } = await axios.get(
      `/routines/getUserRoutines?email=${user.email}`
    );
    setRoutines(data);
  };
  const getSales = async () => {
      if (!user.id_user) return
    const { data } = await axios.get(
      `/sales/getUserSales?id_user=${user.id_user}`
    );
    setSales(data);
  };

  useEffect(() => {
    getRoutines();
    getSales();
  }, []);

  return (
    <>
      <NavBar />
      <div style={{ display: "flex", flexDirection: "row", marginTop: "5em" }}>
        <ProfileSidebar
          user={user}
          onEditProfileClick={handleEditProfileClick}
        />
        {isModalOpen && (
          <ReusableModal open={isModalOpen} onClose={closeModal} title="Perfil">
            <Profile onlyEdit={true}/>
          </ReusableModal>
        )}
        <main style={{ flex: 1, padding: "20px" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ProfileTabs sales={sales} routines={routines} />
            </Grid>
          </Grid>
        </main>
        {/* <div>
        <button onClick={openModalRoutine}>Agregar rutina</button>
        <RoutineForm user={user} open={isModalOpenRoutine} onClose={closeModalRoutine} />
        </div> */}
      </div>
    </>
  );
}

export default ProfilePage;
