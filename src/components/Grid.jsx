import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import DetailPage from "./DetailPage";

const Grid = () => {
  const imageArray = [
    "/src/assets/image1.jpg",
    "/src/assets/image2.jpg",
    "/src/assets/image3.jpg",
    "/src/assets/image4.jpg",
    // ... add more image paths here
  ];

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
      {imageArray.map((imageUrl, index) => (
        <div
          key={index}
          style={{
            maxWidth: "250px",
            maxHeight: "270px",
            margin: "0",
            padding: "0",
            width: "100%",
          }}
        >
          <Link to={`/detail/${index + 1}`}>
            <img
              src={imageUrl}
              alt={`image-${index}`}
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
          </Link>
        </div>
      ))}
      <Routes>
        <Route path="/detail/:id" />
      </Routes>
    </div>
  );
};

export default Grid;
