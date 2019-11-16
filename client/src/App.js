// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import FindSocials from "./pages/FindSocials/index";
import NoMatch from "./components/NoMatch";
import Container from 'react-bootstrap/Container';

function App() {
  // const { isAuthenticated, loginWithRedirect, logout, loading, user } = useAuth0();
  const { loading, user } = useAuth0();

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
          <Switch>
            <Route exact path="/" component={Landing} />
            <PrivateRoute exact path="/find-social" component={FindSocials} user={user}/>
            <Route component={NoMatch} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
