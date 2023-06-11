import React from "react";
import { Navbar, Nav, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import "../index.css";

const Header = ({ handleLogin, loggedIn, userName }) => {
  return (
    <Navbar
      className="w-100"
      bg="dark"
      variant="dark"
      expand="lg"
      style={{
        padding: "0.5rem 1rem",
        border: "3px solid blue",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Navbar.Brand as={Link} to="/" style={{ marginRight: "2rem" }}>
        <img
          src="/src/assets/logo.png"
          width="50"
          height="50"
          className="d-inline-block align-top"
          alt="Logo"
        />
      </Navbar.Brand>
      <Nav>
        <Nav.Link className="nav-link-spacing" href="#help">
          Help
        </Nav.Link>
        <Nav.Link className="nav-link-spacing" href="#chat">
          Chat
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/notifications"
          className="nav-link-spacing"
          href="#notifications"
        >
          Notifications
        </Nav.Link>
        {loggedIn ? (
          <Nav.Link as={Link} to="/myprofile" className="nav-link-spacing">
            My Profile
          </Nav.Link>
        ) : null}
      </Nav>
      <ButtonGroup>
        {loggedIn ? (
          <span style={{ marginRight: "1rem", color: "white" }}>
            Welcome, {userName}
          </span>
        ) : (
          <>
            <LoginModal handleLogin={handleLogin} />
            <RegisterModal />
          </>
        )}
      </ButtonGroup>
    </Navbar>
  );
};

export default Header;
