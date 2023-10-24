import { Box, Grid } from "@mui/material";
import AddCouponForm from "../../../CouponsComponents/addCoupons";
import ManageCoupons from "../../../CouponsComponents/manageCoupons";
import { BasicCard } from "../../../Card/Card";

export const Coupon = () => {
  return (
    <>
      <Box sx={{ margin: '1rem'}}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <BasicCard>
            <AddCouponForm/>
          </BasicCard>
        </Grid>
        <Grid item xs={12} md={8}>
          <BasicCard>
          <ManageCoupons/>
          </BasicCard>
        </Grid>
      </Grid>
    </Box>
    </>
  )
}


