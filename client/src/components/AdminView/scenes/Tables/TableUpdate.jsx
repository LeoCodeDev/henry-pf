import { Grid } from "@mui/material";
import { BasicCard } from "../../../Card/Card";
import { Update } from "../../../ProductUpdate/ProductUpdate";

export const TableUpdate = () => {
  return (
    <Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} margin={1}>
          <BasicCard>
            <Update />
          </BasicCard>
        </Grid>
      </Grid>
    </Grid>
  );
};
