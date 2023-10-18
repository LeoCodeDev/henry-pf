import { Box, Grid } from "@mui/material";
import { BasicCard } from "../../../Card/Card";
import { TotalSells } from "../../../TotalsCards/TotalSells";
import { TotalSales } from "../../../TotalsCards/TotalSales";
import { TotalUsers } from "../../../TotalsCards/TotalUsers";

export const Dashboard = () => {
  const dashboardData = [
    {
      xs: 12,
      sm: 4,
      children: <TotalSells />
    },
    {
      xs: 12,
      sm: 4,
      children: <TotalSales />
    },
      {
        xs: 12,
      sm: 4,
      children: <TotalUsers />
    },
  ]
  return (
    <>
      <Box sx={{ m: "1rem" }}>
        <Grid container spacing={1}>
        {dashboardData.map((item, index ) => (
          <Grid item xs={item.xs} sm={item.sm} key={index}>
            <BasicCard>
              {item.children}
            </BasicCard>
          </Grid>
        ))}
        </Grid>
      </Box>

      <Box sx={{ m: "1rem" }}>
        <BasicCard customHeight={256}>

        </BasicCard>
      </Box>
    </>
  );
};
