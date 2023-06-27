import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Col } from "react-bootstrap";

const Categories = ({ setCategory, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCategory(categoryId);
  };

  return (
    <div className="categories-wrapper">
      {/* <h3 style={{ marginBottom: "20px", textDecoration: "underline" }}>
        Categories
      </h3> */}
      <Form>
        <Form.Group>
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
                    fontSize: "17px",
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
