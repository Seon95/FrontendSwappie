import React from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import "../index.css";

const Search = ({ category }) => {
  console.log("jeeeeje" + category);
  return (
    <Form className="mt-3">
      <Row className="align-items-center" style={{ display: "flex" }}>
        <Col>
          <Form.Control type="text" placeholder="Search item" required />
        </Col>
        <Col>
          <Form.Control as="select" defaultValue="Choose...">
            <option>Choose...</option>
            <option>Category 1</option>
            <option>Category 2</option>
            <option>Category 3</option>
            <option>Category 4</option>
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
          <Button type="submit">Search</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Search;
