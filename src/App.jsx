import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Grid from "./components/Grid";
import Categories from "./components/Categories";
import DetailPage from "./components/DetailPage";
import Search from "./components/Search";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ItemsApi from "./store/ItemsApi";

function App() {
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
  const { data, isLoading } = ItemsApi.useGetAllItemsQuery();
  console.log(data);

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
            <Grid />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
