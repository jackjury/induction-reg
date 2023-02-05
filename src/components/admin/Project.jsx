import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../auth/supabaseClient";
import { Card, Button, Form } from "react-bootstrap";
import QRCode from "./QRCode";
import Inductions from "./Inductions";

function Project() {
  const { projectID } = useParams();
  const [project, setProject] = useState(null);
  const getProject = async () => {
    let { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .eq("uuid", projectID);

    setProject(projects[0]);
  };
  const updateProject = async (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    console.log(project);
  });
  useEffect(() => {
    getProject();
    // On Mount get the project
  }, []);

  if (!project) {
    return (
      <>
        <p>Loading... Maybe....</p>
      </>
    );
  } else {
    return (
      <>
        <Card>
          <Card.Body>
            <Card.Title>{project.name}</Card.Title>
            <Form onSubmit={updateProject}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Enter Project Name"
                  name="name"
                  value={project.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Check me out"
                  name="isLive"
                  onChange={handleChange}
                  checked={project.isLive}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formProjectStatement">
                <Form.Label>Project Statement</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter the statement you want the users to agree to"
                  name="statement"
                  value={project.statement}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mb-3">
                Update Project Details
              </Button>
            </Form>
            <Inductions id={project.id} />
            <QRCode uuid={project.uuid} projectName={project.name} />
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Project;
