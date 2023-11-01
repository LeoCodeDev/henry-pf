import { Icon, Typography } from '@mui/material';
import { scoreStore } from '../../store/scoreStore';
import styles from './UsersList.module.css';
import { useEffect, } from 'react';
import { Player } from './Player/Player';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';


const UsersList = ({selectedTeam}) => {
const { topPlayers, fetchTopPlayers } = scoreStore();

useEffect(() => {
    fetchTopPlayers();
}, [fetchTopPlayers]);


const topThree = topPlayers.filter(player => player.Team.name === selectedTeam).slice(0, 3).length 
  ? topPlayers.filter(player => player.Team.name === selectedTeam).slice(0, 3)
  : topPlayers.slice(0,3);


  return (
    <div className={styles.container}>
    <section className={styles.containerTitle}>
    <Icon><EmojiEventsIcon /></Icon><Typography variant='h6'>Top Players</Typography>
    </section>
      <section className={styles.containerCard}>
        <Typography sx={{fontSize: '1rem', fontWeight: 900}}>Place</Typography>
        <Typography sx={{fontSize: '1rem', fontWeight: 900}}>Player</Typography>
        <Typography sx={{fontSize: '1rem', fontWeight: 900}}>Team</Typography>
        <Typography sx={{fontSize: '1rem', fontWeight: 900}}>Experience</Typography>
      </section>
      <section style={{width: '62%'}}>
        {topThree
        .filter((player) => !selectedTeam || player.Team.name === selectedTeam)
        .map((player, index) => (
            <div className={styles.playerWithPlace} key={index}>
            {index === 0 && <Icon sx={{width: '30px', height: '30px', paddingLeft: '40px'}}>🥇</Icon>}
            {index === 1 && <Icon sx={{width: '30px', height: '30px', paddingLeft: '40px'}}>🥈</Icon>}
            {index === 2 && <Icon sx={{width: '30px', height: '30px', paddingLeft: '40px'}}>🥉</Icon>}
            <Player player={player} />
          </div>
        ))}
      </section>
    </div>
  )
}

export { UsersList }
