import React from "react";
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Signup from '../pages/signup';
import Signin from "../pages/signin";
import LandingPage from "../pages/landingpage";



const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
]);
export default router;