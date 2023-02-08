import React, { Component, useState, useEffect } from "react";
import { supabase } from "../auth/supabaseClient";
import { Card, Button, Form } from "react-bootstrap";
import Loading from "../Loading";

function ProjectDetails({ uuid }) {
  const [project, setProject] = useState(null);
  const getProject = async () => {
    let { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .eq("uuid", uuid);

    setProject(projects[0]);
  };
  const updateProject = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("projects")
        .update(project)
        .eq("id", project.id)
        .select();
      if (error) {
        throw error;
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      getProject();
    }
  };
  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    // On update
  });
  useEffect(() => {
    getProject();
    // On Mount get the project
  }, []);

  if (!project) {
    return (
      <>
        <Loading />
      </>
    );
  } else {
    return (
      <>
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
              label="Project is live and accepting signitures"
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
      </>
    );
  }
}

export default ProjectDetails;
