import { useState } from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { authContext } from "./Context";
import authUser from "./Essentials/authUser";

import Home from "./Pages/Home";
import PublicLayout from "./Layout/PublicLayout";
import PrivateLayout from "./Layout/PrivateLayout";
import SignOut from "./Essentials/signOut";
import ForgetPassword from "./Components/ForgetPassword";


export default function App() {
  const { isLoggedIn } = authUser()
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        pauseOnHover />
      <authContext.Provider
        value={authUser()}
        children={<RouterProvider
          router={createBrowserRouter([
            {
              path: "/",
              element:
                isLoggedIn ? <PrivateLayout /> : <PublicLayout />,
              children: [
                {
                  index: true,
                  element: isLoggedIn ? <>loggedIn</> : <Home />
                },
                {
                  path: '/sign-out',
                  element: <SignOut />
                },
                {
                  path: '/forget-password',
                  element: <ForgetPassword />
                },
                {
                }
              ]
            },
            { path: "*", element: <h1>not found</h1> }
          ])} />
        } /></>
  );
}