import { Grid } from "@mui/material"
import ProductFormView from "../../../../views/Product Form/productForm"
import { BasicCard } from "../../../Card/Card"

export const TableCreate = () => {
  return (
    <Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} margin={1}>
          <BasicCard>
            <ProductFormView />
          </BasicCard>
        </Grid>
      </Grid>
    </Grid>
  )
}


