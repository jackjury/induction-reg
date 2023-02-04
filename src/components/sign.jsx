import React, { Component } from "react";
import { useParams } from "react-router-dom";

function Sign() {
  const { projectID } = useParams();
  console.log(projectID);
  return (
    <>
      <h1>Sign Route</h1>
      <p>Project ID is: {projectID}</p>
    </>
  );
}

export default Sign;
