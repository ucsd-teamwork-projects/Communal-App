// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import UserPage from "./pages/UserPage";
import FindSocial from "./pages/FindSocial";
import NoMatch from "./components/NoMatch";
import { Container } from "./components/Grid";

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
            <PrivateRoute exact path="/" component={Landing} />
            <PrivateRoute exact path="/find-social" component={FindSocial} />
            <PrivateRoute exact path="/UserPage" component={UserPage} />
            <Route component={NoMatch} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
