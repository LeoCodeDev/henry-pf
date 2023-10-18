import { Box, Grid } from "@mui/material";
import { BasicCard } from "../../../Card/Card";

export const Dashboard = () => {
  return (
    <>
      <Box sx={{ m: "1rem" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <BasicCard>

            </BasicCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <BasicCard>

            </BasicCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <BasicCard>

            </BasicCard>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ m: "1rem" }}>
        <BasicCard customHeight={256}>

        </BasicCard>
      </Box>
    </>
  );
};
