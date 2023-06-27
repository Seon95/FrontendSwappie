import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import "../index.css";

const Search = () => {
  const [categories, setCategories] = useState([]);
  const [searchName, setSearchName] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        "https://orca-app-ik7qo.ondigitalocean.app/api/items/search",
        {
          params: {
            name: searchName,
          },
        }
      );

      // Handle the response and perform any necessary actions with the search results
      console.log(response.data);
    } catch (error) {
      console.error("Error searching items:", error);
    }
  };

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

  return (
    <Form className="mt-3" onSubmit={handleSearch}>
      <Row className="align-items-center" style={{ display: "flex" }}>
        <Col>
          <Form.Control
            type="text"
            placeholder="Search item"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            required
          />
        </Col>
        <Col>
          <Form.Control as="select" defaultValue="Choose...">
            <option>Choose...</option>
            {categories.map((category) => (
              <option key={category.id}>{category.name}</option>
            ))}
          </Form.Control>
        </Col>
        <Col>
          <Form.Control as="select" defaultValue="Choose...">
            <option>Choose...</option>
            <option>City 1</option>
            <option>City 2</option>
            <option>City 3</option>
            <option>City 4</option>
          </Form.Control>
        </Col>
        <Col xs="auto">
          <Button
            style={{ backgroundColor: "black", borderColor: "black" }}
            type="submit"
          >
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Search;
