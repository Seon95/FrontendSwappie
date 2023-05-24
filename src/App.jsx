import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Grid from "./components/Grid";
import Categories from "./components/Categories";
import DetailPage from "./components/DetailPage";
import Search from "./components/Search";
import ItemsApi from "./store/ItemsApi";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css"; // Import your custom CSS file

function App() {
  const { data, isLoading, isError, error } = ItemsApi.useGetAllItemsQuery();

  if (isError) {
    console.error("An error occurred: ", error);
    return;
  }

  console.log(data);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

function HomePage() {
  return (
    <>
      <Categories className="mt-3"></Categories>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Search className="mb-3" style={{ marginBottom: "200px" }} />
            <Grid className="mb-3" style={{ marginBottom: "300px" }} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
