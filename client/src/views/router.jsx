import { Route, Routes } from 'react-router-dom';
import viewsData from './viewsData';
import { useAuthStore } from "../store/authStore";
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Router = () => {
  const { isLogged } = useAuthStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLogged) {
      navigate("/");
    }
  }, [isLogged]);

  const pageRoutes = viewsData.map(({ path, title, element }) => {
    return <Route key={title} path={`/${path}`} element={element} />;
  });

  return <Routes>{pageRoutes}</Routes>;
};

export default Router;