import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Categories from "./Categories";
import Grid from "./Grid";
import Search from "./Search";

function HomePage() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://orca-app-ik7qo.ondigitalocean.app/api/categories"
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
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
        <Categories setCategory={setCategory} categories={categories} />
      </div>
      <Container style={{ maxWidth: "900px" }}>
        <Row>
          <Col>
            <Search category={category} categories={categories} />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Grid items={items} category={category} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
