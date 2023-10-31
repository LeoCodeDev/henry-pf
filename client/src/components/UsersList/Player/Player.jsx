import { Typography, ThemeProvider } from "@mui/material";
import theme from '../../../../theme';
import styles from './Player.module.css';

const Player = ({ player }) => {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.playerContainer}>
        <div className={styles.gridContainer}>
        <div className={styles.playerInfo}>
         <div className={styles.avatar}>
            <img width={50} src={player.avatar} alt="avatar" />
          </div>
          <div className={styles.username}>
            <Typography>{player.username}</Typography>
          </div> 
        </div>
          <div className={styles.team}>
            <Typography>{player.Team.name}</Typography>
          </div>
          <div className={styles.score}>
            <Typography sx={{textAlign: 'end', marginRight: '1rem'}}>{player.score.score} pts</Typography>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export { Player };
