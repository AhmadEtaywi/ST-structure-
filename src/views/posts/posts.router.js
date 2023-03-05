import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Posts = lazy(() => import("./index"));
const Comments = lazy(() => import("./Comments"));

const Router = () => {
  return (
    <Suspense>
    <Routes>
      <Route path="" element={<Posts />} />
      <Route path="/comments" element={<Comments />} />
    </Routes>
    </Suspense>
  );
};
export default Router;
