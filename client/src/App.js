// src/App.js

import React from "react";
import AppBar from "./components/AppBar";
import { useAuth0 } from "./react-auth0-spa";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TestApp from "./pages/TestApp";
import PrivateRoute from "./components/PrivateRoute";
import Link from "@material-ui/core/Link";

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
          <AppBar />
        </header>
        <Link href="/TestApp">
          protected page
        </Link>
        <Switch>
          <PrivateRoute exact path="/TestApp" component={TestApp} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
