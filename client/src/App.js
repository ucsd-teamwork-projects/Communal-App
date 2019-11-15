// src/App.js

import React from "react";
import { useAuth0 } from "./react-auth0-spa";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import TestApp from "./pages/TestApp";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import { Container } from "./components/Grid"

function App() {
  // const { isAuthenticated, loginWithRedirect, logout, loading, user } = useAuth0();
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <header>
          <Navbar />
        </header>
        <Container>
          <a href="/TestApp">
            protected page
          </a>
          <Switch>
            <PrivateRoute exact path="/TestApp" component={TestApp} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
