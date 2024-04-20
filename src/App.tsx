import React from "react";
import { UserProvider, useUser } from "./context/userContext";
import Navigation from "./Navigation";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Navigation />
      </UserProvider>
    </div>
  );
}

export default App;
