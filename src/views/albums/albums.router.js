import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Albums = lazy(() => import("./index"));
const Photos = lazy(() => import("./Photos"));

const Router = () => {
  return (
    <Routes>
      <Route path="*" exact={true} element={<Albums />} />
      <Route path="/photos" exact={true} element={<Photos />} />
    </Routes>
  );
};

export default Router;
