import React, { useState, useEffect } from "react";
import { Navbar, Nav, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import "../index.css";

const Header = ({ handleLogin, handleLogout, loggedIn }) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogoutClick = () => {
    handleLogout();
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <Navbar
      className="w-100 d-flex justify-content-between"
      expand="lg"
      style={{
        padding: "0.5rem 2rem",
        border: "1px solid ",
        backgroundColor: "black",
        fontFamily: "Clarkson, Helvetica, sans-serif",
        fontSize: "15px",
        color: "white",
      }}
    >
      <Navbar.Brand as={Link} to="/" style={{ color: "white" }}>
        Swappie
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav" className="justify-content-center">
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
            style={{ color: "white" }}
          >
            Notifications
          </Nav.Link>
          {loggedIn && (
            <Nav.Link
              as={Link}
              to="/myprofile"
              className="nav-link-spacing"
              style={{ color: "white" }}
            >
              My Profile
            </Nav.Link>
          )}
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
      </Navbar.Collapse>
      <ButtonGroup>
        {loggedIn ? (
          <>
            <span
              style={{
                marginRight: "1rem",
                color: "white",
                paddingTop: "5px",
              }}
            >
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
