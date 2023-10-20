import { Box, Grid } from "@mui/material";
import { BasicCard } from "../../../Card/Card";
import { TotalSells } from "../../../TotalsCards/TotalSells";
import { TotalQuantity } from "../../../TotalsCards/TotalQuantity";
import { TotalUsers } from "../../../TotalsCards/TotalUsers";
import { IndexBarChart } from "../Graphics/IndexBarChart";
import { UserBarChart } from "../Graphics/userBarChart";
import { Select } from "./Select";
import { useState } from "react";

export const Dashboard = () => {
  const [month, setMonth] = useState("");
  // eslint-disable-next-line react/jsx-key
  const dashboardData = [<TotalSells month={month} />,<TotalQuantity month={month} />,<TotalUsers month={month} />];

  return (
    <>
      <Select setMonth={setMonth} />
      <Box sx={{ m: "1rem" }}>
        <Grid container spacing={2}>
          {dashboardData.map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <BasicCard>{item}</BasicCard>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ m: "1rem" }}>
        <Grid container spacing={2} marginTop={2.5}>
          <Grid item xs={12} sm={6} key={1}>
            <BasicCard>
              <IndexBarChart />
            </BasicCard>
          </Grid>
          <Grid item xs={12} sm={6} key={2}>
            <BasicCard>
              <UserBarChart />
            </BasicCard>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
