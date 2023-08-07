import React, { Component } from "react";
import { Button, Container, Row } from "react-bootstrap";
import logo from "../img/inductmelive-high-resolution-logo-black-on-transparent-background.png";
import { redirect } from "react-router-dom";

function Home({ session }) {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center text-center">
      <img src={logo} className="home-logo " />
      <h2>To set up an new induction register</h2>
      {session ? (
        <p>
          <a href="./admin/new">Start a new project</a>
        </p>
      ) : (
        <Button className="mt-2">Sign In</Button>
      )}

      <h5 className="mt-5  font-italic">
        If you are here to sign the induction register, please use the QR Code
        provided by your safety advisor.
      </h5>
    </Container>
  );
}

export default Home;
