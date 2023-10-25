import { Grid } from "@mui/material"
import UserAdmin from "../../../userAdmin/userAdmin"
import { BasicCard } from "../../../Card/Card"
export const TableUsers = () => {
    return (
      <Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} margin={1}>
          <BasicCard>
            <UserAdmin />
          </BasicCard>
        </Grid>
      </Grid>
    </Grid>
    )
  }
  