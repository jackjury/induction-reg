import React, { Componen, useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import GoogleSlides from "./GoogleSlides";

function Sign() {
  const { projectID } = useParams();
  useEffect(() => {
    console.log(formData);
  });
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    agree: false,
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Container>
      <p>Project ID is: {projectID}</p>
      <h2 className="mb-3">Sign the Induction Register</h2>
      <h3 className="mb-3">Project Name</h3>
      <p className="mb-3">Project Statement</p>
      <GoogleSlides />
      <Form>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="I agree"
            name="agree"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="input"
            placeholder="Enter Your Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="company">
          <Form.Label>Your Company</Form.Label>
          <Form.Control
            type="input"
            placeholder="Enter Your Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Please enter the name of the company you are working for onsite, if
            you are freelance, please tell us which department you are working
            for.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Sign;
