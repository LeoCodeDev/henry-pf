import { useEffect, useState } from 'react';
import axios from 'axios';
import {Grid} from '@mui/material'
// import { makeStyles } from '@mui/material/styles';
import { useAuthStore } from '../../store/authStore';
// import Calendar from '../../components/Calendar/Calendar'; 
import { NavBar } from '../../components/NavBar/NavBar';
import ProfileSidebar from './ProfileSideBar';
import {ProfileTabs} from './ProfileTabs';
// import ProfileMain from '../OrderPlaced/OrderPlaced';

// const drawerWidth = 250;


// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
// }));


function ProfilePage() {
    // const [modalOpen, setModalOpen] =useState({ anchor: '', open: false })
    // const [anchorElUser, setAnchorElUser] = useState(null)
    // const [prof, setProf] = useState(false)
    const {user}=useAuthStore();
    const [routines, setRoutines]=useState([]);
    const [sales, setSales]=useState([]);
    
    // const handleProfile = () => {
    //     setAnchorElUser(null);
    //     setProf(!prof)
    //   }
    const getRoutines=async()=>{
        const {data}=await axios.get(`/routines/getUserRoutines?email=${user.email}`);
        setRoutines(data);
    }
    const getSales=async()=>{
        const {data}=await axios.get(`/sales/getUserSales?id_user=${user.id_user}`);
        setSales(data);
        console.log(sales)
    }

  useEffect(()=>{
    getRoutines();
    getSales();

  }, [])

//   const classes = useStyles();

  return (
    <>
    <NavBar/>
    <div style={{display:'flex', flexDirection:'row', marginTop:'5em'}} >
      <ProfileSidebar user={user}
    //    handleProfile={handleProfile}
       />
      <main >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ProfileTabs sales={sales} routines={routines} />
          </Grid>
        </Grid>
      </main>
    </div>
    {/* {prof && <ProfileMain/>} */}
    </>
  );
}

export default ProfilePage;
