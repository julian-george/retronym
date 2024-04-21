import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useUser } from "./context/userContext";
import FeedPage from "./pages/FeedPage";
import AuthPage from "./pages/AuthPage";
import OnboardingPage from "./pages/OnboardingPage";

function Navigation() {
  const { user, tokenLoading } = useUser();
  const router = createBrowserRouter([
    {
      path: "/",
      element: tokenLoading ? <div /> : <FeedPage />,
    },
    { path: "/auth", element: <AuthPage /> },
    { path: "/onboarding", element: <OnboardingPage /> },
  ]);
  return <RouterProvider router={router} />;
}

export default Navigation;
