import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Router from './views/router'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8000'

axios.defaults.baseURL = baseUrl

axios.interceptors.request.use(function (config) {
  config.withCredentials = true;
  return config;
});

import { ThemeProvider } from '@mui/material/styles'
import theme from '../theme'

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
