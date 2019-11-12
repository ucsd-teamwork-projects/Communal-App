import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const LogBtn = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <div>
      {/* render if user is logged out */}
      {!isAuthenticated && (
        <Button variant="contained" color="primary" onClick={() => loginWithRedirect({})}>
          Log in
        </Button>
      )}

      {/* render if user is logged in */}
      {isAuthenticated && 
          <Button variant="contained" color="primary" onClick={() => logout()}>
            Logout, {user.name}
          </Button>
      }
    </div>
  );
};

export default LogBtn;