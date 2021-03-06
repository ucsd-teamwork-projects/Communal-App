// src/App.js

import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";
import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import NavMenu from "./components/NavMenu";
import Landing from "./pages/Landing/index";
import FindSocials from "./pages/FindSocials/index";
import Social from "./pages/Social/index";
import About from "./pages/About/About";
import AddSocial from "./pages/AddSocial";
import UserPage from "./pages/UserPage";
import NoMatch from "./components/NoMatch";
import Container from 'react-bootstrap/Container';
import API from './utils/API';
import "./App.css";

function App() {
  const { loading, user, isAuthenticated } = useAuth0();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    updateUser();
  }, [loading]);

  const updateUser = () => {
    // Create user account in our DB if one does new exist
    if(isAuthenticated && user && !loading){
      API.getUser(user.email).then(userQry => {
        if(userQry.data === null){
          //create user account
          API.postNewUser(user.name, user.email, user.picture)
          .then(newUserQry => { 
            setUserInfo(newUserQry.data);
          });
        } else {
          setUserInfo(userQry.data);
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="App text-center">
        <NavMenu />
        <Container className="mt-5">
          <Loading />
        </Container>
      </div>
    );
  }

  return (
      <div className="App">
        <header>
          <NavMenu updateUser={updateUser}/>
        </header>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/about" component={About} />
          <PrivateRoute exact path="/add-social" component={AddSocial} user={userInfo}/>
          <PrivateRoute exact path="/profile" component={UserPage} user={userInfo}/>
          <PrivateRoute exact path="/find-social" component={FindSocials} user={userInfo}/>
          <PrivateRoute exact path="/socials/:id" component={Social} user={userInfo}/>
          <Route component={NoMatch} />
        </Switch>
      </div>
  );
}

export default App;
