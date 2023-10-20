import axios from "axios"

const fetchMetrics = async () => {
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

    return ({
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
  export default fetchMetrics