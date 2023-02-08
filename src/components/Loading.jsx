import React, { Component } from "react";
import { Container, Spinner } from "react-bootstrap";

function Loading() {
  return (
    <Container className="mt-5 d-flex justify-content-center align-items-center">
      <Spinner />
    </Container>
  );
}

export default Loading;
