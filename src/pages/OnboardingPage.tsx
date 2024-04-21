import { useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useUser } from "../context/userContext";

function OnboardingPage() {
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    user && (
      <div className="flex flex-col">
        <OAuth parent="ONBOARDING" />
        <button onClick={() => navigate("/")}>Continue</button>
      </div>
    )
  );
}

export default OnboardingPage;
