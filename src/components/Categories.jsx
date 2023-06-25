import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Col } from "react-bootstrap";

const Categories = ({ setCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
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

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCategory(categoryId);
  };

  return (
    <div className="categories-wrapper">
      <h3 style={{ marginBottom: "20px", textDecoration: "underline" }}>
        Categories
      </h3>
      <Form>
        <Form.Group>
          {categories.map((category) => (
            <Form.Check
              key={category.id}
              type="radio"
              id={`category-${category.id}`}
              label={
                <Form.Check.Label className="custom-label">
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
