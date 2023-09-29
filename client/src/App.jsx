import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './views/router';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;