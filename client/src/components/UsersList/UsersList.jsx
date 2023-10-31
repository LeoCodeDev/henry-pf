import { Typography } from '@mui/material';
import { scoreStore } from '../../store/scoreStore';
import styles from './UsersList.module.css';

const UsersList = () => {
const { scoreCard, fetchTopPlayers } = scoreStore();

console.log('scoreCard', scoreCard);
console.log('topPlayers', fetchTopPlayers);
  return (
    <div className={styles.container}>
    <section className={styles.containerTitle}>
      <Typography variant='h6'>Top Players</Typography>
    </section>
      <section className={styles.containerCard}>
        <Typography sx={{fontSize: '1rem', fontWeight: 900, marginLeft: '0.5rem'}}>Place</Typography>
        <Typography sx={{fontSize: '1rem', fontWeight: 900}}>Player</Typography>
        <Typography sx={{fontSize: '1rem', fontWeight: 900}}>Team</Typography>
        <Typography sx={{fontSize: '1rem', fontWeight: 900, marginRight: '0.5rem'}}>Experience</Typography>
      </section>
    </div>
  )
}

export { UsersList }
