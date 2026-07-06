import { useEffect, useMemo, useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { authContext } from './Context'

import Home from './Pages/Home'
import PublicLayout from './Layout/PublicLayout'
import PrivateLayout from './Layout/PrivateLayout'
import SignOut from './Essentials/signOut'
import ForgetPassword from './Components/ForgetPassword'
import Loading from './Components/Loading'

import links from './Essentials/links'
import Dashboard from './Components/afterSignIn/Dashboard'

export default function App() {
  const [isLoading, setLoading] = useState(true)

  const [userCredentials, setUserCredentials] = useState({
    isLoggedIn: false,
    user: null,
  })

  useEffect(() => {
    const checkLogin = async () => {
      try {
        // Replace '/auth/me' with your actual authentication endpoint
        const response = await axios.get(
          `${links.serverName}/auth/me`,
          {
            withCredentials: true,
          }
        )
        console.log(response.data.message)
        setUserCredentials({
          isLoggedIn: true,
          user: response.data.user,
        })
      } catch (error) {
        console.error(error)

        // Don't show a toast if the user is simply not logged in
        if (error.response && error.response.status !== 401) {
          toast.error(error.response.data.message)
        }
      } finally {
        setLoading(false)
      }
    }

    checkLogin()
  }, [])

  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: '/',
          element: userCredentials.isLoggedIn ? (
            <PrivateLayout />
          ) : (
            <PublicLayout />
          ),

          children: [
            {
              index: true,
              element: userCredentials.isLoggedIn ? (
                <Dashboard />
              ) : (
                <Home />
              ),
            },
            {
              path: 'forget-password',
              element: <ForgetPassword />,
            },
            {
              path: 'sign-out',
              element: <SignOut />,
            },
          ],
        },

        {
          path: '*',
          element: <h1>404 - Page Not Found</h1>,
        },
      ]),
    [userCredentials.isLoggedIn]
  )

  if (isLoading) {
    return <Loading />
  }

  return (
    <authContext.Provider
      value={{
        userCredentials,
        setUserCredentials,
      }}
    >
      <ToastContainer
        position='top-right'
        autoClose={3000}
        newestOnTop
        pauseOnHover
      />

      <RouterProvider router={router} />
    </authContext.Provider>
  )
}