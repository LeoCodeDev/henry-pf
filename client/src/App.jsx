import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './views/router';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
