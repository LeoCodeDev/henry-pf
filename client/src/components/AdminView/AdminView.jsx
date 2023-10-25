import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./themeAdmin";
import { TopBar } from "./scenes/Global/TopBar";
import { SideBar } from "./scenes/Global/SideBar";
import styles from './Css/AdminView.module.css';

export const AdminView = ({ children }) => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App" style={{width: '100%'}}>
          <main className="content" style={{display: 'flex'}}>
            <>
              <SideBar />
            </>
            <div style={{width: '100%'}}>
              <TopBar />
              <div className={styles.children}  style={{overflow: 'scroll', height: '91vh'}}>
              {children} 
              </div>
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
