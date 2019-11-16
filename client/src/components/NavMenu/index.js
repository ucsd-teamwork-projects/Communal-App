import React from "react";
import LogBtn from "../LogBtn";
import { useAuth0 } from "../../react-auth0-spa";
import { Navbar, Nav, NavDropdown, Form } from 'react-bootstrap';

function NavMenu() {
  const { user } = useAuth0();
  return (
    <Navbar bg="primary" expand="lg">
      <Navbar.Brand href="/">Communal</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/profile">My Profile</Nav.Link>
          <NavDropdown title="Socials" id="basic-nav-dropdown">
            <NavDropdown.Item href="/find-social">Explore Socials</NavDropdown.Item>
            <NavDropdown.Item href="/add social">Add New Social</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <span className="mr-2">{user?"Welcome, " + user.name:""}</span>
          <LogBtn />
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavMenu;
