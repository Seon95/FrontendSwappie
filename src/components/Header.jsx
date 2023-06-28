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
        padding: "0.5rem 2rem", // Adjust the padding here
        border: "1px solid ",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "black",
        fontFamily: "Clarkson, Helvetica, sans-serif",
        fontSize: "16px", // Adjust the font size here
        color: "white",
      }}
    >
      <Navbar.Brand as={Link} to="/" style={{ color: "white" }}>
        Swappie
      </Navbar.Brand>
      <Nav style={{ gap: "30px" }}>{/* Remaining code */}</Nav>
      <ButtonGroup>{/* Remaining code */}</ButtonGroup>
    </Navbar>
  );
};

export default Header;
