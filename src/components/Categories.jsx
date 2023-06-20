import React, { useState, useEffect } from "react";
import axios from "axios";

const Categories = ({ setCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  console.log("mmm" + categories);
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
      {categories.map((category) => (
        <div key={category.id} style={{ marginBottom: "30px" }}>
          <label>
            <input
              type="radio"
              name="category"
              value={category.id}
              checked={selectedCategory === category.id}
              onChange={() => handleCategoryChange(category.id)}
            />
            {category.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Categories;
