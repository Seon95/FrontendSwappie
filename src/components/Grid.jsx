import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import DetailPage from "./DetailPage";

const Grid = ({ items }) => {
  console.log("jeje" + JSON.stringify(items));

  if (!items || items.length === 0) {
    return <div>Loading...</div>;
  }

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
      {items.map((item) => (
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
        </div>
      ))}
      <Routes>
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
};

export default Grid;
