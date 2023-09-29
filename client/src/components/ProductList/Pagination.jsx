import {IconButton} from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import styles from './styles/Bottom.module.css'

function Pagination() {
  return (
    <div className={styles.paginationContain}>
      <IconButton sx={{color: '#bfbfbf'}}>
                <ArrowBackIosNew />
        </IconButton>
        <p>1 / 25</p>
        <IconButton sx={{color: '#539a07'}}>
                <ArrowForwardIos />
            </IconButton>
    </div>
  )
}

export default Pagination
