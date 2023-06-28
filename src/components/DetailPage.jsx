import ChangeItem from "./ChangeItem";
import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const DetailPage = ({}) => {
  const { id } = useParams();

  return (
    <Container className="custom-container d-flex justify-content-center align-items-center">
      <ChangeItem itemId={id} />
    </Container>
  );
};

export default DetailPage;
