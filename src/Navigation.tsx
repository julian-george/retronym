import React, { ReactNode } from "react";
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
import PageWrapper from "./components/PageWrapper";

const authRedirect = <Navigate to="/auth" replace />;
const homeRedirect = <Navigate to="/" replace />;
const SafeWrapper: React.FC<{ children: ReactNode; userBlind?: boolean }> = ({
  children,
  userBlind,
}) => {
  const { user, tokenLoading } = useUser();
  if (tokenLoading || !children) return <></>;
  else if (!user && !userBlind) return authRedirect;
  else return <>{children}</>;
};

function Navigation() {
  const { user } = useUser();
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <SafeWrapper>
          <FeedPage />
        </SafeWrapper>
      ),
    },
    {
      path: "/auth",
      element: (
        <SafeWrapper userBlind>
          {user ? homeRedirect : <AuthPage />}
        </SafeWrapper>
      ),
    },
    {
      path: "/onboarding",
      element: (
        <SafeWrapper>
          <OnboardingPage />
        </SafeWrapper>
      ),
    },
    {
      path: "/preferences",
      element: (
        <SafeWrapper>
          <PreferencesPage />
        </SafeWrapper>
      ),
    },
    {
      path: "/oauth",
      element: (
        <SafeWrapper>
          <OAuthRedirectPage />
        </SafeWrapper>
      ),
    },
    {
      path: "*",
      element: (
        <PageWrapper>
          <h1 className="text-xl">404</h1>
          <div>Whoopsie daisies!!!!</div>
        </PageWrapper>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Navigation;
