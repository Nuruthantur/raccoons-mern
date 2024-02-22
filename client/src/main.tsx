import React from "react";
import ReactDOM from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.tsx";
// import dotenv from "dotenv";

//pages
import Error404 from "./pages/Error404.tsx";
import Layout from "./components/Layout.tsx";
import Homepage from "./pages/Homepage.tsx";
// import AuthPage from "./pages/AuthPage.tsx";
import Users from "./pages/Users.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import TasksPage from "./pages/TasksPage.tsx";
import Signup from "./pages/Signup.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import Profile from "./pages/Profile.tsx";
//styling
import "./index.css";
import TaskPage from "./pages/TasksPageNew.tsx";
import { ThemeProvider } from "./context/themeContext.tsx";
import Profile2 from "./pages/Profile2.tsx";

const router = createBrowserRouter([
  {
    element: (
      <AuthContextProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Layout>
            <Outlet />
          </Layout>
        </ThemeProvider>
      </AuthContextProvider>
    ),
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/sign-up",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      // {
      //   path: "/auth",
      //   element: <AuthPage />,
      // },
      {
        path: "/profile",
        element: <Profile2 />,
      },
      {
        path: "/tasks",
        element: <TasksPage />,
      },
      {
        path: "/task",
        element: <TaskPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
