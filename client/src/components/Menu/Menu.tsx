import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import "./Menu.scss";

export default function Menu() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid className="wrapper">
        <Link to="/" className="logo">
          ArroundTheWorld
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Link to="/" className="menu-link">
              My Jorneys
            </Link>
            <Link to="/addnewjorney" className="menu-link">
              Add New Jorney
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
