import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Router from './views/router'
import React from 'react'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
