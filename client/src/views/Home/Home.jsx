import { useState } from 'react'
import { NavBar } from '../../components/NavBar/NavBar'
import { TopBar } from '../../components/TopBar/Topbar'
import { PlayersList } from '../../components/UsersList/Playerslist/PlayersList'
import { UsersList } from '../../components/UsersList/UsersList'
import Slider from '../../components/ProductList/Slider'
import img1 from '../../assets/images/green_and_black_modern_gym_banner_1.jpg'
import img2 from '../../assets/images/GYM_FITNESS_Banner_Landscape_1.jpg'
import img3 from '../../assets/images/Gym_Fitness_Banner_Landscape_2.jpg'

const Home = () => {
  const [selectedTeam, setSelectedTeam] = useState(null)
  const slide = [img1, img2, img3]

  const handleTeamChange = (teamId) => {
    setSelectedTeam(teamId)
  }
  return (
    <div style={{ position: 'relative', width: '100vw' }}>
      <>
        <NavBar />
        <section style={{ marginTop: '2rem', width: '100%' }}>
          <Slider arrImage={slide} interval={8000}/>
        </section>
        <section>
          <TopBar onTeamChange={handleTeamChange} />
          <UsersList selectedTeam={selectedTeam} />
        </section>
        <section>
          <PlayersList selectedTeam={selectedTeam} />
        </section>
      </>
    </div>
  )
}

export default Home
