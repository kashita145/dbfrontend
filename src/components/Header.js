import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../Header.css";

function Header() {
  return (
    <div className="container " style={{ padding: 50 }}>
      <Navbar
        variant="dark"
        bg="dark"
        fixed="top"
        expand="lg"
        className="mr-auto"
      >
        <Navbar.Brand id="navbar">RTB DASHBOARD</Navbar.Brand>
        <Navbar.Toggle />
        <Nav>
          {" "}
          <Link to="./Login"> Logout </Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default Header;
