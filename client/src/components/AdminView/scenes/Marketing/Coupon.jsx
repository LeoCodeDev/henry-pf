import AddCouponForm from "../../../CouponsComponents/addCoupons";
import ManageCoupons from "../../../CouponsComponents/manageCoupons";

export const Coupon = () => {
  return (
    <div style={{marginTop:"20px", display:"flex", flexDirection:"row"}}>
      <AddCouponForm/>
      <ManageCoupons/>
    </div>
  )
}


