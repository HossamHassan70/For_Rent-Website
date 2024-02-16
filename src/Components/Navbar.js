import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <Navbar expand="lg" fixed="top" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/" style={{ marginLeft: "100px" }}>
        FORENT
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav" className="justify-content-end">
        <Nav>
          <Nav.Link as={Link} to="/login">
            <b>Login</b>
          </Nav.Link>
          <Nav.Link as={Link} to="/register">
            <b>Signup</b>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
