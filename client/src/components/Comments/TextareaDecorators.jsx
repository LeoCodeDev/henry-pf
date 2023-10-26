import {
  TextareaAutosize,
  Typography,
  IconButton,
  styled,
} from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import theme from "../../../theme";

const StyledTextarea = styled(TextareaAutosize)(() => ({
  width: "40vw",
  minWidth: "20rem",
  minHeight: "20vh",  
  resize: "none",
  fontFamily: theme.typography.fontFamily,
  fontSize: "1.2rem",
  fontWeight: 500,
  lineHeight: 1.5,
  padding: "12px",
  borderRadius: "8px",
  color: theme.palette.background_ligth,
  background: theme.palette.background,
  border: `3px solid ${theme.palette.primary}`,
  maxHeight: "100px",  

  "&:focus": {
    border: `3px solid ${theme.palette.primary}`,
    filter: "brightness(110%)",
  },
  "&:focus-visible": {
    outline: 0,
  },
}));

const StyledIconButton = styled(IconButton)({
  fontSize: "1.6rem",
  transform: "scaleX(-1)",
});

const IconContainer = styled("div")({
  display: "flex",
  gap: "1%",
  alignItems: "center",
  position: "relative",
});

const TextareaDecorators = ({ setComment, comment }) => {
  const addEmoji = (emoji) => () => {
    setComment(`${comment}${emoji}`);
  };

  const handleTextareaChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 200) {
      setComment(inputValue);
    }
  };

  return (
    <div>
      <IconContainer>
        <IconButton variant="outlined" color="default" onClick={addEmoji("👍")}>
          <ThumbUpIcon />
        </IconButton>
        <IconButton variant="outlined" color="default" onClick={addEmoji("👎")}>
          <ThumbDownIcon />
        </IconButton>
        <IconButton
          variant="outlined"
          color="default"
          onClick={addEmoji("💪")}
          style={{ filter: "grayscale(100%) brightness(200%)", fontSize: "1.3rem" }}
        >
          💪
        </IconButton>
        <StyledIconButton
          variant="outlined"
          color="default"
          onClick={addEmoji("🏋️")}
          style={{ filter: "grayscale(100%) brightness(200%)", fontSize: "1.3rem" }}
        >
          🏋️
        </StyledIconButton>
        <StyledIconButton
          variant="outlined"
          color="default"
          onClick={addEmoji("🏃")}
        >
          <DirectionsRunIcon />
        </StyledIconButton>
        <StyledIconButton
          variant="outlined"
          color="default"
          onClick={addEmoji("🚴")}
        >
          <DirectionsBikeIcon />
        </StyledIconButton>
        <StyledIconButton
          variant="outlined"
          color="default"
          onClick={addEmoji("🧘")}
        >
          <SelfImprovementIcon />
        </StyledIconButton>
      </IconContainer>
      <StyledTextarea
        placeholder="Describe your experience here..."
        value={comment}
        onChange={handleTextareaChange}
      />
      <Typography variant="body2" sx={{ ml: "auto", color: "gray" }}>
        {comment.length} / 200 character(s)
      </Typography>
    </div>
  );
};

export default TextareaDecorators;
