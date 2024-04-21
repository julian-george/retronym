import OAuth from "../components/OAuth";
import { useUser } from "../context/userContext";

function OnboardingPage() {
  const { user } = useUser();
  return user && <OAuth parent="ONBOARDING" />;
}

export default OnboardingPage;
