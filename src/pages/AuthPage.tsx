import React, { useCallback, useContext, useState } from "react";
import { useUser } from "../context/userContext";
import PageWrapper from "../components/PageWrapper";

const LoginForm: React.FC = () => {
  const { login } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const result = await login(username, password);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

const SignupForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      //   onSignupFail('Passwords do not match.');
      return;
    }
    setIsLoading(true);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-col">
      <label htmlFor="username">Username</label>
      <input
        id="username"
        value={username}
        onChange={handleUsernameChange}
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        required
      />
      <button
        type="submit"
        disabled={isLoading || confirmPassword !== password}
      >
        {isLoading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
};

enum AuthState {
  LoggingIn,
  Registering,
}

function AuthPage() {
  const [authState, setAuthState] = useState<AuthState>(AuthState.LoggingIn);
  const toggleAuthState = useCallback(() => {
    setAuthState((prev) =>
      prev == AuthState.LoggingIn ? AuthState.Registering : AuthState.LoggingIn
    );
  }, [setAuthState]);
  return (
    <PageWrapper>
      <div className="bg-gray-100 font-serif p-8">
        {authState == AuthState.LoggingIn ? <LoginForm /> : <SignupForm />}
        <div onClick={toggleAuthState}>
          {authState == AuthState.LoggingIn ? "Create an account" : "Log in"}
        </div>
      </div>
    </PageWrapper>
  );
}

export default AuthPage;
