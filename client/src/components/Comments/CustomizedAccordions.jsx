import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import { Box, Typography, CardContent, IconButton, Grid } from "@mui/material/";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useProductsStore } from "../../store/productsStore";
import Rating from "@mui/material/Rating";
import theme from "../../../theme";
import { isDesktop } from "react-device-detect";
import ReportIcon from "@mui/icons-material/Report";
import ReportOffIcon from "@mui/icons-material/ReportOff";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axios from "axios";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  marginLeft: -2,
  width: "90%",
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
    alignItems: "center",
    justifyContent: "initial",
    height: "2rem",
    gap: isDesktop ? "12%" : "0.5rem",
    overflow: "hidden",
    marginLeft: theme.spacing(1),
    marginRight: 0,
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
  const [reported, setReported] = useState({});
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState(null);
  const totalComments = comments.length;
  const totalPages = Math.ceil(totalComments / itemsPerPage);
  const [response, setResponse] = useState("");
  const [idComment, setIdComment] = useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    if (response) {
      const handleReportAndFetchData = async () => {
        try {
          await axios.post("/dashboard/createReport", {
            reason: response,
            reportedId: idComment,
            reporterId: props.user.id_user,
            type: "Comment",
          });

          toast.success("Comment successfully reported!");

          const handleAllReports = async () => {
            try {
              const { data } = await axios("/dashboard/allReports");
              setReported((prevReported) => {
                const updatedReported = { ...prevReported };
                for (const report of data) {
                  const reporterId = report.reporterId;
                  const reportedId = report.reportedIdComment;
                  if (reporterId === props.user.id_user) {
                    updatedReported[reportedId] = true;
                  }
                }
                return updatedReported;
              });
            } catch (error) {
              console.log(error.message);
            }
          };

          handleAllReports();
        } catch (error) {
          toast.error("Error in the reporting process!");
          console.log(error.message);
        }
      };

      handleReportAndFetchData();
    }

    setResponse("");
  }, [reported, response, idComment, props.user.id_user]);

  useEffect(() => {
    productStore
      .fetchProductReviews(productid)
      .then((reviews) => {
        if (comments.length !== reviews.length) {
          const activeComments = reviews.filter(
            (comment) => comment.active === true
          );
          setComments(activeComments);
        }
      })
      .catch((error) => {
        console.error("Error fetching product reviews:", error);
      });
  }, [productid, props.update, comments.length, productStore]);

  const renderComments = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const yourCommentIndex = comments.findIndex(
      (comment) => comment.userId === props.user.id_user
    );

    const yourComment =
      yourCommentIndex >= 0 ? [comments[yourCommentIndex]] : [];

    const otherComments = comments.filter(
      (comment, index) => index !== yourCommentIndex
    );

    const combinedComments = yourComment.concat(otherComments);

    const visibleComments = combinedComments.slice(startIndex, endIndex);

    const handleReason = async () => {
      return Swal.fire({
        title: "Please, enter the reason why you are reporting the comment",
        input: "textarea",
        inputPlaceholder: "why...",
        showCancelButton: true,
        confirmButtonText: "Report",
        cancelButtonText: "Cancel",
        confirmButtonColor: theme.palette.primary.main,
        showLoaderOnConfirm: true,
        preConfirm: (reason) => {
          if (!reason) {
            Swal.showValidationMessage(
              "Please, enter the reason why you are reporting the comment."
            );
          }
          return reason;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          return result.value;
        }
      });
    };

    const handleReport = async (comment) => {
      if (!reported[comment.id]) {
        handleReason().then((reason) => {
          if (reason) {
            setResponse(reason);
          }
        });
      } else {
        toast.error("You have already reported this comment");
        return;
      }
      setIdComment(comment.id);
    };

    const handleDeleteComment = (comment) => {
      Swal.fire({
        title: "Delete Comment",
        text: "Are you sure you want to delete this comment?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        confirmButtonColor: theme.palette.primary.main,
      }).then((result) => {
        if (result.isConfirmed) {
          const requestBody = {
            itemId: comment.id,
            type: "Comment",
            active: false,
          };

          axios
            .put("/dashboard/deactivateItem", requestBody)
            .then((response) => {
              if (response.status === 200) {
                Swal.fire({
                  title: "Deleted",
                  text: "Your comment was successfully deleted",
                  icon: "success",
                  confirmButtonColor: theme.palette.primary.main,
                });
                productStore.fetchProductReviews(productid).then((reviews) => {
                  const activeComments = reviews.filter(
                    (comment) => comment.active === true
                  );
                  setComments(activeComments);
                });
              }
            })
            .catch((error) => {
              console.error("Error deactivating the comment:", error);
              Swal.fire(
                "Error",
                "An error occurred while deleting the comment",
                "error"
              );
            });
        }
      });
    };

    return (
      <>
        {visibleComments.length > 0 ? (
          visibleComments.map((comment, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${startIndex + index + 1}`}
              onChange={handleChange(`panel${startIndex + index + 1}`)}
            >
              <AccordionSummary
                aria-controls={`panel${startIndex + index + 1}d-content`}
                id={`panel${startIndex + index + 1}d-header`}
              >
                <Typography
                  color={theme.palette.primary.main}
                  style={{ minWidth: "6rem", maxWidth: "6rem" }}
                >
                  {comment.username}
                </Typography>
                {reported[comment.id] && (
                  <ReportIcon
                    style={{
                      color: "yellow",
                      fontSize: "1rem",
                      position: "absolute",
                      left: 0,
                      padding: "0.2rem",
                    }}
                  />
                )}
                <Rating
                  sx={{ color: "gray", fontSize: "0.9rem" }}
                  name="product-rating"
                  value={comment.rating}
                  precision={0.5}
                  style={{ pointerEvents: "none" }}
                />
                <Typography
                  sx={{ marginLeft: 1, fontSize: "0.9rem", minWidth: "6rem" }}
                >
                  {comment.updatedAt?.substring(0, 10)}
                </Typography>
                {isDesktop ? (
                  <Typography
                    sx={{
                      color: "lightgrey",
                      fontSize: "0.9rem",
                      marginLeft: 1,
                    }}
                  >
                    {!reported[comment.id] ? (
                      <span> {comment.comment?.substring(0, 25)}...</span>
                    ) : (
                      <span
                        style={{
                          textDecoration: "line-through red",
                          color: "gray",
                        }}
                      >
                        {comment.comment?.substring(0, 25)}...
                      </span>
                    )}
                  </Typography>
                ) : (
                  <Typography sx={{ fontSize: "0.9rem", marginLeft: 1 }}>
                    <span
                      style={{
                        color: !reported[comment.id] ? "white" : "gray",
                        textDecoration: !reported[comment.id]
                          ? "none"
                          : "line-through red",
                      }}
                    >
                      {comment.comment?.substring(0, 10)}...
                    </span>
                  </Typography>
                )}
              </AccordionSummary>
              <AccordionDetails>
                <Grid container alignItems="center" justifyContent="center">
                  <Grid item xs={10}>
                    <Typography sx={{ fontSize: "0.9rem" }}>
                      {!reported[comment.id] ? (
                        <span>{comment.comment}</span>
                      ) : (
                        <span
                          style={{
                            textDecoration: "line-through red",
                            color: "gray",
                          }}
                        >
                          {comment.comment}
                        </span>
                      )}
                    </Typography>
                  </Grid>

                  <Grid item xs={1} style={{ textAlign: "center" }}>
                    {comment.userId === props.user.id_user && (
                      <IconButton
                        onClick={() => handleDeleteComment(comment)}
                        aria-label="Detele"
                      >
                        <div title="Delete your comment">
                          <DeleteIcon
                            style={{
                              color: "red",
                              fontSize: "1rem",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      </IconButton>
                    )}
                  </Grid>

                  <Grid item xs={1} style={{ textAlign: "center" }}>
                    <IconButton
                      onClick={() => handleReport(comment)}
                      aria-label="Report"
                    >
                      {reported[comment.id] ? (
                        <div title="Unreport this comment">
                          <ReportOffIcon sx={{ color: "red" }} />
                        </div>
                      ) : (
                        <div title="Report this comment">
                          <ReportIcon sx={{ color: "orange" }} />
                        </div>
                      )}
                    </IconButton>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <CardContent>
            <Typography variant="h6" style={{ textAlign: "justify" }}>
              There are no reviews available for this product.
            </Typography>
          </CardContent>
        )}
      </>
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      width={"100%"}
      mt={-4}
    >
      <Stack p={2}>
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
