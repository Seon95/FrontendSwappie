import React from "react";
import { Navbar, Nav, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import "../index.css";
import { useState, useEffect } from "react";

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
  };

  return (
    <Navbar
      className="w-100"
      expand="lg"
      style={{
        padding: "1rem 2rem",
        border: "1px solid ",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "black",
        fontFamily: "Clarkson, Helvetica, sans-serif",
        fontSize: "18px",
        color: "white",
      }}
    >
      <Navbar.Brand as={Link} to="/" style={{ color: "white" }}>
        Swappie
      </Navbar.Brand>
      <Nav style={{ gap: "30px" }}>
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
