import React from "react";
import { UserProvider, useUser } from "./context/userContext";
import Navigation from "./Navigation";

function App() {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
}

export default App;
