import React, { Component, useState, useEffect } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { supabase } from "./auth/supabaseClient";

function NewProject({ session }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [projectDetails, setProjectDetails] = useState({
    projectName: "",
    projectStatement: "",
  });

  useEffect(() => {
    console.log(session);
  });

  const addNewProject = async (e) => {
    setLoading(true);
    setMessage("Please Wait");
    e.preventDefault();

    try {
      setLoading(true);
      const { user } = session;

      const project = {
        id: 12312324,
        user_id: user.id,
        name: projectDetails.projectName,
        statement: projectDetails.statement,
      };

      const { data, error } = await supabase.from("projects").insert([project]);
      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setMessage("All done, your project has been added!");
      // setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProjectDetails({ ...projectDetails, [e.target.name]: e.target.value });
  };

  if (!loading) {
    return (
      <>
        <h2>Set Up a New Project</h2>

        <Form onSubmit={addNewProject}>
          <Form.Group className="mb-3" controlId="ProjectName">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the name of the Project"
              name="projectName"
              onChange={handleChange}
              value={projectDetails.projectName}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProjectStatement">
            <Form.Label>Project Statement</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter the statement you want the users to agree to"
              name="projectStatement"
              onChange={handleChange}
              value={projectDetails.projectStatement}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </>
    );
  } else {
    return (
      <>
        <Alert variant="dark">{message}</Alert>
        <Spinner />
      </>
    );
  }
}

export default NewProject;
