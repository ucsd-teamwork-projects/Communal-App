import React from "react";
import LogBtn from "../LogBtn";
import { useAuth0 } from "../../react-auth0-spa";
import { Navbar, Nav, NavDropdown, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from "../../assets/img/logo.png";
import "./style.css";

function NavMenu(props) {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Navbar fixed="top" style={{"zIndex": "1000"}} className="bg" expand="lg" collapseOnSelect>
      <Navbar.Brand href="/">
        <img
          src={Logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        <span style={{"fontFamily": "'Bungee', cursive"}}>{` Communal`}</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link eventKey="1" as={Link} to="/">Home</Nav.Link>
          {isAuthenticated && (
            <React.Fragment>
              <Nav.Link eventKey="2" as={Link} to="/profile" onClick={props.updateUser}>My Profile</Nav.Link>
              <NavDropdown title="Socials" id="basic-nav-dropdown" onClick={props.updateUser}>
                <NavDropdown.Item eventKey="3" as={Link} to="/find-social" onClick={props.updateUser}>Explore Socials</NavDropdown.Item>
                <NavDropdown.Item eventKey="4" as={Link} to="/add-social" onClick={props.updateUser}>Add New Social</NavDropdown.Item>
              </NavDropdown>
            </React.Fragment>
          )}
          <Nav.Link eventKey="5" as={Link} to="/about">About</Nav.Link>
        </Nav>
        <Form inline style={{"justifyContent": "left"}}>
          {
            user? 
            <span className="mr-4">{"Welcome, " + user.name}</span>
            : ""
          }
          <LogBtn />
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavMenu;
