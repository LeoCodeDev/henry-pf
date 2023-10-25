import { useEffect, useState } from 'react'
import { useProductsStore } from '../../store/productsStore'
import { Box, Button, Popover, Slider, Typography } from '@mui/material'
import theme from '../../../theme'

const Filter = () => {
  const { /* clearFilters */ applyFilters, products, actualCurrency } =
    useProductsStore()
  const [anchor, setAnchor] = useState(null)

  const lowerPrice = products.reduce((min, product) => {
    return min > product.price ? product.price : min
  }, products[0]?.price)
  const higherPrice = products.reduce((max, product) => {
    return max < product.price ? product.price : max
  }, 0)

  const stepPerCurrency = (higherPrice) => {
    if (higherPrice < 1000) {
      return 10
    } else if (higherPrice > 1000000) {
      return 250000
    } else if (higherPrice > 1000 && higherPrice < 1000000) {
      return 100000
    }
  }

  const popoverOpen = (event) => {
    setAnchor(event.currentTarget)
  }
  const customMarksPrice = [
    {
      value: 10,
      label: <span style={{ color: theme.palette.text.main }}>10$</span>
    },
    {
      value: 50
    },
    {
      value: 100
    },
    {
      value: 200,
      label: <span style={{ color: theme.palette.text.main }}>200$</span>
    },
    {
      value: 300
    },
    {
      value: 500,
      label: <span style={{ color: theme.palette.text.main }}>500$</span>
    }
  ]
  const customMarksRate = [
    {
      value: 1,
      label: <span style={{ color: theme.palette.text.main }}>1⭐</span>
    },
    {
      value: 2,
      label: <span style={{ color: theme.palette.text.main }}>2⭐</span>
    },
    {
      value: 3,
      label: <span style={{ color: theme.palette.text.main }}>3⭐</span>
    },
    {
      value: 4,
      label: <span style={{ color: theme.palette.text.main }}>4⭐</span>
    },
    {
      value: 5,
      label: <span style={{ color: theme.palette.text.main }}>5⭐</span>
    }
  ]

  const [rangeValues, setRangeValues] = useState({
    priceMin: lowerPrice,
    priceMax: higherPrice,
    rateMin: 0,
    rateMax: 5
  })
  const [value, setValue] = useState()
  const [value2, setValue2] = useState()

  const handleChange = (event, newValue) => {
    setRangeValues({
      ...rangeValues,
      priceMin: newValue,
    })

    setValue(newValue)
  }
  const handleChange2 = (event, newValue) => {
    setRangeValues({
      ...rangeValues,
      rateMin: newValue,
    })

    setValue2(newValue)
  }

  useEffect(() => {
    setRangeValues({
      priceMin: lowerPrice,
      priceMax: higherPrice,
      rateMin: 0,
      rateMax: 5
    })

    setRangeValues({
      priceMin: lowerPrice,
      priceMax: higherPrice,
      rateMin: 0,
      rateMax: 5
    })
  }, [actualCurrency, lowerPrice, higherPrice])

  useEffect(() => {
    applyFilters(rangeValues)
  }, [rangeValues, applyFilters])

  return (
    <div>
      <Button
        style={{
          marginTop: '10px',
          marginLeft: '10px',
          width: 200,
          color: theme.palette.text.main,
          borderColor: theme.palette.text.main,
          borderRadius: '1rem'
        }}
        variant="outlined"
        size="large"
        onClick={popoverOpen}>
        Filter By
      </Button>

      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        onClose={() => setAnchor(null)}>
        <Box
          sx={{
            width: 300,
            padding: '20px',
            color: theme.palette.text.main,
            backgroundColor: theme.palette.background_dark.main
          }}>
          <Typography
            sx={{ fontSize: '1rem', lineHeight: 0.334 }}
            variant="h5"
            id="track-inverted-range-slider"
            gutterBottom>
            Price
          </Typography>
          <Slider
            min={Number(lowerPrice)}
            max={Number(higherPrice)}
            value={value}
            // defaultValue={[lowerPrice, higherPrice]}
            step={stepPerCurrency(higherPrice)}
            marks={customMarksPrice}
            valueLabelDisplay="auto"
            onChange={handleChange}
            getAriaLabel={() => 'Price range'}
          />

          <Typography
            sx={{ fontSize: '1rem', lineHeight: 0.334, marginTop: '12px' }}
            variant="h5"
            id="track-inverted-range-slider"
            gutterBottom>
            Rating
          </Typography>

          <Slider
            min={0}
            max={5}
            value={value2}
            // defaultValue={[0, 5]}
            step={1}
            marks={customMarksRate}
            valueLabelDisplay="auto"
            getAriaLabel={() => 'Rating range'}
            onChange={handleChange2}
          />
        </Box>
      </Popover>
    </div>
  )
}

export default Filter
