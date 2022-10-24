import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav } from "react-bootstrap";
import Logout from "./Logout";
import logo from "../smalllogo.gif";

function NavbarComponent({loggedIn}) {
  let loggedInCheck;

  //this is for when you first log in
  if (loggedIn === true) {
    loggedInCheck = true;
  } else {
    loggedInCheck = false;
  }

  //if you refresh, i'm checking to see if you're already there
  const userLoggedBefore = localStorage.getItem("username");
  if (userLoggedBefore === null || userLoggedBefore === '') {
  } else {
    loggedInCheck = true;
  }
  return (
    <Navbar bg="dark" variant="dark">
      <Container className="nav">
        <Navbar.Brand href="/"><img src={logo} alt="logo"/></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>  
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/restaurants">Restaurants</Nav.Link>
          {loggedInCheck ? null : <>
          <Nav.Link href="/signin">Sign In</Nav.Link>
          <Nav.Link href="/signup">Sign Up</Nav.Link></>}
        </Nav>
        {loggedInCheck ?  <Logout /> : null}
      </Container>
    </Navbar>
  );
}
export default NavbarComponent;
