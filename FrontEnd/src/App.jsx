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


export default function App() {
  const { isLoggedIn } = authUser()
  return (
    <>
      <ToastContainer />
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
                  path: '/forgot-password',
                  element: <h1>forgot password</h1>
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