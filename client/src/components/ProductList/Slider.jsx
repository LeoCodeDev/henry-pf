import Carousel from "react-material-ui-carousel";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Item from "./Item";
import slide1 from "../../assets/images/slide1.jpg";
import slide2 from "../../assets/images/slide2.jpg";
import slide3 from "../../assets/images/slide3.jpg";

const slide = [
  {
    id: 1,
    image: slide1,
    title: "--gym one--",
  },
  {
    id: 2,
    image: slide2,
    title: "--gym two--",
  },
  {
    id: 3,
    image: slide3,
    title: "--gym three--",
  },
];

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 300,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
});

const Slider = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: {
        xs: '300px',
        sm: '300px',
        md: '550px',
        lg: '800px',
        xl: '800px'
      }, overflow: "hidden", width: '100%' }}>
        <Carousel indicators={false}>
          {slide.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </Carousel>
      </Box>
    </ThemeProvider>
  );
};

export default Slider;
