import { Grid } from '@mui/material'
import UserEmails from '../../../userAdmin/userEmails'
import { BasicCard } from '../../../Card/Card'

export const Email = () => {
    return (
      <Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} margin={1}>
          <BasicCard>
            <UserEmails />
          </BasicCard>
        </Grid>
      </Grid>
    </Grid>
    )
  }