import React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  0.5: "0.5",
  1: "1",
  1.5: "1.5",
  2: "2",
  2.5: "2.5",
  3: "3",
  3.5: "3.5",
  4: "4",
  4.5: "4.5",
  5: "5",
};

const Stars = ({ value, onChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="product-rating"
        value={value}
        precision={0.5}
        onChange={onChange}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box sx={{ ml: 1, color: "#228d07" }}>{labels[value]} stars</Box>
    </Box>
  );
};

export default Stars;
