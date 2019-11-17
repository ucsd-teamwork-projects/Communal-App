import React from "react";
import LogBtn from "../LogBtn";
import { useAuth0 } from "../../react-auth0-spa";
import { Navbar, Nav, NavDropdown, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Logo from "../../assets/img/logo.png";
import "./style.css";

function NavMenu() {
  const { user, isAuthenticated } = useAuth0();
  return (
    <Navbar style={{"zIndex": "1000"}} className="bg" expand="lg">
      <Navbar.Brand href="/">
        <img
          src={Logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        {` Communal`}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          {isAuthenticated && (
            <React.Fragment>
              <Nav.Link as={Link} to="/profile">My Profile</Nav.Link>
              <NavDropdown title="Socials" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/find-social">Explore Socials</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/add-social">Add New Social</NavDropdown.Item>
              </NavDropdown>
            </React.Fragment>
          )}
        </Nav>
        <Form inline>
          <span className="mr-4">{user?"Welcome, " + user.name:""}</span>
          <LogBtn />
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavMenu;
