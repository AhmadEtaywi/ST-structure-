import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Posts = lazy(() => import("./index"));
// const Comments = lazy(() => import("./Comments"));
const CommentsPage = lazy(()=>import("./comments/CommentsPage"));

const Router = () => {
  return (
    <Suspense>
    <Routes>
      <Route path="*" exact={true} element={<Posts />} />
      {/* <Route path="/comments" element={<Comments />} /> */}
      <Route path="/comments" exact={true} element={<CommentsPage />} />

    </Routes>
    </Suspense>
  );
};
export default Router;
