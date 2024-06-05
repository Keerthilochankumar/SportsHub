import React from "react";
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Signup from '../pages/signup';
import Signin from "../pages/signin";
import LandingPage from "../pages/landingpage";
import DashBoard from "../pages/dashboard/index";
import ProtectedRoute from "./ProtectedRoute";


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
  {
    path: "/dashboard",
    element: <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
             
  },
   {
    path: "/dashboard_",
    element:<DashBoard />
   }
]);
export default router;