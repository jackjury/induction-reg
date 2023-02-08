import React, { Component } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";

import { supabase } from "./auth/supabaseClient";

import logo from "../img/logo-no-background.png";

function Navigation({ session }) {
  return (
    <>
      <Navbar expand="lg" className="navbar-inductme" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              height="30"
              className="d-inline-block align-top"
              alt="logo"
            />{" "}
          </Navbar.Brand>

          {!session ? (
            <>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse
                id="basic-navbar-nav"
                className="justify-content-end"
              >
                <Nav className="justify-content-end">
                  <Nav.Link href="/admin/">Sign In</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </>
          ) : (
            <>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse
                id="basic-navbar-nav"
                className="justify-content-end"
              >
                <Nav className="justify-content-end">
                  <Nav.Link href="/admin/new">Create New Project</Nav.Link>
                  <Nav.Link href="/admin/projects">Projects</Nav.Link>
                  <Nav.Link onClick={() => supabase.auth.signOut()}>
                    Sign Out
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
