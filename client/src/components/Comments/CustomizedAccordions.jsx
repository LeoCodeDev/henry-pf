import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useProductsStore } from "../../store/productsStore";
import Rating from "@mui/material/Rating";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  width: "95%",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    alignItems:"center",
    justifyContent:"space-between",
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  fontWeight: "normal",
}));

export default function CustomizedAccordions(props) {
  const productStore = useProductsStore();
  const productid = props.idProduct;
  const [comments, setComments] = useState([]);

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState(null); // Estado para controlar la expansión de los acordeones

  const totalComments = comments.length;
  const totalPages = Math.ceil(totalComments / itemsPerPage);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const renderComments = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleComments = comments.slice(startIndex, endIndex);

    useEffect(() => {
      // Realizar la llamada asincrónica y actualizar el estado cuando esté completo
      productStore
        .fetchProductReviews(productid)
        .then((reviews) => {
          if (comments.length !== reviews.length) {
            setComments(reviews);
          }
        })
        .catch((error) => {
          console.error("Error fetching product reviews:", error);
        });



    }, [productid, props.update]); // El efecto se ejecutará cada vez que cambie productid

    const getAllUsers = async () => {
      try {
        const response = await fetch(`/users/getAllUsers`);
        if (!response.ok) {
          throw new Error("No se pudieron obtener los usuarios.");
        }
        const allUsers = await response.json();
        return allUsers;
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        return [];
      }
    };

    return (
      visibleComments.map((comment, index) => (
        <Accordion
          size="small"
          key={index}
          expanded={expanded === `panel${startIndex + index + 1}`}
          onChange={handleChange(`panel${startIndex + index + 1}`)}
          
        >
          <AccordionSummary
            aria-controls={`panel${startIndex + index + 1}d-content`}
            id={`panel${startIndex + index + 1}d-header`}
          >
            <Typography color={"#1c7805"}>{comment.username}</Typography>
            <Rating
              sx={{ marginLeft: 4, color: "gray", fontSize: "1rem" }}
              name="product-rating"
              value={comment.rating}
              precision={0.5}
              style={{ pointerEvents: "none" }}
            />
            <Typography sx={{ marginLeft: 4, fontSize: "0.8rem" }}>
              {comment.createdAt.substring(0, 10)} (
              {comment.createdAt.substring(12, 16)} hs)
            </Typography>
            <Typography sx={{ fontSize: "0.8rem", minWidth:"30%" }}>
              {comment.comment.substring(0, 20)}...
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ fontSize: "0.8rem"}}>{comment.comment}</Typography>
          </AccordionDetails>
        </Accordion>
    )));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box
      sx={{display:"flex", flexDirection:"column", alignItems:"center"}}
      width={"100%"}
      mt={-4}
    >
      <Stack p={2} >
        <Pagination
          count={totalPages}
          page={currentPage}
          size="small"
          onChange={(event, page) => handlePageChange(page)}
        />
      </Stack>
      {renderComments()}
    </Box>
  );
}
