import React from "react";
import LogBtn from "../LogBtn";
import Nav from 'react-bootstrap/Nav';

function Navbar() {
  return (
    <Nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Communal
      </a>

      
      <LogBtn />
      
    </Nav>
  );
}

export default Navbar;
