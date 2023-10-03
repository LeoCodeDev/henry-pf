import styles from "./styles/Bottom.module.css";
import { useProductsStore } from "../../store/productsStore";
import {
  Popover,
  Button,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import theme from "../../../theme";
import { useState } from "react";

const Order = () => {
  const [anchor, setAnchor] = useState(null);
  const popoverOpen = (event) => {
    setAnchor(event.currentTarget);
  };
  const { applySort } = useProductsStore();

  const handleChange = (event) => {
    console.log({event});
    applySort(event.target.id);
  };

  return (
    <div className={styles.selectDropdown}>
      <Button
        style={{
          marginTop: "10px",
          marginLeft: "10px",
          width: 200,
          color: theme.palette.text.main,
          borderColor: theme.palette.text.main,
          borderRadius: "1rem",
        }}
        variant="outlined"
        size="large"
        onClick={popoverOpen}
      >
        Order By
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
            width: 300,
            padding: "20px",
            color: theme.palette.text.main,
            backgroundColor: theme.palette.background_dark.main,
          }}
        >
          <List>
            <ListItem>
              <ListItemButton onClick={handleChange} id={`expensive`}>
                <ListItemText primary="Higher Price 🡩"/>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={handleChange}>
                <ListItemText primary="Lower price 🡫"  />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={handleChange}>
                <ListItemText primary="Alphabetical 🡩" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={handleChange}>
                <ListItemText primary="Alphabetical 🡫"  />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={handleChange}>
                <ListItemText primary="Higher Rate 🡩"  />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={handleChange}>
                <ListItemText primary="Lower Rate 🡫"  />
              </ListItemButton>
            </ListItem>
          </List>
          {/* <select onChange={handleChange}>
            <option value="expensive"></option>
            <option value="cheap"></option>
            <option value="abc"></option>
            <option value="zyx"></option>
            <option value="mRated"></option>
            <option value="lRated"></option>
          </select> */}
        </Box>
      </Popover>
    </div>
  );
};

export default Order;
