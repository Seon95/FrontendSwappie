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

  return (
    <Container fluid>
      <Row
        className="mt-4"
        xs={1}
        sm={2}
        md={3}
        lg={4}
        xl={4}
        gap={4}
        // style={{ marginRight: "-100px" }}
      >
        {filteredItems.map((item) => {
          const images = JSON.parse(item.images);
          const filename =
            images.length > 0 ? images[0].match(/[^_]+$/)[0] : "";

          console.log("filename:", filename); // Log the filename

          return (
            <Col key={item.id} className="mb-3">
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
                        src={filename}
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
                  <Card.Text style={{ fontWeight: "600" }}>
                    {item.name}{" "}
                  </Card.Text>{" "}
                  {/* Display the item description */}
                  {/* <Button variant="primary" onClick={() => handleItemClick(item.id)}>
                    View Details
                  </Button> */}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Routes>
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </Container>
  );
};

export default Grid;
