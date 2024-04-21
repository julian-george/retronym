import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useUser } from "./context/userContext";
import FeedPage from "./pages/FeedPage";
import AuthPage from "./pages/AuthPage";

function Navigation() {
  const { user } = useUser();
  console.log(user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <FeedPage /> : <AuthPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Navigation;
