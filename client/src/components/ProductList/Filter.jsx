import { useEffect, useState } from "react";
import {useProductsStore} from '../../store/productsStore'
import { Box, Button, Popover, Slider, Typography } from "@mui/material";
import theme from '../../../theme'
/* import { styled } from '@mui/material/styles'; */


const Filter = () => {

  const {/* clearFilters */ applyFilters} = useProductsStore()
  const [anchor, setAnchor] = useState(null);

  const popoverOpen = (event) => {
    setAnchor(event.currentTarget);
  };
  const customMarksPrice = [
    {
      value: 10,
      label:(<span style={{color: theme.palette.text.main}}>10$</span>)
    },
    {
      value: 50,
    },
    {
      value: 100,
    },
    {
      value: 200,
      label:(<span style={{color: theme.palette.text.main}}>200$</span>)
    },
    {
      value: 300,
    },
    {
      value: 500,
      label:(<span style={{color: theme.palette.text.main}}>500$</span>)
    },
  ];
  const customMarksRate = [
    {
      value: 1,
      label:(<span style={{color: theme.palette.text.main}}>1⭐</span>)
    },
    {
      value: 2,
      label:(<span style={{color: theme.palette.text.main}}>2⭐</span>)
    },
    {
      value: 3,
      label:(<span style={{color: theme.palette.text.main}}>3⭐</span>)
    },
    {
      value: 4,
      label:(<span style={{color: theme.palette.text.main}}>4⭐</span>)
    },
    {
      value: 5,
      label:(<span style={{color: theme.palette.text.main}}>5⭐</span>)
    },
  ];

  const [rangeValues, setRangeValues] = useState({
    priceMin: 10,
    priceMax: 500,
    rateMin: 1,
    rateMax: 5
  })
  const [value, setValue] = useState();
  const [value2, setValue2] = useState();

  const handleChange = (event, newValue) => {

    setRangeValues({
        ...rangeValues,
        priceMin: newValue[0],
        priceMax: newValue[1]
    })

    setValue(newValue);
  };
  const handleChange2 = (event, newValue) => {

    setRangeValues({
        ...rangeValues,
        rateMin: newValue[0],
        rateMax: newValue[1]
    })

    setValue2(newValue);
  };

  useEffect(()=>{
    applyFilters(rangeValues)
  },[rangeValues,applyFilters])

  /* const sliderStyle = styled(Slider)(({theme}) => ({
    '& .MuiSlider-mark': {
      backgroundColor: '#bfbfbf',
      height: 8,
      width: 1,
  })) */

  return (
    <div>
      <Button
        style={{ marginTop: "10px", marginLeft: "10px", width: 200, color: theme.palette.text.main, borderColor: theme.palette.text.main, borderRadius: '1rem' }}
        variant="outlined"
        
        size="large"
        onClick={popoverOpen}
      >
        Filter By
      </Button> 
      
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={() => setAnchor(null)}
      >
        
        <Box sx={{ width: 300, padding: "20px", color: theme.palette.text.main, backgroundColor: theme.palette.background_dark.main }}>
          
          <Typography
          sx={{fontSize: '1rem', lineHeight: 0.334}}
            variant="h5"
            id="track-inverted-range-slider"
            gutterBottom
          >
            Price 
          </Typography>
          <Slider
          aria-label="Small"
            min={10}
            max={500}
            value={value}
            defaultValue={[10, 500]}
            step={10}
            marks={customMarksPrice}
            valueLabelDisplay="auto"
            onChange={handleChange}
            getAriaLabel={() => "Temperature range"}
          />
          
          <Typography
          sx={{fontSize: '1rem', lineHeight: 0.334, marginTop: '12px'}}
            variant="h5"
            id="track-inverted-range-slider"
            gutterBottom
          >
           Rating 
          </Typography>

          <Slider
            min={0}
            max={5}
            value={value2}
            defaultValue={[0, 5]}
            step={1}
            marks={customMarksRate}
            valueLabelDisplay="auto"
            getAriaLabel={() => "Temperature range"}
            onChange={handleChange2}
          />
          
        </Box>
        
      </Popover>
  
</div>
  );
};

export default Filter;
