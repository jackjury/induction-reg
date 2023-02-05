import React, { Component, useState, useEffect } from "react";
import Navigation from "./Navigation";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { supabase } from "./auth/supabaseClient";

import Auth from "./auth/Auth";
import Account from "./auth/Account";

import NewProject from "./NewProject";
import Sign from "./sign";
import Home from "./Home";
import Projects from "./admin/Projects";
import Project from "./admin/Project";
import GoogleSlides from "./GoogleSlides";
import CaptureSignature from "./CaptureSignature";

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
      <Navigation />
      <Routes>
        <Route path="sign" element={<p>Check the code and try again</p>} />
        <Route path="sign/:projectID" element={<Sign />} />

        <Route path="*" element={<h1>404</h1>} />
        <Route
          path="admin"
          element={
            <div className="container" style={{ padding: "50px 0 100px 0" }}>
              {!session ? (
                <Auth />
              ) : (
                <>
                  <Account key={session.user.id} session={session} />
                  <Outlet />
                </>
              )}
            </div>
          }
        >
          <Route path="new" element={<NewProject session={session} />} />
          <Route path="projects" element={<Projects />} />
          <Route path="project/:projectID" element={<Project />} />
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

        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default Main;
