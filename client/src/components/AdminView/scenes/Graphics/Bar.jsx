import { BarChart } from '@mui/x-charts/BarChart'
import { useProductsStore } from '../../../../store/productsStore'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Bar = () => {
  const { products } = useProductsStore()

  const [data, setData] = useState({
    highStock: [],
    lowStock: [],
    highSales: [],
    lowSales: [],
    highRating: [],
    lowRating: [],
    highBuyer: [],
    lowBuyer: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      const { data: highStockData } = await axios('/sales/stockMetrics')
      const { data: lowStockData } = await axios(
        '/sales/stockMetrics?order=less'
      )
      const { data: highSalesData } = await axios('/sales/salesMetrics')
      const { data: lowSalesData } = await axios(
        '/sales/salesMetrics?order=less'
      )
      const { data: highRatingData } = await axios('/sales/ratingMetrics')
      const { data: lowRatingData } = await axios(
        '/sales/ratingMetrics?order=less'
      )
      const { data: highBuyerData } = await axios('/sales/userSalesMetrics')
      const { data: lowBuyerData } = await axios(
        '/sales/userSalesMetrics?order=less'
      )

      setData({
        ...data,
        highStock: highStockData,
        lowStock: lowStockData,
        highSales: highSalesData,
        lowSales: lowSalesData,
        highRating: highRatingData,
        lowRating: lowRatingData,
        highBuyer: highBuyerData,
        lowBuyer: lowBuyerData,
      })
    }
    fetchData()
  }, [])

  console.log(data)

  
  const productsLowStock = products
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5)
  const productsHighStock = products
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 5)

  const dataLowStock = {
    id: 'lowStock',
    data: productsLowStock.map((product) => product.name),
    values: productsLowStock.map((product) => product.stock),
  }
  const dataHighStock = {
    id: 'lowStock',
    data: productsHighStock.map((product) => product.name),
    values: productsHighStock.map((product) => product.stock),
  }
  

  return (
    <>
    <section>
    <h4>Low Stock</h4>
      <BarChart
        xAxis={[
          {
            id: dataLowStock.id,
            data: dataLowStock.data,
            scaleType: 'band',
          },
        ]}
        series={[
          {
            data: dataLowStock.values,
          },
        ]}
        width={500}
        height={300}
      />
    </section>

    <section>
        <h4>High Stock</h4>
      <BarChart
        xAxis={[
          {
            id: dataHighStock.id,
            data: dataHighStock.data,
            scaleType: 'band',
          },
        ]}
        series={[
          {
            data: dataHighStock.values,
          },
        ]}
        width={500}
        height={300}
      />
    </section>

    <section>

    </section>
    </>
  )
}

export { Bar }
