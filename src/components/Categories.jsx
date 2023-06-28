import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Col } from "react-bootstrap";

const Categories = ({ setCategory, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Add logic here if you want to preselect a category initially
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCategory(categoryId);
  };

  return (
    <div className="categories-wrapper">
      <Form>
        <Form.Group>
          <Form.Check
            type="radio"
            id="category-all"
            label={
              <Form.Check.Label
                className="custom-label"
                style={{
                  marginBottom: "20px",
                  fontWeight: 500,
                  fontSize: "15px",
                }}
              >
                All Categories
              </Form.Check.Label>
            }
            value=""
            checked={selectedCategory === ""}
            onChange={() => handleCategoryChange("")}
            style={{ marginBottom: "10px" }}
          />
          {categories.map((category) => (
            <Form.Check
              key={category.id}
              type="radio"
              id={`category-${category.id}`}
              label={
                <Form.Check.Label
                  className="custom-label"
                  style={{
                    marginBottom: "20px",
                    fontWeight: 500,
                    fontSize: "15px",
                  }}
                >
                  {category.name}
                </Form.Check.Label>
              }
              value={category.id}
              checked={selectedCategory === category.id}
              onChange={() => handleCategoryChange(category.id)}
              style={{ marginBottom: "10px" }}
            />
          ))}
        </Form.Group>
      </Form>
    </div>
  );
};

export default Categories;
