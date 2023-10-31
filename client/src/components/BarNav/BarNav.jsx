import { useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { scoreStore } from "../../store/scoreStore";
import theme from "../../../theme";

function BarNav({ username }) {
  const { scoreCard, fetchScoreCard } = scoreStore();
  const { level, currentExp, nextlvlExp, quote } = scoreCard;
  const percentage = (currentExp / nextlvlExp) * 100;

  useEffect(() => {
    fetchScoreCard(username);
  }, [fetchScoreCard]);

  const getColorForLevel = (level) => {
    switch (level) {
      case "1":
        return "red";
      case "2":
        return "orange";
      case "3":
        return "yellow";
      case "4":
        return "green";
      case "5":
        return "blue";
      case "6":
        return "indigo";
      case "7":
        return "purple";
      case "8":
        return "pink";
      case "9":
        return "brown";
      case "10":
        return "grey";
      default:
        return "blue";
    }
  };

  const progressBarColor = getColorForLevel(level);

  return (
    <div style={{ display: "flex", marginRight: "2rem", marginLeft: "-2rem", fontFamily:theme.typography.fontFamily}}>
      <Typography variant="h7" sx={{ fontSize: "0.9rem" }}>
        Level {level}
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: "1rem",
          cursor: "default",
        }}
      >
        <Typography variant="h7" title={quote} sx={{ fontSize: "0.9rem" }}>
          {currentExp} / {nextlvlExp} XP
        </Typography>
        <LinearProgress
          variant="determinate"
          value={percentage}
          title={quote}
          sx={{
            borderRadius: 8,
            height: "0.8rem",
            width: "100%",
            backgroundColor:"lightgray",
            "& .MuiLinearProgress-bar": {
              backgroundColor: progressBarColor,
            },
          }}
        />
      </div>
    </div>
  );
}

export default BarNav;
