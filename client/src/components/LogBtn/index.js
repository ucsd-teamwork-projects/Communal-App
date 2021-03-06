import React from "react";
import { useAuth0 } from "../../react-auth0-spa";

const LogBtn = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {/* render if user is logged out */}
      {!isAuthenticated && (
        <button className="btn btn-dark" onClick={() => loginWithRedirect({
          /* THIS BREAKS LOGIN ON HEROKU FOR SOME REASON */
          // redirect_uri: `${window.location.protocol}//${window.location.host}/profile`
          })}>
          LOGIN
        </button>
      )}

      {/* render if user is logged in */}
      {isAuthenticated && 
          <button className="btn btn-dark" onClick={() => logout({
            /* THIS BREAKS LOGIN ON HEROKU FOR SOME REASON */
            // redirect_uri: `${window.location.protocol}//${window.location.host}/`
            })}>
            LOGOUT
          </button>
      }
    </div>
  );
};

export default LogBtn
