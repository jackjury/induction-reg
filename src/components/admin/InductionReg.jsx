import React, { Component, useEffect, useState } from "react";
import { supabase } from "../auth/supabaseClient";
import { Table } from "react-bootstrap";
import formatDate from "../../libs/timeformat";

function InductionRegister({ id }) {
  const [signatures, setSignatures] = useState(null);
  const getSignatures = async () => {
    try {
      let { data: signatures, error } = await supabase
        .from("signatures")
        .select("*")
        .eq("project_id", id);
      if (error) {
        throw error;
      }
      console.log(signatures);
      setSignatures(signatures);
    } catch (error) {}
  };
  useEffect(() => {
    getSignatures();
  }, []);
  if (!signatures) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <Table striped bordered hover className="mb-3">
          <thead>
            <tr>
              <th>Date / Time</th>
              <th>Name</th>
              <th>Company</th>
              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
            {signatures.map((signature) => {
              return (
                <tr>
                  <td>{formatDate(signature.created_at)}</td>
                  <td>{signature.name}</td>
                  <td>{signature.company}</td>
                  <td>Link</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  }
}

export default InductionRegister;
