import React, { Component, useState, useEffect } from "react";
import Navigation from "./Navigation";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  redirect,
} from "react-router-dom";
import { supabase } from "./auth/supabaseClient";

import Auth from "./auth/Auth";

import NewProject from "./NewProject";
import Sign from "./sign";
import Home from "./Home";
import Projects from "./admin/Projects";
import Project from "./admin/Project";
import CaptureSignature from "./CaptureSignature";
import Inductions from "./admin/Inductions";
import PassChange from "./PassChange";

function Main() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      <Navigation session={session} />
      <Routes>
        <Route path="sign" element={<p>Check the code and try again</p>} />
        <Route path="sign/:projectID" element={<Sign />} />
        <Route path="test" element={<Inductions />} /> // remove before
        production
        <Route path="*" element={<h1>404</h1>} />
        <Route
          path="admin"
          element={
            <div className="container" style={{ padding: "50px 0 100px 0" }}>
              {!session ? <Auth /> : <Outlet />}
            </div>
          }
        >
          <Route path="new" element={<NewProject session={session} />} />
          <Route path="projects" element={<Projects />} />
          <Route path="project/:uuid" element={<Project />} />
          <Route path="change-password" element={<PassChange />} />
        </Route>
        <Route
          path="/capture"
          element={
            <>
              <CaptureSignature
                sendData={(data) => {
                  console.log(data);
                }}
              />
            </>
          }
        ></Route>
        <Route path="/" element={<Home session={session} />}></Route>
      </Routes>
    </>
  );
}

export default Main;
