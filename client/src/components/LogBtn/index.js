import React from "react";
import { useAuth0 } from "../../react-auth0-spa";

const LogBtn = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <div>
      {/* render if user is logged out */}
      {!isAuthenticated && (
        <button className="btn btn-outline-success" onClick={() => loginWithRedirect({})}>
          Log in
        </button>
      )}

      {/* render if user is logged in */}
      {isAuthenticated && 
          <button className="btn btn-outline-success" onClick={() => logout()}>
            Logout, {user.name}
          </button>
      }
    </div>
  );
};

export default LogBtn;