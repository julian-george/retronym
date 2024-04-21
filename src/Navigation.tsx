import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useUser } from "./context/userContext";
import FeedPage from "./pages/FeedPage";
import AuthPage from "./pages/AuthPage";
import OnboardingPage from "./pages/OnboardingPage";
import OAuthRedirectPage from "./pages/OAuthRedirectPage";

function Navigation() {
  const { user, tokenLoading } = useUser();

  const router = createBrowserRouter([
    {
      path: "/",
      element: tokenLoading ? <div /> : <FeedPage />,
    },
    { path: "/auth", element: <AuthPage /> },
    { path: "/onboarding", element: <OnboardingPage /> },
    { path: "/oauth", element: <OAuthRedirectPage /> },
  ]);
  return <RouterProvider router={router} />;
}

export default Navigation;
