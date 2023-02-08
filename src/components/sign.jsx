import React, { Component, useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CaptureSignature from "./CaptureSignature";
import GoogleSlides from "./GoogleSlides";
import { supabase } from "./auth/supabaseClient";
import Loading from "./Loading";

function Sign() {
  const { projectID } = useParams();
  useEffect(() => {
    // console.log(formData);
  });
  const [message, setMessage] = useState({
    visible: false,
    type: "secondary",
    message: "",
  });
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    agree: false,
    signature: null,
    project_id: null,
    induction_id: null,
  });
  const getProject = async () => {
    setLoading(true);
    try {
      let { data: projects, error } = await supabase
        .from("projects")
        .select(
          `
        *,
        inductions (
          *
        )
      `
        )
        .eq("uuid", projectID);

      if (error) {
        throw error;
      }
      setProject(projects[0]);
      setFormData({
        ...formData,
        project_id: projects[0].id,
        induction_id:
          projects[0].inductions[projects[0].inductions.length - 1].id,
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSignature = (data) => {
    setFormData({ ...formData, signature: data });
  };
  const submitForm = async () => {
    setLoading(true);
    delete formData.agree;
    try {
      const { data, error } = await supabase
        .from("signatures")
        .insert([formData]);
      if (error) {
        throw error;
      }
      setFormData({
        name: "",
        company: "",
        agree: false,
        signature: null,
        project_id: null,
        induction_id: null,
      });
      setLoading(false);
      setMessage({
        visible: true,
        type: "success",
        message: "Thanks, you have signed the register",
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProject();
  }, []);
  useEffect(() => {});

  if (loading) {
    return <Loading />;
  } else {
    return (
      <Container className="mt-5 d-flex flex-column align-content-center justify-content-center">
        <h2 className="mb-3 text-center">Sign the Induction Register</h2>
        {message.visible ? (
          <Alert variant={message.type}>{message.message}</Alert>
        ) : (
          <></>
        )}
        <h3 className="mb-3">{project.name}</h3>
        <p className="mb-3">{project.statement}</p>
        <GoogleSlides
          url={project.inductions[project.inductions.length - 1].url}
        />
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
              Please enter the name of the company you are working for onsite,
              if you are freelance, please tell us which department you are
              working for.
            </Form.Text>
          </Form.Group>
          <CaptureSignature sendData={handleSignature} />
          <Button variant="primary" onClick={submitForm}>
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Sign;
