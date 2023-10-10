import styles from "./OrderPlaced.module.css";
import { ThemeProvider } from "@mui/system";
import theme from "../../../theme.js";
import { Button, Container, Paper } from "@mui/material";
import imgShopping from "../../assets/images/shopping.gif";
import { Link } from "react-router-dom";
import { useAuthStore } from '../../store/authStore.js';


export const OrderPlaced = () => {
  const { user } = useAuthStore();
  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          marginTop: "12vh",
        }}
      >
        <Paper
          elevation={8}
          sx={{
            padding: "8px",
            width: { xs: "100%", sm: "80%", lg: "80%" },
            borderRadius: "1rem",
          }}
        >
          <div className={styles.containerMain}>
            <div className={styles.imgContain}>
              <img
                src={imgShopping}
                alt="order-placed"
                border="0"
                width="100%"
              />
            </div>
            <div className={styles.titleContain}>
              <h1>✔️ Thank you for shopping!</h1>
              <div className={styles.textContain}>
                <h2>What's next?</h2>
                <h3>
                  ◾ We will send confirmation of the order and information
                  about its progress by {user.email}
                </h3>
                <h3>
                  ◾ The order will be processed after your payment is
                  confirmed.
                </h3>
                <h3>
                  ◾ In case of problemswith the payment, you will reiceve a new
                  link to renew the payment to the e-mail address provided.
                </h3>
                <h3>
                  ◾ Please feel free to contact us if you have any questions.
                </h3>
              </div>
              <Link style={{ textDecoration: "none" }} to="/home">
                <div className={styles.btnContain}>
                  <Button
                    variant="contained"
                    sx={{
                      width: { xs: "92%", sm: "50%" },
                      margin: { xs: "1rem", sm: "0.7rem" },
                      fontSize: { xs: "0.8rem", sm: "0.8rem", lg: "1rem" },
                    }}
                  >
                    Home
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};
