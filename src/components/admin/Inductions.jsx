import React, { Component, useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import GoogleSlides from "../GoogleSlides";
import { supabase } from "../auth/supabaseClient";

import formatDate from "../../libs/timeformat";

function Inductions({ id, session, setHasInductions }) {
  const [inductions, setInductions] = useState();

  const [show, setShow] = useState(false);
  const [validSlides, setValidSlides] = useState(false);

  const [newInduction, setNewInduction] = useState({
    version: "",
    url: "",
    project_id: id,
  });

  useEffect(() => {
    getInductions();
  }, []);
  useEffect(() => {
    console.log(inductions);
  });
  const getInductions = async () => {
    // Get inductions where project_id = id
    setHasInductions(false);

    try {
      let { data: inductions, error } = await supabase
        .from("inductions")
        .select("*")
        .eq("project_id", id);
      if (error) {
        throw error;
      }
      if (inductions.length > 0) {
        setHasInductions(true);
      }
      console.log("Data back: ", inductions);
      setInductions(inductions);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleChange = (e) => {
    setNewInduction({ ...newInduction, [e.target.name]: e.target.value });
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleUrl = (e) => {
    let url = e.target.value.split("/pub")[0];
    console.log(url);
    setNewInduction({ ...newInduction, url });
    setValidSlides(true); // ACTUALLY DO A CHECK!
  };
  const addInduction = async () => {
    try {
      const { data, error } = await supabase
        .from("inductions")
        .insert(newInduction);
      if (error) {
        throw error;
      }
      console.log("Data", data);
    } catch (error) {
      console.log(error);
    } finally {
      // Reset the form
      getInductions();
      handleClose();
    }
  };
  return (
    <>
      <Table striped bordered hover className="mb-3">
        <thead>
          <tr>
            <th>Version</th>
            <th>Date / Time</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {inductions ? (
            inductions.map((induction) => {
              return (
                <tr>
                  <td>{induction.version}</td>
                  <td>{formatDate(induction.created_at)}</td>
                  {/* Format this! */}
                  <td>
                    <a href={induction.url}>Slides</a>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>No Data</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Button onClick={handleShow}>Add New Induction</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add A New Induction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Induction Version</Form.Label>
              <Form.Control
                type="input"
                placeholder="Enter a version number for this induction"
                name="version"
                value={newInduction.version}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProjectStatement">
              <Form.Label>Google Slides</Form.Label>
              <Form.Control
                type="input"
                placeholder="Paste the google slides link link here"
                name="url"
                value={newInduction.url}
                onChange={handleUrl}
              />
            </Form.Group>
          </Form>
          {validSlides ? <GoogleSlides url={newInduction.url} /> : <></>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addInduction}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Inductions;
