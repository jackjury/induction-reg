import { useState } from "react";
import { supabase } from "./supabaseClient";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
  const getRedirect = () => {
    console.log("ENV", process.env.NODE_ENV);
    let output = { emailRedirectTo: null };
    if (process.env.NODE_ENV == "development") {
      output.emailRedirectTo = "http://localhost:3000/";
    } else {
      output.emailRedirectTo = "https://";

    }
    return output;
  };
  const forgotenPassword = async (e) => {
    resetMessage();
    if (!email) {
      setMessage({
        visible: true,
        type: "warning",
        message: "Enter your email address to reset your password",
      });
      return;
    }
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${getRedirect()}/admin/change-password`,
      });
      if (error) throw error;
      console.log(data);
    } catch (error) {
      setMessage({
        visible: true,
        type: "danger",
        message: error.error_description || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // TODO: Validate the password and email
    resetMessage();
    if (!password || !email) {
      setMessage({
        visible: true,
        type: "warning",
        message: "Check you have entered your email address and password",
      });
      return;
    }
    try {
      setLoading(true);
      setMessage({
        visible: true,
        type: "secondary",
        message: "",
      });

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      setMessage({
        visible: true,
        type: "success",
        message: "Check your email for the login link!",
      });
    } catch (error) {
      setMessage({
        visible: true,
        type: "danger",
        message: error.error_description || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>Sign In</h2>
      {message.visible ? (
        <Alert variant={message.type}>
          {loading ? <Spinner className="ml-3" /> : <></>}
          {message.message}
        </Alert>
      ) : (
        <></>
      )}
      {loading ? (
        <></>
      ) : (
        <>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  resetMessage();
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  resetMessage();
                  setPassword(e.target.value);
                }}
              />
              <Form.Text className="text-muted">Password Hint?</Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="secondary" onClick={forgotenPassword}>
              Forgotten Password
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
}
