import React from "react";
import { Navbar, Nav, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import "../index.css";

const Header = ({ handleLogin, handleLogout, loggedIn, userName }) => {
  const handleLogoutClick = () => {
    handleLogout();
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userName");
  };

  return (
    <Navbar
      className="w-100"
      expand="lg"
      style={{
        padding: "1rem 2rem",
        border: "1px solid #2DC0D1",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "black",
        fontFamily: "Clarkson, Helvetica, sans-serif", // Set the font family
        fontSize: "18px",
        color: "white",
      }}
    >
      SWAPPIE
      <Navbar.Brand as={Link} to="/">
        {/* <img
          src="/src/assets/logo.png"
          width="50"
          height="50"
          className="d-inline-block align-top"
          alt="Logo"
        /> */}
      </Navbar.Brand>
      <Nav>
        <Nav.Link
          className="nav-link-spacing"
          href="#chat"
          style={{ color: "white" }}
        >
          Chat
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/notifications"
          className="nav-link-spacing"
          href="#notifications"
          style={{ color: "white", paddingRight: "50px", paddingLeft: "50px" }}
        >
          Notifications
        </Nav.Link>
        {loggedIn ? (
          <Nav.Link
            as={Link}
            to="/myprofile"
            className="nav-link-spacing"
            style={{ color: "white" }}
          >
            My Profile
          </Nav.Link>
        ) : null}
        <Nav.Link
          as={Link}
          to="/aboutus"
          className="nav-link-spacing"
          href="#aboutus"
          style={{ color: "white" }}
        >
          About Us
        </Nav.Link>
      </Nav>
      <ButtonGroup>
        {loggedIn ? (
          <>
            <span style={{ marginRight: "1rem", color: "white" }}>
              Welcome, {userName}
            </span>
            <button className="btn btn-danger" onClick={handleLogoutClick}>
              Logout
            </button>
          </>
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
