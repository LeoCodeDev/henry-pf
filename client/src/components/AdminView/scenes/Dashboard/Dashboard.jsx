import { Box, Grid } from "@mui/material";
import { BasicCard } from "../../../Card/Card";
import { TotalSells } from "../../../TotalsCards/TotalSells";
import { TotalQuantity } from "../../../TotalsCards/TotalQuantity";
import { TotalUsers } from "../../../TotalsCards/TotalUsers";
import { IndexBarChart } from "../Graphics/IndexBarChart";
import { UserBarChart } from "../Graphics/userBarChart";
import { TotalBestSelling } from "../../../TotalTables/TotalBestSelling";
import { TotalBestBuyer } from "../../../TotalTables/TotalBestBuyer";
import { TotalLeastSold } from "../../../TotalTables/TotalLeastSold";
import fetchMetrics from "../../../../services/fechMetrics";
import { Select } from "./Select";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const [month, setMonth] = useState("");
  const [metricsData, setMetricsData] = useState();

  const dashboardData = [<TotalSells month={month} />,<TotalQuantity month={month} />,<TotalUsers month={month} />];
  
  
  useEffect(() => {
    fetchMetrics()
    .then((data) => {
      setMetricsData(data)
    })
  
  }, [])

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
        <Grid container spacing={1} marginTop={2.5}>
          <Grid item xs={12} sm={6} >
            <BasicCard>
              <IndexBarChart />
            </BasicCard>
          </Grid>
          <Grid item xs={12} sm={6} >
            <BasicCard>
              <UserBarChart />
            </BasicCard>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ m: '1rem'}}>
        <Grid container spacing={1} marginTop={2.5}>
          <Grid item xs={12} sm={4}>
          <div style={{marginBottom: '10px'}}>
            <BasicCard>
              <TotalBestSelling highSales={metricsData?.highSales} />
            </BasicCard>
          </div>
            
            <BasicCard>
              <TotalLeastSold lowSales={metricsData?.lowSales} />
            </BasicCard>
          </Grid>
          <Grid item xs={12} sm={8} >
          <div>
            <BasicCard customHeight={650} >
              <TotalBestBuyer highBuyer={metricsData?.highBuyer}/>
            </BasicCard>
          </div>
            
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
