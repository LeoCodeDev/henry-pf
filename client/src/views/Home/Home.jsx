import { useState } from 'react';
import { NavBar } from '../../components/NavBar/NavBar';
import { TopBar } from '../../components/TopBar/Topbar';
import { PlayersList } from '../../components/UsersList/Playerslist/PlayersList';
import { UsersList } from '../../components/UsersList/UsersList';
import Programing from './Programing.gif'

const Home = () => {
  const [selectedTeam, setSelectedTeam] = useState(null); 

  const handleTeamChange = (teamId) => {
    setSelectedTeam(teamId);
  };
  console.log("selectedTeam:", selectedTeam);
    return (
      <div style={{position:'relative', width:'100vw'}}>
      <>
        <NavBar />
          <section>
            <img style={{width:'93%', height: '35rem'}} src={Programing} alt="" />
          <TopBar onTeamChange={handleTeamChange}/>
        </section>
        <section>
          <UsersList selectedTeam={selectedTeam}/>
        </section>
        <section>
        <PlayersList selectedTeam={selectedTeam}/>
        </section>
      </>
      </div>
    );
  };
  
  export default Home;