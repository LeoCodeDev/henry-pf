import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useProductsStore } from "../../store/productsStore";
import { useEffect, useState } from "react";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "transparent",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    marginRight: theme.spacing(1),
    fontStyle: "italic",
    breakpoints: {
      values: {
        xs: 300,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440,
      },
    },
    color: "#06080B",
    "&.Mui-selected": {
      color: "#fff",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#bfbfbf",
    },
  })
);

const types = ['ALL PRODUCTS', 'CLOTHE', 'SUPPLEMENT', 'EQUIPMENT']

export default function CustomizedTabs() {
  const [tabValue, setTabValue] = useState(types[0])
  const [value, setValue] = useState(0);
  const { setProductsFiltered, fetchCategories, categories } = useProductsStore();

  const handleChange = (event, newValue) => {
    setTabValue(newValue)
    setValue(newValue.toLowerCase())
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCategories();
      } catch (error) {
        throw new Error(error.message);
      }
    };
    fetchData();
  }, [fetchCategories]);
  
  useEffect(() => {
    const category = categories?.find((category) => category.name.toLowerCase() === value);
    setProductsFiltered(category);
  }, [categories ,value, setProductsFiltered]);

  return (
    <Box
      sx={{
        bgcolor: '#bfbfbf',
        borderRadius: '1rem',
        color: '#06080B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: {
          xs: '2.5rem',
          sm: '2.5rem',
          md: '2.5rem',
          lg: '3rem',
          xl: '3rem'
        },
        width: {
          xs: '25.625rem',
          sm: '43.75rem',
          md: '43.75rem',
          lg: '43.75rem',
          xl: '43.75rem'
        }
      }}>
      <StyledTabs
        value={tabValue}
        centered
        onChange={handleChange}
        sx={{
          p: '0px 0px 0px 10px'
        }}>
        {types.map((type, index) => (
          <StyledTab
            key={index}
            index={index}
            value={type}
            sx={{
              fontSize: {
                xs: '0.88rem',
                sm: '1.25rem',
                md: '1.463rem',
                lg: '1.5rem',
                xl: '1.5rem'
              },
              fontWeight: {
                xs: 600,
                md: 500,
                lg: 500,
                xl: 500
              }
            }}
            label={type}
          />
        ))}
      </StyledTabs>
    </Box>
  )
}
