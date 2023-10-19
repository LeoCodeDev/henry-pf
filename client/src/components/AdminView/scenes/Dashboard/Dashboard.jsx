import { Box, Grid } from '@mui/material'
import { BasicCard } from '../../../Card/Card'
import { TotalSells } from '../../../TotalsCards/TotalSells'
import { TotalSales } from '../../../TotalsCards/TotalSales'
import { TotalUsers } from '../../../TotalsCards/TotalUsers'
import { IndexBarChart } from '../Graphics/IndexBarChart'
import { UserBarChart } from '../Graphics/userBarChart'

export const Dashboard = () => {
  // eslint-disable-next-line react/jsx-key
  const dashboardData = [<TotalSells />, <TotalSales />, <TotalUsers />]

  return (
    <>
    
      <Box sx={{ m: '1rem' }}>
        <Grid container spacing={1}>
          {dashboardData.map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <BasicCard>{item}</BasicCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ m: '1rem' }}>
        <BasicCard customHeight={256}>
            <IndexBarChart/>
            <UserBarChart />
        </BasicCard>
      </Box>
    </>
  )
}
