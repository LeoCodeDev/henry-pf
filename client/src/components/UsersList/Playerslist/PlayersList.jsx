import { Typography } from '@mui/material';
import { scoreStore } from '../../../store/scoreStore';
import styles from './PlayersList.module.css';
import { useEffect } from 'react';
import { Player } from '../Player/Player';

const PlayersList = ({selectedTeam}) => {
const { topPlayers, fetchTopPlayers } = scoreStore();
console.log({topPlayers, fetchTopPlayers})

useEffect(() => {
    fetchTopPlayers();
}, [fetchTopPlayers]);

console.log('topPlayers', topPlayers);

const filterTopPlayers = topPlayers.filter((player) => !selectedTeam || player.Team.name === selectedTeam).slice(0, 10);

const topTen = filterTopPlayers.lenght >= 10 ? filterTopPlayers.slice(0, 10): filterTopPlayers ;

  return (
    <div className={styles.container}>
    <section className={styles.containerTitle}>
    <Typography variant='h6'>Top 10</Typography>
    </section>
      <section className={styles.containerCard}>
        <Typography sx={{fontSize: '1rem'}}>Place</Typography>
        <Typography sx={{fontSize: '1rem'}}>Player</Typography>
        <Typography sx={{fontSize: '1rem', marginLeft: '5rem'}}>Team</Typography>
        <Typography sx={{fontSize: '1rem', marginRight: '0.5rem'}}>Experience</Typography>
      </section>
      <section style={{width: '60%'}}>
        {topTen
        .map((player, index) => (
            <div className={styles.playerWithPlace} key={index}>
            <Typography variant='h3' sx={{color: '#c9c9c9', marginLeft: '1rem'}}>{index + 1}</Typography>
            <Player player={player} />
          </div>
        ))}
      </section>
    </div>
  )
}

export { PlayersList }
