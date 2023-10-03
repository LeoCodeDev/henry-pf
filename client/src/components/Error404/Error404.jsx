import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Error404.module.css";
import HomeIcon from "@mui/icons-material/Home";

const Error404 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/error404");
    // eslint-disable-next-line
  }, []);
  const handleHomeClick = () => {
    navigate("/home");
  };

  return (
    <div className={styles.container}>
      <div className={styles.error} data-testid="error404-component">
        <h1 className={styles.myh1}>404</h1>
        <h2 className={styles.myh2}>Error: page not found</h2>
        <p className={styles.myp}>
          Sorry, the page you are looking for does not exist.
        </p>
        <div title="Back to Home">
          <HomeIcon
            className={styles.mybutton}
            sx={{ fontSize: "48px" }}
            onClick={handleHomeClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Error404;
