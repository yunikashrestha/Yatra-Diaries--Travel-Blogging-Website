import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import HomePage from "./routes/HomePage.jsx";
import PostListPage from "./routes/PostListPage.jsx";
import LoginPage from "./routes/LoginPage.jsx";
import RegisterPage from "./routes/RegisterPage.jsx";
import Write from "./routes/Write.jsx";
import SinglePostPage from "./routes/SinglePostPage.jsx";
import MainLayout from "./Layout/MainLayout.jsx";
import LandingPage from "./routes/LandingPage.jsx";
import UpdatePage from "./routes/UpdatePage.jsx";
import AboutPage from "./routes/About.jsx";

const router = createBrowserRouter([
 
    {
      path:'/landingPage',
      element:<LandingPage/>
    },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/posts/:category",
        element: <PostListPage />,
      },
      {
        path: "/:id",
        element: <SinglePostPage />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path:"/update",
        element:<UpdatePage/>
      },
      {
        path:"/about",
        element:<AboutPage/>
      }
     
  
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>
);
