import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./themeAdmin";
import { TopBar } from "./scenes/Global/TopBar";
import { SideBar } from "./scenes/Global/SideBar";

export const AdminView = ({ children }) => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <main className="content" style={{display: 'flex'}}>
            <div>
              <SideBar />
            </div>
            <div style={{width: '100%'}}>
              <TopBar />
              {children}
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
