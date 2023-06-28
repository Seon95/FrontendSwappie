import React from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
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

  const renderItems = filteredItems.map((item) => {
    const filename = JSON.parse(item.images);

    return (
      <Col key={item.id} className="mb-3" xs={12} sm={6} md={4} lg={4} xl={4}>
        <Card
          style={{
            width: "250px",
            height: "300px",
            backgroundColor: "#e1e2e3",
          }}
        >
          <Link to={`/detail/${item.id}`}>
            {item.images && item.images.length > 0 ? (
              <div
                style={{
                  width: "250px",
                  height: "250px",
                  overflow: "hidden",
                }}
              >
                <Card.Img
                  src={`https://orca-app-ik7qo.ondigitalocean.app/api/images/${filename}`}
                  alt={`image-${item.id}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ) : (
              <div>No image available</div>
            )}
          </Link>
          <Card.Body>
            <Card.Text style={{ fontWeight: "600" }}>{item.name}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  });

  const rows = [];
  for (let i = 0; i < renderItems.length; i += 3) {
    const rowItems = renderItems.slice(i, i + 3);
    rows.push(
      <Row key={i} className="mt-4">
        {rowItems}
      </Row>
    );
  }

  return (
    <Container fluid style={{ maxWidth: "1000px" }}>
      {rows}
      <Routes>
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </Container>
  );
};

export default Grid;
