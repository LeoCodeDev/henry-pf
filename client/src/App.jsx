import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './views/router';

const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;