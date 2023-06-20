import React from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import DetailPage from "./DetailPage";

const Grid = ({ items, category }) => {
  if (!items || items.length === 0) {
    return <div>Loading...</div>;
  }

  const navigate = useNavigate();

  const filteredItems = category
    ? items.filter((item) => item.category_id === category)
    : items;

  const handleItemClick = (itemId) => {
    navigate(`/detail/${itemId}`);
  };

  return (
    <div
      style={{
        display: "grid",
        marginTop: "20px",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        padding: "0",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      {filteredItems.map((item) => (
        <div
          key={item.id}
          style={{
            maxWidth: "250px",
            maxHeight: "270px",
            margin: "0",
            padding: "0",
            width: "100%",
          }}
        >
          <Link to={`/detail/${item.id}`}>
            {item.images && item.images.length > 0 ? (
              <img
                src={item.images[0]}
                alt={`image-${item.id}`}
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  margin: "0",
                  padding: "0",
                  marginBottom: "30px",
                }}
              />
            ) : (
              <div>No image available</div>
            )}
          </Link>
          <button onClick={() => handleItemClick(item.id)}>View Details</button>
        </div>
      ))}
      <Routes>
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
};

export default Grid;
