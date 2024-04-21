import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useUser } from "./context/userContext";
import FeedPage from "./pages/FeedPage";
import AuthPage from "./pages/AuthPage";
import OnboardingPage from "./pages/OnboardingPage";
import PreferencesPage from "./pages/PreferencesPage";
import OAuthRedirectPage from "./pages/OAuthRedirectPage";

const authRedirect = <Navigate to="/auth" replace />;
const homeRedirect = <Navigate to="/" replace />;
function Navigation() {
  const { user, tokenLoading } = useUser();
  const router = createBrowserRouter([
    {
      path: "/",
      element: tokenLoading ? <div /> : <FeedPage />,
    },
    {
      path: "/auth",
      element: tokenLoading || !user ? <AuthPage /> : homeRedirect,
    },
    {
      path: "/onboarding",
      element: !tokenLoading || user ? <OnboardingPage /> : authRedirect,
    },
    {
      path: "/preferences",
      element: !tokenLoading || user ? <PreferencesPage /> : authRedirect,
    },
    {
      path: "/oauth",
      element: !tokenLoading || user ? <OAuthRedirectPage /> : authRedirect,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Navigation;
