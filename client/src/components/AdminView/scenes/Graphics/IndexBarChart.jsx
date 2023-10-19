import { BarChart } from '@mui/x-charts/BarChart'
import axios from 'axios'
import { useEffect, useState } from 'react'

const IndexBarChart = () => {
  const [sales, setSales] = useState({
    keys: [],
    values: []
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios('/sales/getLastYearSales?type=sum')
        const keys = Object.keys(data)
        const values = Object.values(data)
        setSales({
          keys: keys,
          values: values
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <section>
        <h4>Total sales last year</h4>
      {sales.keys.length > 0 &&
        <BarChart
          xAxis={[
            {
              id: 'Sales per year',
              data: sales.keys,
              scaleType: 'band',
            },
          ]}
          series={[
            {
              data: sales.values,
            },
          ]}
          width={500}
          height={300}
        />}
      </section>
    </>
  )
}

export { IndexBarChart }
