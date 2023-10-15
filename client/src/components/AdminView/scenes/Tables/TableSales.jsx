import ManageCoupons from "./CouponsComponents/manageCoupons"
import AddCouponForm from "./CouponsComponents/addCoupons"


export const TableSales= () => {
  return(
    <div style={{marginTop:"20px", display:"flex", flexDirection:"row"}}>
      <AddCouponForm/>
      <ManageCoupons/>
    </div>
  )
}
  