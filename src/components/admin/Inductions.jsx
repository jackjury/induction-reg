import React, { Component, useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { supabase } from "../auth/supabaseClient";

import formatDate from "../../libs/timeformat";
import DisplayInduction from "../DisplayInduction";

function Inductions({ id, session, setHasInductions }) {
  const [inductions, setInductions] = useState();

  const [show, setShow] = useState(false);
  const [validUrl, setValidUrl] = useState(false);

  const [newInduction, setNewInduction] = useState({
    version: "",
    url: "",
    project_id: id,
    type: "NULL",
  });

  useEffect(() => {
    getInductions();
  }, []);
  useEffect(() => {
    console.log(inductions);
    console.log(newInduction);
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
    // TODO: Make the search better, and perform more validation.
    // TODO: is "NULL" the only way of achiving the select default?
    // Check if its a google slides
    if (e.target.value.search("google") > -1) {
      setValidUrl(true);
      let type = "gslide";
      // if google slides
      let url = e.target.value.split("/pub")[0];
      console.log(url);
      setNewInduction({ ...newInduction, url, type });
      return;
    }
    // Check if its a vimeo
    if (e.target.value.search("vimeo") > -1) {
      setValidUrl(true);
      let type = "vimeo";
      let url = e.target.value;
      setNewInduction({ ...newInduction, url, type });
      return;
    }
    // Check if its a YT
    if (e.target.value.search("youtube") > -1) {
      setValidUrl(true);
      let type = "yt";
      // TODO: check if its a valid 'watch' link
      let url = e.target.value;
      console.log(url);
      setNewInduction({ ...newInduction, url, type });
      return;
    }
    setValidUrl(false);
    setNewInduction({ ...newInduction, url: e.target.value, type: "NULL" });
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

            <Form.Group className="mb-3" controlId="formUrl">
              <Form.Label>Induction URL</Form.Label>
              <Form.Control
                type="input"
                placeholder="Paste the URL link here"
                name="url"
                value={newInduction.url}
                onChange={handleUrl}
              />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>URL Type</Form.Label>
              <Form.Control
                as="select"
                value={newInduction.type}
                onChange={(e) => {
                  setNewInduction({ ...newInduction, type: e.target.value });
                }}
              >
                <option value="NULL">-- Select URL Type --</option>

                <option value="yt">Youtube Video</option>
                <option value="vimeo">Vimeo Video</option>
                <option value="gslide">Google Slides</option>
              </Form.Control>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formProjectStatement"
            ></Form.Group>
          </Form>

          {
            validUrl ? (
              <DisplayInduction
                url={newInduction.url}
                urlType={newInduction.type}
              />
            ) : (
              <></>
            ) //}           {
            // TODO: make this Component load all types
          }
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
