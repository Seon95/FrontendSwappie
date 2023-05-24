import ChangeItem from "./ChangeItem";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../index.css";

const DetailPage = () => {
  return (
    <>
      <Container className="custom-container d-flex justify-content-center align-items-center">
        <ChangeItem></ChangeItem>
      </Container>
    </>
  );
};

export default DetailPage;
