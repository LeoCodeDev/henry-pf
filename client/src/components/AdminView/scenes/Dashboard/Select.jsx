import {
  Popover,
  Button,
  Box,
  List,
  ListItem,
  ThemeProvider,
  Typography,
  ListItemButton,
} from "@mui/material";
import theme from "../../../../../theme";
import { useEffect, useState } from "react";
import axios from "axios";

const Select = ({ setMonth }) => {
  const [anchor, setAnchor] = useState(null);
  const [months, setMonths] = useState([]);
  const [SelectedMonth, setSelectedMonth] = useState("");

  const popoverOpen = (event) => {
    setAnchor(event.currentTarget);
  };
  const fetchData = async () => {
    try {
      const data = await axios("/sales/getLastYearSales?type=sum").then((res) => res.data);
      return {
        dataMonth: data,
      };
    } catch (error) {
      console.log({ error: error.message });
      throw error
    }
  };
  
  useEffect(() => {
    
    const date = new Date();
    const month = date.getMonth();
  
    fetchData()
      .then((data) => {
        const dataTotal = Object.keys(data.dataMonth);
        setMonths(dataTotal);
        setSelectedMonth(dataTotal[month])
        setMonth(dataTotal[month])
      })
      .catch((error) => {
        console.error(error);
      }
      );
  }, [setMonth]);

const handleSelectValue = (month) => {
  setMonth(month)
  setSelectedMonth(month)
  setAnchor(null)
}   
  
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "0 1rem",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Typography marginRight={1}> Group by </Typography>
        <Button
          style={{
            padding: "0px",
            width: 100,
            color: theme.palette.text.main,
            borderColor: theme.palette.text.main,
          }}
          variant="outlined"
          size="large"
          onClick={popoverOpen}
        >
          {SelectedMonth.toUpperCase() || "Month"}
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
          <Box
            sx={{
              width: "100px",
              padding: "0px",
              margin: "0px",
              color: theme.palette.text.main,
              backgroundColor: "#010402",
            }}
          >
            <List sx={{ padding: "0px", width: "100px" }}>
            {months.map((month, index) => (
               <ListItem sx={{ padding: "5px" }} key={index} >
                <ListItemButton
                onClick={() => handleSelectValue(month)}
                  sx={{
                    padding: "0px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {month.toUpperCase()}
                </ListItemButton>
              </ListItem> 
            ))}
              
            </List>
          </Box>
        </Popover>
      </div>
    </ThemeProvider>
  );
};

export { Select };
