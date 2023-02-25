import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../auth/supabaseClient";
import { Tabs, Tab } from "react-bootstrap";
import QRCode from "./QRCode";
import Inductions from "./Inductions";
import ProjectDetails from "./ProjectDetails";
import InductionRegister from "./InductionReg";
import Loading from "../Loading";
import { hasFormSubmit } from "@testing-library/user-event/dist/utils";

function Project() {
  const { uuid } = useParams();
  const [project, setProject] = useState(null);
  const [key, setKey] = useState("details");
  const [hasInductions, setHasInductions] = useState(false);

  const getProject = async () => {
    let { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .eq("uuid", uuid);

    setProject(projects[0]);
  };

  useEffect(() => {
    console.log("Inductions, ", hasInductions);
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
        <h2>{project.name}</h2>
        <Tabs
          id="project"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="details" title="Details">
            <ProjectDetails uuid={uuid} />
          </Tab>
          <Tab eventKey="inductions" title="Inductions">
            <Inductions id={project.id} setHasInductions={setHasInductions} />
          </Tab>
          <Tab eventKey="qr" title="QR Code">
            {hasInductions ? (
              <QRCode uuid={project.uuid} projectName={project.name} />
            ) : (
              <>
                You will need to add an induction to the project before you can
                download your QR Code
              </>
            )}
          </Tab>
          <Tab eventKey="reg" title="Register">
            <InductionRegister id={project.id} project={project} />
          </Tab>
        </Tabs>
      </>
    );
  }
}

export default Project;
