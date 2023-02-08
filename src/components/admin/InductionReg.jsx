import React, { Component, useEffect, useState } from "react";
import { supabase } from "../auth/supabaseClient";
import { Button, Table } from "react-bootstrap";
import formatDate from "../../libs/timeformat";
import Loading from "../Loading";

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

  const getCsv = () => {
    console.log(signatures);
    let rows = [["date/time", "name", "company", "sig"]];
    signatures.forEach((person) => {
      let row = [
        person.created_at,
        person.name,
        person.company,
        person.signature,
      ];
      rows.push(row);
    });
    let csvContent =
      "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    let encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  };

  useEffect(() => {
    getSignatures();
  }, []);

  if (!signatures) {
    return <Loading />;
  } else {
    return (
      <>
        <Table striped bordered hover className="mb-3">
          <thead>
            <tr>
              <th>Date / Time</th>
              <th>Name</th>
              <th>Company</th>
              <th>Signature</th>
            </tr>
          </thead>
          <tbody>
            {signatures.map((signature) => {
              return (
                <tr>
                  <td>{formatDate(signature.created_at)}</td>
                  <td>{signature.name}</td>
                  <td>{signature.company}</td>
                  <td>
                    <img
                      className="induction-reg-img"
                      src={signature.signature}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <h5>Export Register</h5>
        <Button onClick={getCsv}>CSV</Button>
      </>
    );
  }
}

export default InductionRegister;
