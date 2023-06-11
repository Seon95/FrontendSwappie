import ChangeItem from "./ChangeItem";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../index.css";
import { useParams } from "react-router-dom";

const DetailPage = ({ items }) => {
  console.log("iteeems" + items);
  return (
    <>
      <Container className="custom-container d-flex justify-content-center align-items-center">
        <ChangeItem items={items}></ChangeItem>
      </Container>
    </>
  );
};

export default DetailPage;
