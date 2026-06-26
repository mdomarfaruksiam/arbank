import { useState } from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router";

import { authContext } from "./context";
import authUser from "./Essentials/authUser";

import Home from "./Pages/Home";
import PublicLayout from "./Layout/PublicLayout";
import PrivateLayout from "./Layout/PrivateLayout";


export default function App() {
  const { isLoggedIn } = authUser()
  return (
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
            ]
          },
          { path: "*", element: <h1>not found</h1> }
        ])} />
      } />
  );
}