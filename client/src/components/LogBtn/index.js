import React from "react";
import { useAuth0 } from "../../react-auth0-spa";

const LogBtn = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  // componentDidMount() {
  //   console.log('GrandChild did mount.');
  // }

  return (
    <div>
      {/* render if user is logged out */}
      {!isAuthenticated && (
        <button className="btn btn-dark" onClick={() => loginWithRedirect({})}>
          LOGIN
        </button>
      )}

      {/* render if user is logged in */}
      {isAuthenticated && 
          <button className="btn btn-dark" onClick={() => logout()}>
            LOGOUT
          </button>
      }
    </div>
  );
};

export default LogBtn
