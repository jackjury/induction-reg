import React, { Component, useState, useEffect } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { supabase } from "./auth/supabaseClient";

function PassChange({ session }) {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(null);
  const [passwordConf, setpasswordConf] = useState(null);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  useEffect(() => {
    console.log({
      loading,
      password,
      passwordConf,
      passwordValid,
      passwordMatch,
    });
  });

  const comparePasswords = (pass1, pass2) => {
    resetMessage();
    if (pass1 == pass2) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
      setMessage({
        visible: true,
        type: "warning",
        message: "Please check your passwords match",
      });
    }
  };

  const allValid = () => {
    console.log("Ran");
    if (passwordMatch && passwordValid) {
      return true;
    } else {
      return false;
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const validatePassword = (password) => {
    resetMessage();
    if (password) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
      setMessage({
        visible: true,
        type: "warning",
        message: "Your password needs to contain xxx",
      });
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (passwordMatch && passwordValid) {
      setLoading(true);
      try {
        const { data, error } = await supabase.auth.updateUser({
          password,
        });
        setMessage({
          visible: true,
          type: "success",
          message: "Your password has been changed!",
        });
        console.log(data, error);
        if (error) throw error;
      } catch (error) {
        setMessage({
          visible: true,
          type: "danger",
          message: error.error_description || error.message,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const [message, setMessage] = useState({
    visible: false,
    type: "secondary",
    message: "",
  });

  const resetMessage = () => {
    setMessage({
      visible: false,
      type: null,
      message: null,
    });
  };
  if (!loading) {
    return (
      <>
        <h2>Change Your Password</h2>
        {message.visible ? (
          <Alert variant={message.type}>
            {loading ? <Spinner className="ml-3" /> : <></>}
            {message.message}
          </Alert>
        ) : (
          <></>
        )}
        <Form onSubmit={changePassword}>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Choose a New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                resetMessage();
                setPassword(e.target.value);
                if (passwordConf) {
                  comparePasswords(e.target.value, passwordConf);
                }
                validatePassword(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Your password should include xxx
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="passwordConf">
            <Form.Label>Confirm</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={passwordConf}
              onChange={(e) => {
                resetMessage();
                setpasswordConf(e.target.value);
                comparePasswords(e.target.value, password);
              }}
            />
            <Form.Text className="text-muted">
              Please confirm your password
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={!allValid()}>
            Change Password
          </Button>
        </Form>
      </>
    );
  } else {
    return (
      <>
        <p>loading</p>
        <Spinner />
      </>
    );
  }
}

export default PassChange;
