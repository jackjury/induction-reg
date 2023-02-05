import React, { Component, useEffect, useState } from "react";
import { Table, Nav } from "react-bootstrap";
import { supabase } from "../auth/supabaseClient";

function Projects({ session }) {
  const [projects, setProjects] = useState(null);

  const getProjects = async () => {
    let { data: projects, error } = await supabase
      .from("projects")
      .select("uuid, name");
    setProjects(projects);
  };
  useEffect(() => {
    getProjects();
    console.log(projects);
  }, []);
  if (!projects) {
    return <p>Loading.... Maybe</p>;
  } else {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Project ID</th>
            <th>Project Name</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => {
            return (
              <tr>
                <td>{project.uuid}</td>
                <td>{project.name}</td>
                <td>
                  <Nav.Link href={`/admin/project/${project.uuid}`}>
                    Edit{" "}
                  </Nav.Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default Projects;
