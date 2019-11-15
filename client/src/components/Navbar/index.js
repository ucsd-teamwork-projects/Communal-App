import React from "react";
import LogBtn from "../LogBtn";
import Nav from 'react-bootstrap/Nav';
import { useAuth0 } from "../../react-auth0-spa";

function Navbar() {
  const { user } = useAuth0();
  return (
    <Nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Communal
      </a>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <a className="nav-link" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/find-social">Explore Socials</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/profile">My Profile</a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <LogBtn />
        </form>
      </div>

      

    </Nav>
  );
}

export default Navbar;
