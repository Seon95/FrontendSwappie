import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Grid from "./components/Grid";
import Categories from "./components/Categories";
import DetailPage from "./components/DetailPage";
import MyProfile from "./components/MyProfile";
import Notifications from "./components/Notifications";
import Search from "./components/Search";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState("");
  const [rerender, setRerender] = useState(0);
  const [items, setItems] = useState([]);

  const handleLogin = (data) => {
    setLoggedIn(true);
    setUserId(data.user.id);
    setUserName(data.user.username);
    setUserEmail(data.user.email);
    setToken(data.token);
    localStorage.setItem("userId", data.user.id);
  };

  return (
    <Router>
      <Header
        handleLogin={handleLogin}
        setToken={setToken}
        loggedIn={loggedIn}
        userName={userName}
      />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route
            path="/myprofile"
            element={<MyProfile userId={userId} token={token} />}
          />
          <Route
            path="/notifications"
            element={<Notifications userId={userId} token={token} />}
          />
        </Routes>
      </Container>
    </Router>
  );
}

function HomePage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://orca-app-ik7qo.ondigitalocean.app/api/users/`
      );
      const allItems = response.data.map((user) => user.items).flat();
      setItems(allItems);
      console.log(items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  return (
    <>
      <div className="categories-wrapper">
        <Categories />
      </div>
      <Container style={{ maxWidth: "800px" }}>
        <Row>
          <Col>
            <Search />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Grid items={items} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
