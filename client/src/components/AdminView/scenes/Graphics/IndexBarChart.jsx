import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  ResponsiveChartContainer,
  BarPlot,
  LinePlot,
  ChartsXAxis,
  ChartsYAxis,
} from '@mui/x-charts';
import { Box, Typography } from '@mui/material';


const IndexBarChart = () => {
  const [sales, setSales] = useState({
    keys: [],
    values: [],
    quantities: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios('/sales/getLastYearSales?type=sum')
        const { data: dataQuantity  } = await axios('/sales/getLastYearSales?type=count')
        const keys = Object.keys(data)
        const values = Object.values(data)
        const quantities = Object.values(dataQuantity)
        setSales({
          keys: keys,
          values: values,
          quantities: quantities
        })
      } catch (error) {
        console.log({error: error.message})
      }
    }
    fetchData()
  }, [])

  if(!sales.keys.length || !sales.values.length) return <Typography sx={{color: '#fff'}}>loading...</Typography>
  return (
    <>
    <Box>
      <ResponsiveChartContainer
      xAxis={[
        {
          scaleType: 'band',
          data: sales.keys,
          id: 'quarters',
          label: 'Quarters'
        },
      ]}
      yAxis={[{id: 'money'}, {id: 'quantities'}]}
      series={[
        {
          type: 'line',
          id: 'revenue',
          yAxisKey: 'money',
          data: sales.quantities,
          color: '#fff',
        }, 
        {
          type: 'bar',
          id: 'sales',
          yAxisKey: 'quantities',
          data: sales.values,
          color: '#228d07',
        },
      ]}
      sx={{width: '100%'}}
      height={300}
      >
        <BarPlot />
        <LinePlot />
        <ChartsXAxis axisId="quarters" label="Total sales last year" labelFontSize={15} />
        <ChartsYAxis axisId="quantities" label="Total" />
        <ChartsYAxis axisId="money" position="right" label="Quantities" />
      </ResponsiveChartContainer>
    </Box>
    </>
  )
}

export { IndexBarChart }
