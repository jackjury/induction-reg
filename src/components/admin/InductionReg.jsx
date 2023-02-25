import React, { Component, useEffect, useState } from "react";
import { supabase } from "../auth/supabaseClient";
import { Button, Table } from "react-bootstrap";
import formatDate from "../../libs/timeformat";
import Loading from "../Loading";
import PDF from "./PDF";

function InductionRegister({ id, project }) {
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
      setSignatures(signatures);
    } catch (error) {
      console.log(error);
    }
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
    console.log(signatures);
  }, []);

  if (!signatures) {
    return <Loading />;
  }
  if (signatures.length == 0) {
    return <>You don't have any signatures yet.</>;
  } else {
    return (
      <>
        <Table striped bordered hover className="mb-3" id="induction-reg">
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
        <Button className="mr-2" onClick={getCsv}>
          CSV
        </Button>{" "}
        <PDF
          className="ml-2"
          data={signatures}
          headers={[["Date / Time", "Name", "Company", "Signature"]]}
          project={project}
        />
      </>
    );
  }
}

export default InductionRegister;
