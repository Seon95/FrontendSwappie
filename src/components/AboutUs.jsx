import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const AboutUs = () => {
  return (
    <Container style={{ marginTop: "50px" }}>
      <Row>
        <Col>
          <h2 style={{ marginBottom: "30px" }}>About Us</h2>
          <p>
            At OurSwap, we're on a mission to promote sustainable living through
            easy and rewarding item swapping. Our platform connects people who
            want to reuse and explore new items, fostering a community that
            values responsible resource utilization.
          </p>
          <p>
            We understand the challenges of traditional swapping methods, so
            we've created a user-friendly online platform that simplifies the
            process. With OurSwap, you can easily list your items, connect with
            others, and swap with confidence.
          </p>
          <p>
            By encouraging the reuse of items, we aim to reduce waste and
            contribute to a more sustainable society. OurSwap provides an
            alternative to traditional consumption patterns, allowing you to
            make a positive impact on the environment while discovering exciting
            new items.
          </p>
          <p>
            Join our community today and be part of the sustainable swapping
            movement. Together, let's create a world where resource sharing is
            easy, enjoyable, and environmentally conscious.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
