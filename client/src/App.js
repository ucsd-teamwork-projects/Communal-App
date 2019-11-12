// src/App.js

import React from "react";
import AppBar from "./components/AppBar";
import { useAuth0 } from "./react-auth0-spa";

function App() {
  
  // const { isAuthenticated, loginWithRedirect, logout, loading, user } = useAuth0();
  const { loading } = useAuth0();

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div className="App">
      <header>
        <AppBar />
      </header>
    </div>
  );
}

export default App;