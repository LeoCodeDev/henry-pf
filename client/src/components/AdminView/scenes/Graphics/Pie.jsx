import { PieChart } from '@mui/x-charts/PieChart'
import { useProductsStore } from '../../../../store/productsStore'

export const Pie = () => {

  const { products } = useProductsStore()

  const pieData = products.map((product) => ({
    id: product.id_product,
    value: product.stock,
    label: product.name,
  }))
    return (
      <div>
        <h1>Pie Chart</h1>
        <PieChart
        series={[
          {
            data: pieData,
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: 0,
            endAngle: 360,
            cx: 150,
            cy: 150,
          },
        ]}
        width={700}
        height={300}
      />
      </div>
    )
  }
  