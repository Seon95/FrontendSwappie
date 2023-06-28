import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MyProfile from "./components/MyProfile";
import Notifications from "./components/Notifications";
import AboutUs from "./components/AboutUs";
import HomePage from "./components/HomePage";
import DetailPage from "./components/DetailPage";
import "./index.css";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    // Check if the userId exists in localStorage
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = (data) => {
    setLoggedIn(true);
    setUserId(data.user.id);
    setUserName(data.user.username);
    setToken(data.token);
    localStorage.setItem("userId", data.user.id);
    localStorage.setItem("token", data.token);
    localStorage.setItem("userName", data.user.username);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserName("");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userId");
  };

  return (
    <Router>
      <Header
        handleLogin={handleLogin}
        setToken={setToken}
        loggedIn={loggedIn}
        userName={userName}
        handleLogout={handleLogout}
      />
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
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
