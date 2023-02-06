import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../auth/supabaseClient";
import { Tabs, Tab, Sonnet } from "react-bootstrap";
import QRCode from "./QRCode";
import Inductions from "./Inductions";
import ProjectDetails from "./ProjectDetails";
import InductionRegister from "./InductionReg";

function Project() {
  const { projectID } = useParams();
  const [project, setProject] = useState(null);
  const [key, setKey] = useState("details");

  const getProject = async () => {
    let { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .eq("uuid", projectID);

    setProject(projects[0]);
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
        <h2>{project.name}</h2>
        <Tabs
          id="project"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="details" title="Details">
            <ProjectDetails projectID={projectID} />
          </Tab>
          <Tab eventKey="inductions" title="Inductions">
            <Inductions id={project.id} />
          </Tab>
          <Tab eventKey="qr" title="QR Code">
            <QRCode uuid={project.uuid} projectName={project.name} />
          </Tab>
          <Tab eventKey="reg" title="Register">
            <InductionRegister id={project.id} />
          </Tab>
        </Tabs>
      </>
    );
  }
}

export default Project;
