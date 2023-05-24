import React, { useState } from "react";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["Category 1", "Category 2", "Category 3", "Category 4"];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      {categories.map((category, index) => (
        <div key={index}>
          <label>
            <input
              type="radio"
              name="category"
              value={category}
              checked={selectedCategory === category}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Categories;
