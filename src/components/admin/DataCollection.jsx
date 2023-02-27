import React, { Component, useState, useEffect } from "react";
import { supabase } from "../auth/supabaseClient";

import { Table, Form, Button } from "react-bootstrap";
import Loading from "../Loading";

function DataCollection({ project }) {
  const [data, setData] = useState({
    Name: true,
    Company: true,
    Email: false,
    Phone: false,
    Signature: true,
    Location: false,
    IP: false,
  });
  const [updating, setUpdating] = useState(false);
  const handleChange = (e) => {
    let value = {};
    value[e.target.id] = e.target.checked;
    setData({ ...data, ...value });
    console.log(e.target.checked);
  };
  const updateData = async () => {
    setUpdating(true);
    try {
      const { data: response, error } = await supabase
        .from("projects")
        .update({ data_req: data })
        .eq("id", project.id)
        .select();
      if (error) {
        throw error;
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(false);
    }
  };
  const getData = async () => {
    if (!project.data_req) {
      // Set db to default
      console.log("Aint no data in here");
      updateData();
    } else {
      setData(project.data_req);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    console.log(data);
    console.log(project);
  });
  return (
    <Form>
      <Table striped bordered hover className="mb-3">
        <thead>
          <tr>
            <th>Toggle</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((key) => {
            return (
              <tr>
                <td>
                  <Form.Check
                    type="switch"
                    id={`${key}`}
                    checked={data[key]}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </td>
                <td>{key}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {updating ? <Loading /> : <Button onClick={updateData}>Update</Button>}
    </Form>
  );
}

export default DataCollection;
