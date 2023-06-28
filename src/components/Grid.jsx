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
    const filenames = JSON.parse(item.images);
    const firstFilename = filenames.length > 0 ? filenames[0] : null;

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
                  src={`https://orca-app-ik7qo.ondigitalocean.app/api/images/${firstFilename}`}
                  alt={`image-${item.id}`}
                  style={{
                    width: "100%",
                    height: "100%",
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
  const mobileColumns = 2; // Number of columns on mobile devices
  const desktopColumns = 3; // Number of columns on desktop devices
  const columns = window.innerWidth < 768 ? mobileColumns : desktopColumns;
  const totalItems = renderItems.length;
  const totalRows = Math.ceil(totalItems / columns);

  for (let i = 0; i < totalRows; i++) {
    const start = i * columns;
    const end = start + columns;
    const rowItems = renderItems.slice(start, end);
    rows.push(
      <Row key={i} className="mt-4">
        {rowItems}
      </Row>
    );
  }

  return (
    <Container fluid>
      {rows}
      <Routes>
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </Container>
  );
};

export default Grid;
